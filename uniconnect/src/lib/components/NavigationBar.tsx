import { BiSearch } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";

export default function NavigationBar() {
    return(
        <div className="p-5 rounded-lg overflow-clip flex justify-between">
            <div>
                <h1 className="font-extrabold text-gray-500">UNICONNECT</h1>
            </div>
            <div className="flex justify-evenly px-10">
                <div className="px-5">
                    <IoIosNotifications />
                </div>
                <div>
                    <MdMessage />
                </div>
                <div>
                    <input type="search"></input>
                    <button><BiSearch/></button>
                </div>
            </div>
        </div>
    )
}