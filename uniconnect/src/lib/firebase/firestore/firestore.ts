import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { setPosts } from "@/lib/redux/slices/posts/postsSlice";
import { store } from "@/lib/redux/store";
import { Post } from "@/lib/model/types";

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
