import { BiVideo } from "react-icons/bi";
import { FaSmile } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";


export default function MakeApost() {
    return(
        <div className="bg-white rounded-lg shadow-xl p-5 w-full">
            <h1 className="pb-1">Create a post</h1>
            <input className="bg-gray-100 w-full p-3 rounded-lg" placeholder="Write something..."></input>
            <div className="flex justify-end items-center gap-5 w-full p-5">
                <div className="">
                    <div className="flex justify-center items-center">
                        <BiVideo/>
                    </div>
                   <h1 className="text-xs text-gray-400 text-center">Video</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <FcGallery/>
                    </div>
                    <h1 className="text-xs text-gray-400">Photos</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <FaLocationPin className="text-green-300"/>
                    </div>
                    <h1 className="text-xs text-gray-400">Location</h1>
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <FaSmile className="text-yellow-400"/>
                    </div>
                    <h1 className="text-xs text-gray-400">Feeling</h1>
                </div>
                <button className="bg-blue-500 text-white p-1 rounded-lg">Post</button>
            </div>
        </div>
    )
}