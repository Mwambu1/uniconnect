"use client"
import MessagesList from "@/lib/components/MessagesList";
import NavigationBar from "@/lib/components/NavigationBar";
import NotificationCard from "@/lib/components/NotificationCard";
import Notifications from "@/lib/components/Notifications";
import { selectMessagesToggle, selectNotificationsToggle } from "@/lib/redux/slices/ToggleComponentSlice/selectors";
import { Inter } from "next/font/google";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const showNotifications = useSelector(selectNotificationsToggle)
    const showMessages = useSelector(selectMessagesToggle)
    return(
        <div className="relative z-0">
            <div className="relative z-10 pl-3 pt-3 pr-3 bg-gray-200">
                <NavigationBar />
            </div>
            <div className={`absolute right-5 top-28 z-50 ${showNotifications? "visible":"hidden"} w-[30%]`}>
                <Notifications/>
            </div>
            <div className={`absolute right-5 top-28 z-50 ${showMessages? "visible":"hidden"} w-[30%]`}>
               <MessagesList/>
            </div>
            <div className={inter.className}>{children}</div>
        </div>
    )
}