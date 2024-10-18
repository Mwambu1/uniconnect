"use client"
import LeftSideBar from "@/lib/components/LeftSideBar";
import MakeApost from "@/lib/components/MakeApost";
import RightSideBar from "@/lib/components/RightSideBar";
import TimeLine from "@/lib/components/TimeLine";
import { selectUser } from "@/lib/redux/slices/user/selectors";
import { current } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";

export default function Feed() {
    const currentUser = useSelector(selectUser);
    console.log(currentUser)
    return(
        <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
            <div className="relative flex justify-between gap-10">
                <div className="hidden xl:visible">
                <LeftSideBar />
                </div>
                <div className="flex flex-col gap-3 w-full xl:w-[60%]">
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