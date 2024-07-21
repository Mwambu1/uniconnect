import { RxAvatar } from "react-icons/rx";

export default function MessageNotificationCard() {
    return(
        <div className="flex flex-col rounded-lg border-2 p-1">
            <div className="flex justify-start items-center gap-1">
                <RxAvatar></RxAvatar>
                <h1 className="text-sm">Mwambu Kaumba</h1>
            </div>
            <div className="pl-6">
                <h1 className="text-xs">Hey there...</h1>
            </div>
            <div className="flex justify-end text-xs">
                <h1>11:33 hrs</h1>
            </div>
        </div>
    )
}