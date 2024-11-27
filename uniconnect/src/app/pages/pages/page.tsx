import LeftSideBar from "@/lib/components/LeftSideBar";
import MakeApost from "@/lib/components/MakeApost";
import PageCard from "@/lib/components/PageCard";
import RightSideBar from "@/lib/components/RightSideBar";
import { SearchForPages } from "@/lib/components/SearchForPages";
import TimeLine from "@/lib/components/TimeLine";

export default function Pages() {
    return(
        <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
            <div className="relative flex justify-between gap-10">
                <div className="w-[20%]">
                <LeftSideBar/>
                </div>
                <div className="flex flex-col gap-3 w-[60%]">
                    <SearchForPages/>
                    <PageCard/>
                    <PageCard/>
                </div>
                <div className="w-20%">
                <RightSideBar/>
                </div>
            </div>
        </div>
    )
}