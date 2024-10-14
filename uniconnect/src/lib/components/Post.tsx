"use client"
import Image from "next/image";
import { useState } from "react";
import { BiComment, BiDotsVerticalRounded, BiShare } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoMdThumbsUp } from "react-icons/io";
import { RiEmotionLaughFill } from "react-icons/ri";


export default function Post({ data }: { data: any }) {
    const [showReactions, setShowReactions] = useState(false);

    // Ensure media_url is defined and has at least one URL
    const hasMedia = data.media_url && data.media_url.length > 0;

    return (
        <div className="flex flex-col bg-white p-5 rounded-lg">
            <div className="flex justify-between">
                <div className="flex justify-center items-center gap-2">
                   
                    <div className="relative w-10 h-10 rounded-full bg-gray-400 overflow-hidden">
                    <Image 
                        src={data.media_url[0]} 
                        alt="Post media" 
                        layout="fill"
                        objectFit="cover" // Cover to ensure the image covers the area
                    />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-blue-500">Mwambu Kaumba</h1>
                        <h1 className="font-semibold text-xs text-gray-500">{data.created_at}</h1>
                    </div>
                </div>
                <BiDotsVerticalRounded/>
            </div>
            <div className="py-2">
                <h1>{data.content}</h1>
            </div>
            {hasMedia && (
                <div className="flex justify-center">
                    <Image src={data.media_url[0]} alt="Post media"
                    layout="responsive"
                    width={400} // Aspect ratio width
                    height={200} // Aspect ratio height
                    objectFit="contain"/>
                </div>
            )}
            <div className="flex justify-end gap-10 pt-5">
                <div className="grid justify-center items-center">
                    <div className="flex justify-center items-center">
                       { !showReactions? <IoMdThumbsUp onClick={() => setShowReactions(!showReactions)}/>:
                        <div onClick={() => setShowReactions(!showReactions)} className={`flex justify-between shadow-xl rounded-full p-2 ${showReactions ? "visible" : "hidden"}`}>
                            <IoMdThumbsUp className="text-blue-500 h-8 w-8"/>
                            <HiHeart className="text-red-500 h-8 w-8"/>
                            <RiEmotionLaughFill className="text-yellow-500 h-8 w-9"/>
                        </div> }
                    </div>
                    <h1 className="text-xs text-gray-500 w-full text-center">{data.like_count} Reactions</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <BiComment/>
                    </div>
                    <h1 className="text-xs text-gray-500">{data.comment_count} Comments</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <BiShare/>
                    </div>
                    <h1 className="text-xs text-gray-500">2 Shares</h1>
                </div>
            </div>
        </div>
    );
}