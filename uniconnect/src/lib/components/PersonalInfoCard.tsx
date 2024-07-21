import { HiPhoto } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";

export default function PersonalInfoCard() {
    return(
        <div className="p-3 bg-white rounded-lg w-full">
            <div className="relative bg-gray-200 h-52 rounded-lg p-3">
                <div className="flex justify-center items-center w-full h-full">
                    <HiPhoto className="w-16 h-16"/>
                </div>
                <RxAvatar className="absolute -bottom-10 h-36 w-36 bg-white text-gray-500 rounded-full"/>
            </div>
        </div>
    )
}