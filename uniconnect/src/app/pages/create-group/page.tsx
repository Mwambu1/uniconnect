"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { Group } from "@/lib/model/types";
import { appRoutes } from "@/lib/routes";
import { createGroup } from "@/lib/firebase/firestore/firestore";

export default function CreateGroupPage() {
  const router = useRouter();
  
  // State for the group form inputs
  const [groupName, setGroupName] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [groupProfile, setGroupProfile] = useState<string>("");
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null); // To store logged-in user ID

  useEffect(() => {
    // Check for the authenticated user
    const checkAuth = () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setLoggedInUserId(user.uid); // Set the user ID for groupAdmin
        } else {
          router.push("/login"); // Redirect to login if not authenticated
        }
      });
    };
    checkAuth();
  }, []);

  const submitGroup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    
    if (!loggedInUserId) {
      console.error("No logged in user found");
      return;
    }

    // Create group data object
    const newGroup: Group = {
      groupId: '',
      groupName,
      groupDescription,
      groupProfile,
      members: [loggedInUserId], // Add logged-in user as the first member
      posts: [],
      groupAdmin: loggedInUserId, // Use the logged-in user as the admin
    };

    try {
      await createGroup(newGroup); // Call the function to create a new group in Firebase
      router.push(appRoutes.feed);  // Redirect to the feed page after group creation
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <div className="bg-white p-5 m-3 rounded-lg h-fit md:mx-20 md:mb-10 md:mt-10">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-500">Create New Group</h1>
      
      <form onSubmit={submitGroup} className="grid grid-cols-1 gap-6">
        <div>
          <label className="text-sm text-black">Group Name</label>
          <input 
            type="text" 
            value={groupName} 
            onChange={(e) => setGroupName(e.target.value)} 
            className="border rounded-md w-full py-2 px-3 h-10" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Group Description</label>
          <textarea 
            value={groupDescription} 
            onChange={(e) => setGroupDescription(e.target.value)} 
            className="border rounded-md w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Group Profile Picture URL</label>
          <input 
            type="text" 
            value={groupProfile} 
            onChange={(e) => setGroupProfile(e.target.value)} 
            className="border rounded-md w-full py-2 px-3" 
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create Group
        </button>
      </form>
    </div>
  );
}
