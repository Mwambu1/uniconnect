import GroupCard from "@/lib/components/GroupCard";
import LeftSideBar from "@/lib/components/LeftSideBar";
import PageCard from "@/lib/components/PageCard";
import RightSideBar from "@/lib/components/RightSideBar";
import { SearchForGroup } from "@/lib/components/SearchForGroup";
import { SearchForPages } from "@/lib/components/SearchForPages";
import { useRouter } from "next/navigation";

export default function groups() {
    
    return(
        <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
            <div className="relative flex justify-between gap-10">
                <div className="hidden xl:visible">
                    <LeftSideBar />
                </div>
                <div className="flex flex-col gap-3 w-full xl:2xlw-[60%]">
                    <SearchForGroup/>
                    <GroupCard/>
                    <GroupCard/>
                </div>
                <div className="hidden xl:visible">
                    <RightSideBar/>
                </div>
            </div>
        </div>
    )
}