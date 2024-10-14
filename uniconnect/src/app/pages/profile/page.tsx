"use client";
import NavigationBar from "@/lib/components/NavigationBar";
import PersonalInfoCard from "@/lib/components/PersonalInfoCard";
import { appRoutes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { BiLogOut, BiSupport } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FcFeedback } from "react-icons/fc";
import { HiPhoto } from "react-icons/hi2";
import { MdGroups, MdPages, MdPersonAddAlt1 } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

export default function Profile() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 p-3 bg-gray-200 shadow-xl w-full min-h-screen">
      <div className="xl:flex grid grid-cols-1 w-full gap-3">
        <div className="flex flex-col gap-3 xl:w-[45%]">
          <div>
            <PersonalInfoCard />
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
                <h1 className="text-sm text-black">Program: Computer Science</h1>
                <h1 className="text-sm text-black">School: School of Natural Sciences</h1>
                <h1 className="flex items-center text-sm text-black">Year of Study: 4</h1>
              </div>
              <div className="relative flex justify-end pr-5 text-blue-500">
                <MdPersonAddAlt1 className="absolute rounded-full shadow-xl p-2 h-10 w-10 top-0" />
              </div>
            </div>
            <div>
              <h1 className="italic text-xs">
                <p className="text-black">
                I like to program, play basketball, chess, pencil draw and
                read.
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-3 xl:w-[35%]">
          <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
            <h1 className="font-extrabold text-black">Bio</h1>
            <h1 className="text-black">Write something about yourself</h1>
            <button className="bg-white border-2 rounded-lg p-2 text-black shadow-xl">
              Update Bio
            </button>
          </div>
          <div className="flex flex-col gap-3 bg-white rounded-lg p-3">
            <div className="flex justify-between">
              <h1 className="text-black">Photos</h1>
              <h1 className="text-black">See All Photos</h1>
            </div>
            <div className="grid grid-cols-3 gap-1 rounded-xl">
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
              <div className="flex justify-center items-center h-16 bg-gray-200">
                <HiPhoto className="text-black"/>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 xl:w-[20%] h-fit">
          <div className="flex justify-start items-center p-3 rounded-lg gap-3 shadow-xl cursor-pointer">
            <RxAvatar className="h-10 w-10 text-black" />
            <h1 className="text-black">Mwambu Kaumba</h1>
          </div>
          <div className="pt-5 flex flex-col gap-5 p-3">
            <div
              onClick={() => router.push(appRoutes.groups)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <MdGroups className="text-black"/>
              <h1 className="text-black">Groups</h1>
            </div>
            <div
              onClick={() => router.push(appRoutes.pages)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <MdPages className="text-black"/>
              <h1 className="text-black">Pages</h1>
            </div>
            <div
              onClick={() => router.push(appRoutes.settings)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <CiSettings className="text-black" />
              <h1 className="text-black">Settings</h1>
            </div>
            <div
              onClick={() => router.push(appRoutes.help)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <BiSupport className="text-black"/>
              <h1 className="text-black">Help and Support</h1>
            </div>
            <div
              onClick={() => router.push(appRoutes.feedback)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <FcFeedback className="text-black"/>
              <h1 className="text-black">Give feedback</h1>
            </div>
            <div
              onClick={() => appRoutes.home}
              className="flex items-center gap-3 cursor-pointer"
            >
              <BiLogOut className="text-red-500"></BiLogOut>
              <h1 className="text-black">Logout</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
