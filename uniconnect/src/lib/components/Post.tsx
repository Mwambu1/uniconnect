"use client";
import Image from "next/image";
import { useState } from "react";
import { BiComment, BiDotsVerticalRounded, BiShare } from "react-icons/bi";
import { HiHeart } from "react-icons/hi";
import { IoMdThumbsUp } from "react-icons/io";
import { MdCelebration } from "react-icons/md";
import { RiEmotionLaughFill } from "react-icons/ri";
import { Post as PostType, User } from "../model/types";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/user/selectors";

export default function Post({ data }: { data: PostType }) {
  const [showReactions, setShowReactions] = useState(false);
  const user: User = useSelector(selectUser);
  const userId = user.userId;

  const [liked, setLiked] = useState(data.liked_by.includes(userId)); // Check if the user has already liked the post

  const updateLikeCount = async () => {
    // If already liked, remove like
    if (liked) {
      await updateDoc(doc(db, "posts", data.post_id), {
        like_count: data.like_count - 1,
        liked_by: arrayRemove(userId), // Remove userId from the liked_by array
      });

      setLiked(false); // Update local state
    } else {
      // If not liked, add like
      await updateDoc(doc(db, "posts", data.post_id), {
        like_count: data.like_count + 1,
        liked_by: arrayUnion(userId), // Add userId to the liked_by array
      });

      setLiked(true); // Update local state
    }
  };

  // Toggle Love reaction
  const updateLoveCount = async () => {
    if (liked) {
      // If already loved, decrement love count and remove user from liked_by array
      await updateDoc(doc(db, "posts", data.post_id), {
        love_count: data.love_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false); // Update local state
    } else {
      // If not loved, increment love count and add user to liked_by array
      await updateDoc(doc(db, "posts", data.post_id), {
        love_count: data.love_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true); // Update local state
    }
  };

  // Toggle Laugh reaction
  const updateLaughCount = async () => {
    if (liked) {
      // If already laughed, decrement laugh count and remove user from liked_by array
      await updateDoc(doc(db, "posts", data.post_id), {
        laugh_count: data.laugh_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false); // Update local state
    } else {
      // If not laughed, increment laugh count and add user to liked_by array
      await updateDoc(doc(db, "posts", data.post_id), {
        laugh_count: data.laugh_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true); // Update local state
    }
  };

  // Toggle Celebration reaction
  const updateCelebrationCount = async () => {
    if (liked) {
      // If already celebrated, decrement celebration count and remove user from liked_by array
      await updateDoc(doc(db, "posts", data.post_id), {
        celebrations_count: data.celebrations_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false); // Update local state
    } else {
      // If not celebrated, increment celebration count and add user to liked_by array
      await updateDoc(doc(db, "posts", data.post_id), {
        celebrations_count: data.celebrations_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true); // Update local state
    }
  };

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
              objectFit="cover"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-blue-500">{data.username}</h1>
            <h1 className="font-semibold text-xs text-gray-500">
              {data.created_at.toString()}
            </h1>
          </div>
        </div>
        <BiDotsVerticalRounded />
      </div>
      <div className="py-2 px-2 text-black">
        <h1>{data.content}</h1>
      </div>
      {hasMedia && (
        <div className="flex justify-center">
          <Image
            src={data.media_url[0]}
            alt="Post media"
            layout="responsive"
            width={400}
            height={200}
            objectFit="contain"
          />
        </div>
      )}
      <div className="flex justify-between gap-10 pt-5 px-2 pb-5">
        <div>
          <div className="relative flex p-2 h-fit">
            {data.like_count !== 0 &&  (
              <IoMdThumbsUp className="text-blue-500 h-8 w-8 absolute left-0 top-0 p-1 bg-white rounded-full" />
            )}
            {data.love_count !== 0 && (
              <HiHeart className="text-red-500 absolute h-8 w-8 left-5 top-0 p-1 bg-white rounded-full" />
            )}
            {data.celebrations_count !== 0 && (
              <MdCelebration className="text-green-500 h-8 w-8 absolute left-10 p-1 bg-white rounded-full top-0" />
            )}
            {data.laugh_count !== 0 && (
              <RiEmotionLaughFill className="text-yellow-500 h-8 w-8 absolute left-14 p-1 bg-white rounded-full top-0" />
            )}
          </div>
          <div className="mt-3 flex justify-center">
            {data.like_count +
              data.love_count +
              data.laugh_count +
              data.celebrations_count !==
              0 && (
              <h1 className="text-xs text-gray-500 w-full text-center">
                {data.like_count +
                  data.love_count +
                  data.laugh_count +
                  data.celebrations_count}{" "}
                Reactions
              </h1>
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="grid justify-center items-center h-fit">
            <div
              onClick={() => setShowReactions(!showReactions)}
              className="flex justify-center items-center"
            >
              {!showReactions ? (
                <div className="flex">
                  {liked ? (
                    <IoMdThumbsUp className="text-blue-500" />
                  ) : (
                    <IoMdThumbsUp className="text-black" />
                  )}
                </div>
              ) : (
                <div
                  onClick={() => setShowReactions(!showReactions)}
                  className={`relative z-0 flex justify-between gap-x-2 shadow-xl rounded-full p-2 ${
                    showReactions ? "visible" : "hidden"
                  }`}
                >
                  <div onClick={updateLikeCount} className="h-8 w-8">
                    <IoMdThumbsUp className="text-blue-500 h-8 w-8 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out" />
                  </div>
                  <div className="h-8 w-8" onClick={updateLoveCount}>
                    <HiHeart className="text-red-500 h-8 w-8 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out" />
                  </div>
                  <div className="h-8 w-8" onClick={updateLaughCount}>
                    <RiEmotionLaughFill className="text-yellow-500 h-8 w-9 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out" />
                  </div>
                  <div className="h-8 w-8" onClick={updateCelebrationCount}>
                    <MdCelebration className="text-green-500 h-8 w-9 hover:absolute hover:h-12 hover:w-12 transition-transform duration-200 ease-in-out" />
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-xs text-gray-500 w-full text-center">
              {data.like_count +
                data.love_count +
                data.laugh_count +
                data.celebrations_count}{" "}
              Reactions
            </h1>
          </div>
          <div>
            <div className="flex justify-center items-center">
              <BiComment className="text-black" />
            </div>
            <h1 className="text-xs text-gray-500">
              {data.comment_count} Comments
            </h1>    
          </div>
          {/* <div>
            <div className="flex justify-center items-center">
              <BiShare className="text-black" />
            </div>
            <h1 className="text-xs text-gray-500">2 Shares</h1>
          </div> */}
        </div>
      </div>
    </div>
  );
}
