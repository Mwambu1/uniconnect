import Image from "next/image";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaBasketball } from "react-icons/fa6";

export default function GroupCard() {
  return (
    <div className="flex flex-col bg-white p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-2 w-full">
          <div className="flex justify-center rounded-full bg-gray-400 border-gray-400 border-2 overflow-hidden">
          <Image
              src="/gospel_envoys_logo.jpeg"
              alt="unza logo"
              width={50}
              height={50}
            />
          </div>
          <div className="px-2 w-full">
            <div className="pt-1">
              <h1 className="font-extrabold text-lg text-blue-500">
                GI UNZA ROYAL ACADEMY
              </h1>
            </div>
            <div className="flex justify-between w-full">
              <h1 className="text-md">Religious Group</h1>
              <h1 className="text-md">937 Memebers</h1>
            </div>
          </div>
        </div>
        <BiDotsVerticalRounded />
      </div>
      <div className="flex mt-3">
        <h1 className="text-sm">
          Gospel Envoys UNZA Academy.
        </h1>
      </div>
      <button className="bg-blue-400 rounded-md h-8 mt-3">
        <h1 className="text-white">Join Group</h1>
      </button>
    </div>
  );
}
