import { addDoc, collection, doc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export async function testFunction() {
    await addDoc(collection(db,"test"),{
           name: "Mwambu",
           age: "23"
    })
    return true;  
}

// Function to handle posting
export async function createApost(postContent: string, imageUpload: File | null) {
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
        const postData = {
            user_id: "12345", // Replace with the actual user ID
            content: postContent,
            media_url: mediaUrl,
            created_at: Timestamp.now(),
            like_count: 0,
            comment_count: 0,
            comments_by: [],
            liked_by: []
        };

        // Add document and get reference
        const docRef = await addDoc(collection(db, "posts"), postData);

        // Update the document with the correct post_id
        await updateDoc(docRef, { post_id: docRef.id });

        console.log('Post created successfully with ID:', docRef.id);
        alert("Post created successfully!");
        return "success";
    } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post");
        return "failed";
    }
}

// Function to retrieve posts
export async function fetchPosts() {
    try {
        const postsRef = collection(db, 'posts');
        const querySnapshot = await getDocs(postsRef);

        // Map over the querySnapshot to get documents and extract data
        const posts = querySnapshot.docs.map(doc => ({
            post_id: doc.id,
            ...doc.data()  // Spread document data and omit post_id
        }));

        // Optionally, process posts if needed
        console.log('Fetched posts:', posts);
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts");
    }
}