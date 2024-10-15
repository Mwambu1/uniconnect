"use client"
import Image from "next/image";
import { useState } from "react";
import { BiComment, BiDotsVerticalRounded, BiShare } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoMdThumbsUp } from "react-icons/io";
import { MdCelebration } from "react-icons/md";
import { RiEmotionLaughFill } from "react-icons/ri";


export default function Post({ data }: { data: any }) {
    const [showReactions, setShowReactions] = useState(false);
    const [likes, setLikes] = useState(data.like_count);
    const [loves, setLoves] = useState(0);
    const [laughs, setLaughs] = useState(0);
    const [celebrations, setCelebrations] = useState(0);

    // Ensure media_url is defined and has at least one URL
    const hasMedia = data.media_url && data.media_url.length > 0;

    return (
        <div className="flex flex-col bg-white xl:p-5 rounded-lg">
            <div className="flex justify-between p-2">
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
            <div className="py-2 px-2 text-black">
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
            <div className="flex justify-between gap-10 pt-5 px-2 pb-5">
                <div className="relative flex p-2 h-fit">
                    {likes !==0?  <IoMdThumbsUp  className="text-blue-500 absolute left-0 top-0" />:""}
                    {loves !==0 ? <HiHeart className="text-red-500 absolute left-2 top-0"/>: ""}
                    {celebrations !==0 ? <MdCelebration className="text-green-500 absolute left-4  top-0"/>: ""}
                    {laughs !==0 ? <RiEmotionLaughFill className="text-yellow-500 absolute left-6 bg-white rounded-full top-0"/>: ""}    
                </div>
                <div className="flex gap-5">
                <div className="grid justify-center items-center">
                    <div onClick={() => setShowReactions(!showReactions)} className="flex justify-center items-center">
                       { !showReactions?
                        <div className="flex">
                            {likes !==0? <IoMdThumbsUp  className="text-blue-500" />: <IoMdThumbsUp/>}
                       </div>:
                        <div 
                        onClick={() => setShowReactions(!showReactions)} 
                        className={`relative z-0 flex justify-between gap-x-2 shadow-xl rounded-full p-2 ${showReactions ? "visible" : "hidden"}`}
                      >
                        <div onClick={() => setLikes(likes + 1)} className="h-8 w-8">
                          <IoMdThumbsUp className="text-blue-500 h-8 w-8 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out"/>
                        </div>
                        
                        <div className="h-8 w-8" onClick={() => setLoves(loves + 1)}>
                          <HiHeart className="text-red-500 h-8 w-8 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out"/>
                        </div>
                        
                        <div className="h-8 w-8" onClick={() => setLaughs(laughs + 1)}>
                          <RiEmotionLaughFill className="text-yellow-500 h-8 w-9 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out"/> 
                        </div>
                        
                        <div className="h-8 w-8" onClick={() => setCelebrations(celebrations + 1)}>
                          <MdCelebration className="text-green-500 h-8 w-9 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out"/>
                        </div>
                      </div>
                       }
                    </div>
                    <h1 className="text-xs text-gray-500 w-full text-center">{likes + laughs + loves + celebrations} Reactions</h1>
                </div>
                <div className="">
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
        </div>
    );
}