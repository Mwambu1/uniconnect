"use client";
import { useEffect, useRef, useState } from "react";
import { BiVideo } from "react-icons/bi";
import { FaSmile } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import { createAGroupPost, createApost } from "../firebase/firestore/firestore"; // Assuming you want to use createPost here
import Image from "next/image";
import { Bars, ThreeDots } from 'react-loading-icons';
import { User } from "../model/types";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/user/selectors";
import { useParams } from "next/navigation"; // To get groupId from URL

export default function MakeAGroupPost() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postContent, setPostContent] = useState(""); // State to store input value
  const [imageUpload, setImageUpload] = useState<File>();
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
  const [uploading, setUploading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");
  const [signedInUser, setSignedInUser] = useState<User>()
  const sliceUser = useSelector(selectUser);

  const { id } = useParams(); // Get groupId from the route parameters
  const groupId = id as string;

  useEffect(() => {
    console.log("Slice User:", sliceUser);
    if (sliceUser) {
      setSignedInUser(sliceUser);
    }
  }, [sliceUser]);

  const handlePost = async () => {
    setUploading(false);
    if (!imageUpload) return; // Ensure there's an image to upload
    if (!signedInUser) {
      console.error("User is not signed in");
      return;
    }
    if (!id) {
      console.error("Group ID is missing");
      return;
    }
  
    const userId = signedInUser.userId;
    const username = `${signedInUser.firstName} ${signedInUser.lastName}`;
  
    console.log("Post Content:", postContent);
    console.log("Image Upload:", imageUpload);
    console.log("User ID:", userId);
    console.log("Username:", username);
    console.log("Group ID:", id); // Logging the groupId
  
    const res = await createAGroupPost(postContent, imageUpload, userId, username, groupId); // Now passing groupId
    if (res === "success") {
      setPostContent("");
      setUploadStatus(res);
      setSelectedImage(null); // Clear selected image after posting
      setUploading(true);
      setTimeout(() => {
        setUploadStatus("");
      }, 3000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageUpload(file); // Set the file for uploading
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-3 xl:p-5 w-full">
      <h1 className="pb-1 text-xs text-black">Create a group post</h1>
      <div className="flex items-center gap-2">
        <RxAvatar className="h-14 w-14 text-xs text-gray-400" />
        <input
          className="bg-gray-100 h-10 w-full p-3 rounded-lg"
          placeholder="Write something..."
          value={postContent} // Bind input to state
          onChange={(e) => setPostContent(e.target.value)} // Update state on input change
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-between items-center gap-5 w-full xl:pt-5">
        <div className="w-full">
          {!uploading && (
            <div className="w-full">
              <ThreeDots className="h-7 w-full bg-sky-400 py-2 rounded-lg" />
            </div>
          )}
          {uploadStatus === "success" && (
            <div className="w-full">
              <p className="text-green-600 text-xs">Successfully created post!</p>
            </div>
          )}
          {selectedImage && uploading && (
            <div className="relative w-7 h-5 rounded-xl"> {/* Adjust width and height as needed */}
              <Image
                src={selectedImage as string}
                alt="Selected"
                layout="fill" // Ensure it covers the container
                objectFit="cover" // Adjust to fit the container
              />
            </div>
          )}
        </div>
        <div className="flex justify-end items-center gap-5">
          <div className="">
            <div className="flex justify-center">
              <BiVideo className="text-black" />
            </div>
            <h1 className="text-xs text-gray-400 text-center">Video</h1>
          </div>
          <div>
            <div className="flex justify-center">
              <FcGallery onClick={handleClick} style={{ cursor: "pointer" }} />
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
            <div className="flex justify-center">
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
    </div>
  );
}
