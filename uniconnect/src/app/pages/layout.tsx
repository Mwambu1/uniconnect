"use client";
import MessagesList from "@/lib/components/MessagesList";
import NavigationBar from "@/lib/components/NavigationBar";
import Notifications from "@/lib/components/Notifications";
import { getSignedUser } from "@/lib/firebase/auth/userAuth";
import { auth } from "@/lib/firebase/config";
import { fetchPosts } from "@/lib/firebase/firestore/firestore";
import {
  selectMessagesToggle,
  selectNotificationsToggle,
} from "@/lib/redux/slices/ToggleComponentSlice/selectors";
import { setUser } from "@/lib/redux/slices/user/userSlice";
import { appRoutes } from "@/lib/routes";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showNotifications = useSelector(selectNotificationsToggle);
  const showMessages = useSelector(selectMessagesToggle);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = () => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          // Fetch user data from Firestore
          const userData = await getSignedUser(user.uid);
          
          // Check if userData exists and dispatch it to Redux
          if (userData) {
            dispatch(setUser(userData.data())); // Assuming userData is a DocumentSnapshot
            router.push(appRoutes.feed);
          }
        } else {
          console.log("No user found");
          router.push("/");
        }
      });

      return () => unsubscribe(); // Clean up subscription on unmount
    };

    checkAuth();
  }, [dispatch, router]); // Include dispatch in dependency array

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="relative z-0 bg-gray-200">
      <div className="relative z-10 pl-3 pt-3 pr-3 bg-gray-200">
        <NavigationBar />
      </div>
      <div
        className={`absolute right-5 top-28 z-50 ${showNotifications ? "visible" : "hidden"} w-[30%]`}
      >
        <Notifications />
      </div>
      <div
        className={`absolute right-5 top-28 z-50 ${showMessages ? "visible" : "hidden"} w-[30%]`}
      >
        <MessagesList />
      </div>
      <div className={inter.className}>
        {children}</div>
    </div>
  );
}
