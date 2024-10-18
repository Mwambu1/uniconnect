"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // To get groupId from URL
import Image from "next/image";
import { getGroupById } from "@/lib/firebase/firestore/firestore";


export default function GroupDetails() {
  const { groupId } = useParams(); // Get groupId from the route parameters
  const [group, setGroup] = useState<any>(null); // Store group data

  // Fetch group data when component loads
  useEffect(() => {
    const fetchGroup = async () => {
      if (groupId) {
        const groupData = await getGroupById(groupId[0]); // Firestore query to get the group
        setGroup(groupData); // Store the group data
      }
    };

    fetchGroup();
  }, [groupId]);

  if (!group) {
    return <p>Loading group details...</p>; // Show a loading state while fetching group data
  }

  return (
    <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl w-full min-h-screen">
      <div className="xl:flex grid grid-cols-1 w-full gap-3">
        <div className="flex flex-col gap-3 xl:w-[45%]">
          <div className="flex flex-col gap-3 bg-white rounded-lg w-full">
            <div className="flex justify-between">
              <div className="w-full">
                <div className="flex justify-center relative w-full h-72">
                  <Image
                    src={group.groupProfile || "/unza_logo.png"} // Display group profile image
                    alt="Group logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="p-3">
                  <h1 className="font-extrabold text-lg text-blue-400">
                    {group.groupName}
                  </h1>
                  <h1 className="text-sm text-black">{group.groupDescription}</h1>
                </div>
              </div>
            </div>
            <div className="flex justify-end text-white p-3">
              <button className="rounded-lg bg-blue-400 shadow-xl py-2 w-32">
                <h1 className="text-sm">Join Group +</h1>
              </button>
            </div>
          </div>
        </div>
        {/* Add other sections like Photos, Videos, Posts, etc. here */}
      </div>
    </div>
  );
}
