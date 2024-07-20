import LeftSideBar from "@/lib/components/LeftSideBar";
import MakeApost from "@/lib/components/MakeApost";
import NavigationBar from "@/lib/components/NavigationBar";
import RightSideBar from "@/lib/components/RightSideBar";
import TimeLine from "@/lib/components/TimeLine";

export default function Feed() {
    return(
        <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
            <div className="bg-white rounded-lg">
                <NavigationBar/>
            </div>
            <div className="flex justify-between gap-10">
                <LeftSideBar/>
                <div className="flex flex-col gap-3 w-[60%]">
                    <MakeApost/>
                    <TimeLine/>
                </div>
                <RightSideBar/>
            </div>
        </div>
    )
}