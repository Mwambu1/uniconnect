import Image from "next/image";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaBasketball } from "react-icons/fa6";

export default function PageCard() {
  return (
    <div className="flex flex-col bg-white p-5 rounded-lg">
      <div className="flex justify-between">
        <div className="flex justify-center items-center gap-2 w-full">
          <div className="flex justify-center rounded-full bg-gray-400 overflow-hidden">
          <Image
              src="/unza_logo.png"
              alt="unza logo"
              width={50}
              height={50}
            />
          </div>
          <div className="px-2 w-full">
            <div className="pt-1">
              <h1 className="font-extrabold text-xl text-blue-500">
                Basketball
              </h1>
            </div>
            <div className="flex justify-between w-full">
              <h1>Sports page</h1>
              <h1>2K followers</h1>
            </div>
          </div>
        </div>
        <BiDotsVerticalRounded />
      </div>
      <div className="flex mt-5">
        <h1>
          A page dedicated to coordinating and orgnaizing basketball
          events.
        </h1>
      </div>
      <button className="bg-blue-400 rounded-md h-8 mt-5">
        <h1 className="text-white">Follow</h1>
      </button>
    </div>
  );
}
