"use client";

import Image from "next/image";
import { useState } from "react";
import { BiCheckCircle, BiComment, BiDotsVerticalRounded, BiShare } from "react-icons/bi";
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
  const [comment, setComment] = useState(""); // Input for new comments
  const [comments, setComments] = useState<string[]>(data.comments_by || []); // Display existing comments
  const user: User = useSelector(selectUser);
  const userId = user.userId;

  const [liked, setLiked] = useState(data.liked_by.includes(userId)); // Check if the user has already liked the post

  const updateLikeCount = async () => {
    if (liked) {
      await updateDoc(doc(db, "posts", data.post_id), {
        like_count: data.like_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false);
    } else {
      await updateDoc(doc(db, "posts", data.post_id), {
        like_count: data.like_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true);
    }
  };

  const updateLoveCount = async () => {
    if (liked) {
      await updateDoc(doc(db, "posts", data.post_id), {
        love_count: data.love_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false);
    } else {
      await updateDoc(doc(db, "posts", data.post_id), {
        love_count: data.love_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true);
    }
  };

  const updateLaughCount = async () => {
    if (liked) {
      await updateDoc(doc(db, "posts", data.post_id), {
        laugh_count: data.laugh_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false);
    } else {
      await updateDoc(doc(db, "posts", data.post_id), {
        laugh_count: data.laugh_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true);
    }
  };

  const updateCelebrationCount = async () => {
    if (liked) {
      await updateDoc(doc(db, "posts", data.post_id), {
        celebrations_count: data.celebrations_count - 1,
        liked_by: arrayRemove(userId),
      });
      setLiked(false);
    } else {
      await updateDoc(doc(db, "posts", data.post_id), {
        celebrations_count: data.celebrations_count + 1,
        liked_by: arrayUnion(userId),
      });
      setLiked(true);
    }
  };

  const handleAddComment = async () => {
    if (comment.trim() === "") return;

    try {
      await updateDoc(doc(db, "posts", data.post_id), {
        comment_count: data.comment_count + 1,
        comments_by: arrayUnion(`${user.firstName}${user.lastName}: ${comment}`),
      });
      setComments((prev) => [...prev, `${user.firstName}${user.lastName}: ${comment}`]);
      setComment(""); // Clear the input
    } catch (error) {
      console.error("Error adding comment:", error);
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
        <div className="relative">
          <div className="relative flex p-2 h-10">
            {data.like_count !== 0 && (
              <IoMdThumbsUp className="text-blue-500 h-8 w-8 p-1 bg-white rounded-full" />
            )}
            {data.love_count !== 0 && (
              <HiHeart className="text-red-500 h-6 w-6 bg-white rounded-full" />
            )}
            {data.celebrations_count !== 0 && (
              <MdCelebration className="text-green-500 h-8 w-8 p-1 bg-white rounded-full" />
            )}
            {data.laugh_count !== 0 && (
              <RiEmotionLaughFill className="text-yellow-500 h-8 w-8 p-1 bg-white rounded-full" />
            )}
          </div>
        </div>
        <div className="relative flex gap-5">
          <div className="grid justify-center items-center h-10">
            <div
              onClick={() => setShowReactions(!showReactions)}
              className="flex justify-center items-center"
            >
              {!showReactions ? (
                <div className="flex">
                  {liked ? (
                    <BiCheckCircle className="text-blue-500" />
                  ) : (
                    <IoMdThumbsUp className="text-black" />
                  )}
                </div>
              ) : (
                <div
                  onClick={() => setShowReactions(!showReactions)}
                  className={`absolute z-0 flex -top-10 -left-40 w-fit justify-between bg-white gap-x-2 shadow-xl rounded-full p-2 ${
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
          <div className="mt-1">
            <div className="flex justify-center items-center">
              <BiComment className="text-black" />
            </div>
            <h1 className="text-xs text-gray-500">
              {data.comment_count} Comments
            </h1>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="px-2 py-4 border-t border-gray-300">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {comments.map((c, index) => (
            <div key={index} className="text-sm text-gray-700">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
