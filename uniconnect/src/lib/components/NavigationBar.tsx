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
import Notifications from "./Notifications";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessagesToggle, selectNotificationsToggle } from "../redux/slices/ToggleComponentSlice/selectors";
import { setMessagesToggle, setNotificationTogle } from "../redux/slices/ToggleComponentSlice/toggleComponentsSlice";

export default function NavigationBar() {
    const router = useRouter()
    const [showNotifications, setShowNotifications] = useState(true)
    const notificationsToggleValue = useSelector(selectNotificationsToggle)
    const messagesToggleValue = useSelector(selectMessagesToggle)
    const dispatch = useDispatch()
    
    const toggleNotification = () => {
        dispatch(setNotificationTogle(!notificationsToggleValue))
    }

    const toggleMessages = () => {
        dispatch(setMessagesToggle(!messagesToggleValue))
    }

    useEffect(()=>{
        setShowNotifications(notificationsToggleValue)
       console.log("Notifications toggle value is",notificationsToggleValue)
    },[notificationsToggleValue])
    return(
        <div className="relative gap-10 z-30 p-5 rounded-lg xl:overflow-clip flex h-fit bg-white justify-between">
            <div className="flex justify-center items-center gap-1">
                <Image src="/unza_logo.png" alt="unza logo" width={25} height={25}/>
                <h1 className="text-xs font-extrabold text-gray-500">UNICONNECT</h1>
            </div>
            <div className="hidden xl:visible xl:flex justify-evenly items-center px-10">
                <div className="flex justify-center items-center gap-1">
                    <input type="search" className="bg-gray-100 text-black rounded-full text-xs p-2" placeholder="Search..."></input>
                    <button><BiSearch/></button>
                </div>
            </div>
            <div className="flex w-full justify-evenly items-center xl:px-10">
                    <div onClick={()=>router.push(appRoutes.feed)} className="xl:px-5 hover:bg-blue-100 p-1 rounded-lg">
                        <div className="flex justify-center items-center">
                            <IoHomeSharp className="text-blue-400 text-sm"/>
                        </div>
                        <h1 className="hidden xl:visible text-xs text-gray-400">Home</h1>
                    </div>
                   <div onClick={()=> toggleNotification()} className="xl:px-5 hover:bg-blue-100 p-1 rounded-lg">
                        <div className="flex justify-center items-center">
                            <IoIosNotifications className="text-blue-400 text-md"/>
                        </div>
                        <h1 className="hidden xl:visible text-xs text-gray-400">Notifications</h1>
                    </div>
                    <div className="xl:px-5 hover:bg-blue-100 p-1 rounded-lg">
                        <div className="flex justify-center items-center">
                            <GrAnnounce className="text-blue-400 text-md"/>
                        </div>
                        <h1 className="hidden xl:visible text-xs text-gray-400">Announcements</h1>
                    </div>
                    <div onClick={()=> toggleMessages()} className="xl:px-5 hover:bg-blue-100 p-1 rounded-lg">
                        <div className="flex justify-center items-center">
                            <MdMessage className="text-blue-400 text-md"/>
                        </div>
                        <h1 className="hidden xl:visible text-xs text-gray-400">Messages</h1>
                    </div>
            </div>
            <div className="flex justify-center items-center">
                <RxAvatar onClick={()=>router.push(appRoutes.profile)} className="h-7 w-7 text-black"/>
            </div>
        </div>
    )
}