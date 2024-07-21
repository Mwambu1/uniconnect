import { FcCancel } from "react-icons/fc";
import MessageNotificationCard from "./MessageNotifcationCard";
import { BiCrosshair } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { selectMessagesToggle } from "../redux/slices/ToggleComponentSlice/selectors";
import { setMessagesToggle } from "../redux/slices/ToggleComponentSlice/toggleComponentsSlice";

export default function MessagesList() {
    const dispatch = useDispatch();
    const cancel = useSelector(selectMessagesToggle);

    const hiddeMessages=()=>{
        dispatch(setMessagesToggle(false))
    }

    return(
        <div className="bg-white p-3 border-2 shadow-xl rounded-lg">
            <div className="flex justify-between">
                <h1 className="font-semibold text-blue-400">Recent Messages</h1>
                <ImCancelCircle onClick={()=> hiddeMessages()} className="text-gray-400"/>
            </div>
            <div className="flex flex-col gap-1 p-2">
                <MessageNotificationCard/>
                <MessageNotificationCard/>
                <MessageNotificationCard/>
                <MessageNotificationCard/>
                <MessageNotificationCard/>
            </div>
        </div>
    )
}