"use client";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { getPosts } from "../redux/slices/posts/postsSlice";
import { selectPosts } from "../redux/slices/posts/selector";

interface PostType {
  post_id: string;
  // Add other properties of the post if needed
}

const TimeLine: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => selectPosts(state));

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        await dispatch(getPosts()).unwrap(); // Ensure action is properly dispatched
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetPosts();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-200">
        <div className="h-20 w-20 bg-blue-400 rounded-full animate-ping"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-2 bg-gray-200 rounded-lg">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post: PostType) => <Post key={post.post_id} data={post} />)
      )}
    </div>
  );
};

export default TimeLine;
