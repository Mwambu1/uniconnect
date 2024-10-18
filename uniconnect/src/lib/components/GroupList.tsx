"use client";

import { useEffect, useState } from "react";
import GroupCard from "./GroupCard"; // Adjust the import path as necessary
import { Group } from "@/lib/model/types";
import { getFirstTenGroups } from "../firebase/firestore/firestore";

export default function GroupsList() {
  const [groups, setGroups] = useState<Group[]>([]); // State to store groups

  // Fetch the first 10 groups from Firestore
  useEffect(() => {
    const fetchGroups = async () => {
      const groupData = await getFirstTenGroups();
      setGroups(groupData);
    };

    fetchGroups();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {groups.length === 0 ? (
        <p>Loading groups...</p>
      ) : (
        groups.map((group, index) => (
          <GroupCard
            key={index}
            groupName={group.groupName}
            groupId={group.groupId}
            groupDescription={group.groupDescription}
            membersCount={group.members.length}
            groupProfile={group.groupProfile}
          />
        ))
      )}
    </div>
  );
}
