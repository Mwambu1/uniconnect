"use client"
import { useEffect, useState } from "react";
import Post from "./Post";
import { fetchPosts } from "../firebase/firestore/firestore";
import { selectPosts } from "../redux/slices/posts/selector";
import { getPosts } from "../redux/slices/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TimeLine() {
    const [posts, setPosts] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<any>();

    const fetchedPosts = useSelector(selectPosts);
    
    useEffect(() => {
        // Define an async function to fetch posts and handle state updates
        const fetchAndSetPosts = async () => {
            try {
                dispatch(getPosts())
                
                
                // Log fetchedPosts to verify its structure
                console.log(fetchedPosts);
                
                // Ensure fetchedPosts is an array
                if (Array.isArray(fetchedPosts)) {
                    setPosts(fetchedPosts);
                } else {
                    throw new Error('Fetched posts data is not an array');
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetPosts();
    }, []);

    if (loading) return <div className="flex justify-center items-center w-full h-full bg-gray-200">
    <div className="h-20 w-20 bg-blue-400 rounded-full animate-ping"></div>
</div>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col gap-2 bg-gray-200 rounded-lg">
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map((post: { post_id: any; }) => <Post key={post.post_id} data={post} />)
            )}
        </div>
    );
}