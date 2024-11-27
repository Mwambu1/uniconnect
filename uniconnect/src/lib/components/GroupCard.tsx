"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { appRoutes } from "../routes";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/user/selectors";
import {
  checkIfUserIsMember,
  addUserToGroup,
} from "../firebase/firestore/firestore"; // Firestore functions

interface GroupCardProps {
  groupName: string;
  groupDescription: string;
  membersCount: number;
  groupProfile: string;
  groupId: string; // Add the group ID for navigation
}

export default function GroupCard({
  groupName,
  groupDescription,
  membersCount,
  groupProfile,
  groupId, // Include groupId in props
}: GroupCardProps) {
  const router = useRouter();
  const sliceUser = useSelector(selectUser); // Get the current signed-in user
  const [isMember, setIsMember] = useState(false); // State to track if the user is a member
  const [loading, setLoading] = useState(true); // Track loading state

  // Check if the current user is a member of the group
  useEffect(() => {
    const checkMembership = async () => {
      if (sliceUser && groupId) {
        const userId = sliceUser.userId;
        const membershipStatus = await checkIfUserIsMember(groupId, userId);
        setIsMember(membershipStatus); // Set membership status
        setLoading(false); // Stop loading once check is complete
      }
    };
    checkMembership();
  }, [sliceUser, groupId]);

  // Handle joining the group
  const handleJoinGroup = async () => {
    if (!sliceUser) {
      console.error("No user is signed in.");
      return;
    }

    const userId = sliceUser.userId;
    const userName = `${sliceUser.firstName} ${sliceUser.lastName}`;

    try {
      const result = await addUserToGroup(groupId, userId);
      if (result === "success") {
        setIsMember(true); // Update the UI to reflect that the user has joined the group
        console.log(`User ${userName} successfully joined the group!`);
      }
    } catch (error) {
      console.error("Error joining the group:", error);
    }
  };

  // When clicking on group name, navigate to the group details page
  const handleGroupClick = () => {
    router.push(`${appRoutes.groupDetails}/${groupId}`); // Dynamic navigation to group details page with groupId
  };

  return (
    <div className="flex flex-col bg-white p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-2 w-full">
          <div className="flex justify-center rounded-full bg-gray-400 border-gray-400 border-2 overflow-hidden">
            <Image
              src={groupProfile || "/unza_logo.png"} // Default image
              alt="Group logo"
              width={50}
              height={50}
            />
          </div>
          <div className="px-2 w-full">
            <div className="pt-1">
              <h1
                className="font-extrabold text-lg text-blue-500 cursor-pointer"
                onClick={handleGroupClick} // Click handler to navigate to group details
              >
                {groupName}
              </h1>
            </div>
          </div>
        </div>
        <BiDotsVerticalRounded />
      </div>
      <div className="flex justify-end w-full h-full pt-3">
        <h1 className="text-md text-black">{membersCount} Members</h1>
      </div>
      <div className="flex justify-between w-full h-full pt-2">
        <h1 className="text-md text-black md:text-sm">{groupDescription}</h1>
      </div>

      {loading ? (
        <button className="bg-gray-400 rounded-md h-8 mt-3" disabled>
          <h1 className="text-white">Checking membership...</h1>
        </button>
      ) : isMember ? (
        <button className="bg-green-400 rounded-md h-8 mt-3" disabled>
          <h1 className="text-white">Already a member</h1>
        </button>
      ) : (
        <button
          className="bg-blue-400 rounded-md h-8 mt-3"
          onClick={handleJoinGroup}
        >
          <h1 className="text-white">Join Group</h1>
        </button>
      )}
    </div>
  );
}
