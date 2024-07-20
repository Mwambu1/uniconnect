"use client"
import Image from "next/image";
import { useState } from "react";
import { BiComment, BiDotsVerticalRounded, BiLaugh, BiShare } from "react-icons/bi";
import { FiThumbsUp } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import { IoMdThumbsUp } from "react-icons/io";
import { RiEmotionLaughFill } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { TbThumbUp } from "react-icons/tb";

export default function Post() {
    const [showReactions, setShowReactions] = useState(false)
    return(
        <div className="flex flex-col">
            <div className="flex justify-between">
                <div className="flex justify-center items-center gap-2">
                    <RxAvatar className="h-10 w-10"/>
                    <div>
                        <h1 className="font-extrabold text-blue-500">Mwambu Kaumba</h1>
                        <h1 className="font-semibold text-xs text-gray-500">2hrs ago</h1>
                    </div>
                </div>
                <BiDotsVerticalRounded/>
            </div>
            <div className="py-2 pl-2">
                <h1>Welcome to unza uniconnect</h1>
            </div>
            <div className="flex justify-center">
                <Image src="/unza_logo.png" alt="unza logo" width={400} height={200}/>
            </div>
            <div className="flex justify-end gap-10">
                <div className="grid justify-center items-center">
                    <div className="flex justify-center items-center">
                        <IoMdThumbsUp onClick={()=>setShowReactions(!showReactions)}/>
                        <div>
                                <div className={`flex justify-between shadow-xl rounded-full p-2 ${showReactions? "visible" : "hidden"}`}>
                                    <IoMdThumbsUp className="text-blue-500 h-8 w-8"/>
                                    <HiHeart className="text-red-500 h-8 w-8"/>
                                    <RiEmotionLaughFill className="text-yellow-500 h-8 w-9"/>
                                </div>
                        </div>
                    </div>
                    <h1 className="text-xs text-gray-500">23 Reactions</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <BiComment/>
                    </div>
                    <h1 className="text-xs text-gray-500">12 Comments</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <BiShare/>
                    </div>
                    <h1 className="text-xs text-gray-500">2 Shares</h1>
                </div>
            </div>
        </div>
    )
}