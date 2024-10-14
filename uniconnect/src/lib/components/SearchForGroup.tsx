import { BiSearch } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

export function SearchForGroup() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-5 w-full">
      <h1 className="pb-1">Search for a group</h1>
      <div className="flex items-center gap-2">
        <input
          className="bg-gray-100 w-full p-3 h-10 rounded-lg"
          placeholder="Write something..."
        />
        <BiSearch className="h-10 w-10 text-gray-400" />
      </div>
    </div>
  );
}
