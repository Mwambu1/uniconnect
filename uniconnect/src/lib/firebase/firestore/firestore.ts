import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { v4 as uuidv4 } from "uuid"; 
import { setPosts } from "@/lib/redux/slices/posts/postsSlice";
import { store } from "@/lib/redux/store";
import { Group, GroupPost, Post } from "@/lib/model/types";

export async function testFunction() {
  await addDoc(collection(db, "test"), {
    name: "Mwambu",
    age: "23",
  });
  return true;
}

// Function to handle posting
export async function createApost(
  postContent: string,
  imageUpload: File | null,
  userId: string,
  username: string
) {
  if (postContent.trim() === "" && imageUpload === null) {
    alert("Please write something before posting.");
    return "failed";
  }

  try {
    // Prepare media URL
    let mediaUrl: string[] = [];
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}_${v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      mediaUrl = [url];
    }

    // Prepare post data
    const postData: Post = {
      post_id: "",
      user_id: userId, // Use the actual user ID passed as an argument
      username: username, // Use the actual username passed as an argument
      content: postContent,
      media_url: mediaUrl,
      created_at: Timestamp.now(), // Use Firestore Timestamp
      like_count: 0,
      love_count: 0,
      laugh_count: 0,
      celebrations_count: 0,
      comment_count: 0,
      comments_by: [],
      liked_by: [],
    };

    // Add document and get reference
    const docRef = await addDoc(collection(db, "posts"), postData);

    // Update the document with the correct post_id
    await updateDoc(docRef, { post_id: docRef.id });

    console.log("Post created successfully with ID:", docRef.id);
    return "success";
  } catch (error) {
    console.error("Error creating post:", error);
    return "failed";
  }
}

// Function to handle posting
export async function createAGroupPost(
  postContent: string,
  imageUpload: File | null,
  userId: string,
  username: string,
  groupId: string
) {
  if (postContent.trim() === "" && imageUpload === null) {
    alert("Please write something before posting.");
    return "failed";
  }

  try {
    // Prepare media URL
    let mediaUrl: string[] = [];
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}_${v4()}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      mediaUrl = [url];
    }

    // Prepare post data
    const postData: GroupPost = {
      post_id: "",
      groupId: groupId,
      user_id: userId, // Use the actual user ID passed as an argument
      username: username, // Use the actual username passed as an argument
      content: postContent,
      media_url: mediaUrl,
      created_at: Timestamp.now(), // Use Firestore Timestamp
      like_count: 0,
      love_count: 0,
      laugh_count: 0,
      celebrations_count: 0,
      comment_count: 0,
      comments_by: [],
      liked_by: [],
    };

    // Add document and get reference
    const docRef = await addDoc(collection(db, "group-posts"), postData);

    // Update the document with the correct post_id
    await updateDoc(docRef, { post_id: docRef.id });

    console.log("Post created successfully with ID:", docRef.id);
    return "success";
  } catch (error) {
    console.error("Error creating post:", error);
    return "failed";
  }
}

// Function to retrieve posts
export async function fetchPosts() {
  try {
    const postsRef = collection(db, "posts");

    // Create a query to fetch posts ordered by created_at in descending order
    const postsQuery = query(postsRef, orderBy("created_at", "desc"));

    // Use onSnapshot to listen for real-time updates
    onSnapshot(postsQuery, (snapshot) => {
      const extractedData: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Check if created_at is a Timestamp
        if (data.created_at instanceof Timestamp) {
          const formattedData = {
            post_id: doc.id,
            ...data,
            created_at: data.created_at.toDate().toISOString(),
          };
          extractedData.push(formattedData);
        } else {
          console.error("Error: created_at field is not a Timestamp");
          // Handle this case appropriately, e.g., log an error or skip the post
        }
      });
      console.log(extractedData);
      store.dispatch(setPosts(extractedData)); // Dispatch the posts to the store
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
}

// Function to create a new group
export async function createGroup(groupData: Omit<Group, "groupId">): Promise<string> {
  try {
    // Generate a unique groupId
    const groupId = uuidv4(); // This will be both the document ID and a field inside the document

    // Create a reference to the 'groups' collection in Firestore
    const groupRef = doc(collection(db, "groups"), groupId); // The document ID is the groupId

    // Add groupId to the group object
    const group: Group = { ...groupData, groupId }; // Combine passed groupData with generated groupId

    // Store the group object in Firestore
    await setDoc(groupRef, group);

    return groupId; // Return the generated groupId
  } catch (error) {
    console.error("Error creating group:", error);
    throw new Error("Failed to create group");
  }
}

// Function to retrieve the first 10 groups
export async function getFirstTenGroups(): Promise<Group[]> {
  const groupsRef = collection(db, "groups"); // Firestore collection 'groups'
  const q = query(groupsRef, limit(10)); // Limit to 10 groups

  const querySnapshot = await getDocs(q);
  const groups: Group[] = [];
  querySnapshot.forEach((doc) => {
    groups.push(doc.data() as Group); // Add each group to the array
  });
  
  return groups;
}

// Function to retrieve a single group by ID
export async function getGroupById(groupId: string) {
  const groupRef = doc(db, "groups", groupId);
  const groupDoc = await getDoc(groupRef);

  if (groupDoc.exists()) {
    return groupDoc.data();
  } else {
    throw new Error("Group not found");
  }
}

// Function to add a user to a group's member list
export const addUserToGroup = async (groupId: string, userId: string): Promise<string> => {
  const groupRef = doc(db, "groups", groupId);
  const groupDoc = await getDoc(groupRef);

  if (groupDoc.exists()) {
    const groupData = groupDoc.data();
    const members: string[] = groupData?.members || [];

    // Check if the user is already a member
    if (members.includes(userId)) {
      return "already_member";
    }

    // Add the user to the group members list
    const updatedMembers = [...members, userId];
    await updateDoc(groupRef, {
      members: updatedMembers,
    });

    return "success";
  } else {
    console.error("Group not found");
    return "group_not_found";
  }
};

// Function to check if the user is a member of a group
export const checkIfUserIsMember = async (groupId: string, userId: string): Promise<boolean> => {
  const groupRef = doc(db, "groups", groupId);
  const groupDoc = await getDoc(groupRef);

  if (groupDoc.exists()) {
    const groupData = groupDoc.data();
    const members: string[] = groupData?.members || [];

    // Check if the user is already a member
    return members.includes(userId);
  } else {
    console.error("Group not found");
    return false;
  }
};

// Fetch posts for a specific group
export async function getGroupPosts(groupId: string) {
  const postsRef = collection(db, `group-posts`);
  const postsQuery = query(postsRef, where("groupId","==",groupId));
  const querySnapshot = await getDocs(postsQuery);
  
  const posts = querySnapshot.docs.map(doc => ({
    post_id: doc.id,
    ...doc.data(),
  }));
  
  return posts;
}
