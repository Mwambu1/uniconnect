"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { appRoutes } from "../routes";

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
            <div className="flex justify-between w-full">
              <h1 className="text-md text-black">{groupDescription}</h1>
              <h1 className="text-md text-black">{membersCount} Members</h1>
            </div>
          </div>
        </div>
        <BiDotsVerticalRounded />
      </div>
      <div className="flex mt-3">
        <h1 className="text-sm">{groupDescription}</h1>
      </div>
      <button className="bg-blue-400 rounded-md h-8 mt-3">
        <h1 className="text-white">Join Group</h1>
      </button>
    </div>
  );
}
