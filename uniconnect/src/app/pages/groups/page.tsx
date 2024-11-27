"use client"
import GroupsList from "@/lib/components/GroupList";
import LeftSideBar from "@/lib/components/LeftSideBar";
import RightSideBar from "@/lib/components/RightSideBar";
import { SearchForGroup } from "@/lib/components/SearchForGroup";
import { appRoutes } from "@/lib/routes";
import { useRouter } from "next/navigation";

export default function Groups() {

 const router = useRouter()
  return (
    <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
      <div className="relative flex justify-between gap-10">
        <div className="hidden md:block">
          <LeftSideBar />
        </div>
        <div className="flex flex-col gap-3 w-full md:w-[60%]">
          <SearchForGroup />
          <button onClick={()=> router.push(appRoutes.createGroup)} className="bg-blue-400 hover:h-10 rounded-md h-8 mt-3">
            <h1 className="text-white">Create Group</h1>
          </button>
          <GroupsList/>
        </div>
        <div className="hidden md:block">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}
