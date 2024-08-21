"use client";
import { useState } from "react";
import { BiVideo } from "react-icons/bi";
import { FaSmile } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { createPost } from "../firebase/firestore/firestore"; // Assuming you want to use createPost here

export default function MakeApost() {
  const [postContent, setPostContent] = useState(""); // State to store input value

  // Function to handle posting
  const handlePost = async () => {
    if (postContent.trim() === "") {
      alert("Please write something before posting."); // Alert if input is empty
      return;
    }
    try {
      await createPost(postContent); // Call createPost function and pass the data
      alert("Post created successfully!");
      setPostContent(""); // Clear the input after posting
    } catch (error) {
      console.error("Error posting:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-5 w-full">
      <h1 className="pb-1">Create a post</h1>
      <div className="flex items-center gap-2">
        <RxAvatar className="h-14 w-14 text-gray-400" />
        <input
          className="bg-gray-100 w-full p-3 rounded-lg"
          placeholder="Write something..."
          value={postContent} // Bind input to state
          onChange={(e) => setPostContent(e.target.value)} // Update state on input change
        />
      </div>
      <div className="flex justify-end items-center gap-5 w-full p-5">
        <div className="">
          <div className="flex justify-center">
            <BiVideo />
          </div>
          <h1 className="text-xs text-gray-400 text-center">Video</h1>
        </div>
        <div>
          <div className="flex justify-center">
            <FcGallery />
          </div>
          <h1 className="text-xs text-gray-400">Photos</h1>
        </div>
        <div>
          <div className="flex justify-center">
            <FaLocationPin className="text-green-300" />
          </div>
          <h1 className="text-xs text-gray-400">Location</h1>
        </div>
        <div>
          <div>
            <FaSmile className="text-yellow-400" />
          </div>
          <h1 className="text-xs text-gray-400">Feeling</h1>
        </div>
        <button
          className="bg-blue-500 text-white p-1 rounded-lg"
          onClick={handlePost} // Trigger post on click
        >
          Post
        </button>
      </div>
    </div>
  );
}
