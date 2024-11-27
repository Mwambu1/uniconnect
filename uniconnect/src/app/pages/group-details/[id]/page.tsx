"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // To get groupId from URL
import Image from "next/image";
import {
  getGroupById,
  addUserToGroup,
  checkIfUserIsMember,
  getGroupPosts,
} from "@/lib/firebase/firestore/firestore"; // Import Firestore functions
import MakeAGroupPost from "@/lib/components/MakeAGroupPost";
import { useSelector } from "react-redux";
import { selectUser } from "@/lib/redux/slices/user/selectors"; // Assuming this is the correct path for selectors
import GroupPostComponent from "@/lib/components/GroupPost";
import LeftSideBar from "@/lib/components/LeftSideBar";
import RightSideBar from "@/lib/components/RightSideBar";

export default function GroupDetails() {
  const { id } = useParams(); // Get groupId from the route parameters
  const [group, setGroup] = useState<any>(null); // Store group data
  const [isMember, setIsMember] = useState(false); // Track if the user is already a member
  const [loading, setLoading] = useState(true); // Track loading state
  const [posts, setPosts] = useState<any[]>([]); // Store group posts
  const [loadingPosts, setLoadingPosts] = useState(true); // Loading state for posts
  const sliceUser = useSelector(selectUser); // Get the current signed-in user

  // Fetch group data and check membership when component loads
  useEffect(() => {
    const fetchGroup = async () => {
      if (id) {
        console.log("*****Group ID*****");
        console.log(id);
        const groupData = await getGroupById(id as string); // Firestore query to get the group
        setGroup(groupData); // Store the group data

        // Check if the current user is already a member of this group
        if (sliceUser) {
          const isUserMember = await checkIfUserIsMember(
            id as string,
            sliceUser.userId
          );
          setIsMember(isUserMember);
        }
        setLoading(false); // Stop loading
      }
    };

    fetchGroup();
  }, [id, sliceUser]);

  // Fetch group posts when component loads
  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        setLoadingPosts(true);
        const groupPosts = await getGroupPosts(id as string); // Fetch posts from Firestore
        setPosts(groupPosts);
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [id]);

  // Handle joining the group
  const handleJoinGroup = async () => {
    if (!sliceUser) {
      console.error("No user is signed in.");
      return;
    }

    const userId = sliceUser.userId;
    const userName = `${sliceUser.firstName} ${sliceUser.lastName}`;

    try {
      const result = await addUserToGroup(id as string, userId);
      if (result === "success") {
        setIsMember(true); // Update the UI to reflect that the user has joined the group
        console.log(`User ${userName} successfully joined the group!`);
      }
    } catch (error) {
      console.error("Error joining the group:", error);
    }
  };

  return (
    <div className="flex gap-3 p-3 bg-gray-200 shadow-xl w-full min-h-screen">
      <div className="w-[20%]">
      <LeftSideBar />
      </div>
      <div className="w-[60%]">
        <div className="grid grid-cols-1 w-full gap-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 bg-white rounded-lg w-full">
              <div className="flex justify-between">
                <div className="w-full">
                  <div className="flex justify-center relative w-full h-72">
                    {group && (
                      <Image
                        src={group.groupProfile || "/unza_logo.png"} // Display group profile image
                        alt="Group logo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h1 className="font-extrabold text-lg text-blue-400">
                      {group?.groupName}
                    </h1>
                    <h1 className="text-sm text-black">
                      {group?.groupDescription}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex justify-end text-white p-3">
                {loading ? (
                  <button
                    className="rounded-lg bg-gray-400 shadow-xl py-2 w-32"
                    disabled
                  >
                    <h1 className="text-sm">Checking...</h1>
                  </button>
                ) : isMember ? (
                  <button
                    className="rounded-lg bg-green-400 shadow-xl py-2 w-32"
                    disabled
                  >
                    <h1 className="text-sm">Already a member</h1>
                  </button>
                ) : (
                  <button
                    className="rounded-lg bg-blue-400 shadow-xl py-2 w-32"
                    onClick={handleJoinGroup}
                  >
                    <h1 className="text-sm">Join Group +</h1>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full">
          
        </div>
          <div className="">
            {/* Make a Post Section */}
            <MakeAGroupPost />
          </div>
        </div>
        <div className="">
            {/* Posts Section */}
            <div className="mt-5">
              <h2 className="font-bold text-xl mb-3">Group Posts</h2>
              {loadingPosts ? (
                <p>Loading posts...</p>
              ) : posts.length === 0 ? (
                <p>No posts to display.</p>
              ) : (
                posts.map((post) => (
                  <div key={post.post_id} className="mb-4">
                    <GroupPostComponent data={post} />{" "}
                    {/* Display each group post */}
                  </div>
                ))
              )}
            </div>
          </div>
      </div>
      <div className="w-[20%]">
      <RightSideBar />
      </div>
    </div>
  );
}
