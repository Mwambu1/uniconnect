"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBookmark, FaFacebook } from "react-icons/fa";
import { FaBasketball } from "react-icons/fa6";
import { MdEvent, MdFlag, MdGroups, MdStars } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { appRoutes } from "../routes";

export default function LeftSideBar() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 bg-white rounded-lg p-5 max-h-screen w-[20%]">
      <div className="flex gap-3 w-full">
        <RxAvatar className="text-gray-400 h-10 w-10" />
        <h1 className="text-sm text-gray-400 font-semibold">Mwambu Kaumba</h1>
      </div>
      <div>
        <h1 className="font-semibold text-gray-400">Pages</h1>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex justify-start items-center gap-2 pt-1">
            <Image
              src="/unza_logo.png"
              alt="unza logo"
              width={20}
              height={20}
            />
            <h1 className="text-sm w-full">Computer Science</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <FaBasketball className="text-orange-500" />
            <h1 className="text-sm">Basketball</h1>
          </div>
          <button
            onClick={() => router.push(appRoutes.pages)}
            className="p-1 text-black shadow-xl rounded-lg border-2 w-full text-xs"
          >
            Discover more+
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-gray-400">Groups</h1>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex justify-start items-center gap-2 pt-1">
            <Image
              src="/unza_logo.png"
              alt="unza logo"
              width={20}
              height={20}
            />
            <h1 className="text-sm">UNZASU</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <FaBasketball className="text-orange-500" />
            <h1 className="text-sm">Basketball</h1>
          </div>
          <button
            onClick={() => router.push(appRoutes.groups)}
            className="p-1 text-black shadow-xl rounded-lg border-2 w-full text-xs"
          >
            Discover more+
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-gray-400">Pages</h1>
        <div className="flex flex-col gap-1 p-2">
          <div className="flex justify-start items-center gap-2 pt-1">
            <MdGroups className="text-blue-500" />
            <h1 className="text-xs">Groups</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <MdStars className="text-blue-500" />
            <h1 className="text-xs">Favorites</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <FaBookmark className="text-blue-500" />
            <h1 className="text-xs">Bookmarks</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <MdEvent className="text-blue-500" />
            <h1 className="text-xs">Events</h1>
          </div>
          <div className="flex justify-start items-center gap-2">
            <MdFlag className="text-blue-500" />
            <h1 className="text-xs">Pages</h1>
          </div>
          <button className="p-1 text-black shadow-xl rounded-lg border-2 w-full text-xs">
            Discover more+
          </button>
        </div>
      </div>
    </div>
  );
}
