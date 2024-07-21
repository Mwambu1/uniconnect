import NavigationBar from "@/lib/components/NavigationBar";
import PersonalInfoCard from "@/lib/components/PersonalInfoCard";
import { BiLogOut, BiSupport } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FcFeedback } from "react-icons/fc";
import { HiPhoto } from "react-icons/hi2";
import { MdGroups, MdPages, MdPersonAddAlt1 } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

export default function Profile() {
    return(
        <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl min-h-screen">
            <NavigationBar/>
            <div className="flex w-full gap-3">
                <div className="flex flex-col gap-3 w-[45%]">
                    <div>
                        <PersonalInfoCard/>
                    </div>
                    <div className="flex justify-between bg-white rounded-lg p-3 w-full">
                            <h1 className="text-xs text-blue-500 font-semibold">About</h1>
                            <h1 className="text-xs font-semibold text-gray-500">Photos</h1>
                            <h1 className="text-xs font-semibold text-gray-500">Videos</h1>
                            <h1 className="text-xs font-semibold text-gray-500">Posts</h1>
                            <h1 className="text-xs font-semibold text-gray-500">Connections</h1>
                    </div>
                    <div className="flex flex-col gap-3 bg-white rounded-lg p-3 w-full">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="font-extrabold text-blue-400">Mwambu Kaumba</h1>
                                <h1 className="text-sm">Program: Computer Science</h1>
                                <h1 className="text-sm">School: School of Natural Sciences</h1>
                                <h1 className="flex items-center text-sm">Year of Study: 4</h1>
                            </div>
                            <div className="relative flex justify-end pr-5 text-blue-500">
                                <MdPersonAddAlt1 className="absolute rounded-full shadow-xl p-2 h-10 w-10 top-0"/>
                            </div>
                        </div>
                        <div>
                            <h1 className="italic text-xs">
                                "I like to program, play basketball, chess, pencil draw and read."
                            </h1>
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-3 w-[35%]">
                    <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
                        <h1 className="font-extrabold">Bio</h1>
                        <h1>Write something about yourself</h1>
                        <button className="bg-white border-2 rounded-lg p-2 shadow-xl">
                            Update Bio
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
                        <div className="flex justify-between">
                            <h1>Photos</h1>
                            <h1>See All Photos</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-1 rounded-xl">
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                            <div className="flex justify-center items-center h-16 bg-gray-200"><HiPhoto/></div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-3 w-[20%] h-fit">
                    <div className="flex justify-start items-center p-3 rounded-lg gap-3 shadow-xl">
                        <RxAvatar className="h-10 w-10"/>
                        <h1>Mwambu Kaumba</h1>
                    </div>
                    <div className="pt-5 flex flex-col gap-5 p-3">
                       <div className="flex items-center gap-3">
                            <MdGroups/>
                            <h1>Groups</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <MdPages/>
                            <h1>Pages</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <CiSettings/>
                            <h1>Settings</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <BiSupport/>
                            <h1>Help and Support</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <FcFeedback/>
                            <h1>Give feedback</h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <BiLogOut></BiLogOut>
                            <h1>Logout</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}