"use client"
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { GrAnnounce } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { appRoutes } from "../routes";
import { useRouter } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";

export default function NavigationBar() {
    const router = useRouter()
    return(
        <div className="p-5 rounded-lg overflow-clip flex h-fit bg-white justify-between">
            <div className="flex justify-center items-center gap-1">
                <Image src="/unza_logo.png" alt="unza logo" width={25} height={25}/>
                <h1 className="font-extrabold text-gray-500">UNICONNECT</h1>
            </div>
            <div className="flex justify-evenly items-center px-10">
                <div className="flex justify-center items-center gap-1">
                    <input type="search" className="bg-gray-100 text-black rounded-full text-xs p-2" placeholder="Search..."></input>
                    <button><BiSearch/></button>
                </div>
            </div>
            <div className="flex justify-evenly items-center px-10">
                    <div className="px-5">
                        <div className="flex justify-center items-center">
                            <IoHomeSharp className="text-blue-400"/>
                        </div>
                        <h1 className="text-xs text-gray-400">Notifications</h1>
                    </div>
                   <div className="px-5">
                        <div className="flex justify-center items-center">
                            <IoIosNotifications className="text-blue-400"/>
                        </div>
                        <h1 className="text-xs text-gray-400">Notifications</h1>
                    </div>
                    <div className="px-5">
                        <div className="flex justify-center items-center">
                            <GrAnnounce className="text-blue-400"/>
                        </div>
                        <h1 className="text-xs text-gray-400">Announcements</h1>
                    </div>
                    <div className="px-5">
                        <div className="flex justify-center items-center">
                            <MdMessage className="text-blue-400"/>
                        </div>
                        <h1 className="text-xs text-gray-400">Messages</h1>
                    </div>
            </div>
            <div>
                <RxAvatar onClick={()=> router.push(appRoutes.profile)}className="h-7 w-7"/>
            </div>
        </div>
    )
}