import LeftSideBar from "@/lib/components/LeftSideBar";
import MakeApost from "@/lib/components/MakeApost";
import RightSideBar from "@/lib/components/RightSideBar";
import TimeLine from "@/lib/components/TimeLine";

export default function Feed() {
    return(
        <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
            <div className="relative flex justify-between gap-10">
                <div className="hidden xl:visible">
                <LeftSideBar />
                </div>
                <div className="flex flex-col gap-3 xl:w-[60%]">
                    <MakeApost/>
                    <TimeLine/>
                </div>
                <div className="hidden xl:visible">
                <RightSideBar/>
                </div>
            </div>
        </div>
    )
}