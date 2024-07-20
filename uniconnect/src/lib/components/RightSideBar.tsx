import Image from "next/image";
import { MdAddBox } from "react-icons/md";

export default function RightSideBar() {
    return(
        <div className="flex flex-col gap-3 bg-white rounded-lg p-5 min-h-screen h-fit w-[20%]">
            <div className="shadow-xl rounded-lg p-5 w-full">
                <h1>Upcoming events</h1>
                <Image src="/unza_logo.png" alt="unza logo" width={200} height={200} className="rounded-lg"/>
                <div className="flex justify-center items-center gap-3">
                    <div className="rounded-lg shadow-xl w-fit p-3">
                        <h1 className="font-semibold text-blue-400 text-sm">Jul</h1>
                        <h1 className="text-gray-500 font-extrabold text-sm">23</h1>
                    </div>
                    <div>
                        <h1 className="font-extrabold text-sm">Mid-year exams begin</h1>
                    </div>
                </div>
            </div>
            <div className="shadow-xl rounded-lg p-2 w-full border-t-2">
                <div className="flex justify-start gap-2 items-center">
                    <MdAddBox className="text-blue-500 w-7 h-7"/>
                    <input type="search" className="rounded-full text-black text-xs p-2 h-7 w-[60%]" placeholder="Search for a group..."/>
                </div>
                <div>
                    <Image src="/gospel_envoys_logo.jpeg" alt="gospel envoys logo" width={200} height={50}/>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-xs">
                        Gospel Envoys UNZA Academy
                    </div>
                    <div>
                        <button className="bg-blue-500 text-white rounded-full text-xs w-full p-1 h-7">Join group</button>
                    </div>
                </div>
            </div>
        </div>
    )
}