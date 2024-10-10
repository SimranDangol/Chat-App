import Conversations from "./Conversations";
import LogoutButton from "./Logout";
import logo_icon from "../../assets/logo_icon.png";
import { IoSearchSharp, IoEllipsisHorizontalSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-full text-white bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {/* Logo and Heading */}
        <div className="flex items-center">
          <img src={logo_icon} alt="Logo" className="w-10 mr-2" />
          <h1 className="text-xl font-bold">Chat App</h1>
        </div>
        {/* Three Dot Menu */}
        <IoEllipsisHorizontalSharp className="w-6 h-6 text-white cursor-pointer" />
      </div>

      {/* Search Input */}
      <div className="flex items-center px-4 py-2">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full p-2 text-white placeholder-gray-400 rounded-lg focus:outline-none bg-zinc-700"
        />
        <button
          type="submit"
          className="ml-2 text-white btn btn-circle bg-sky-500 hover:bg-sky-500"
        >
          <IoSearchSharp className="w-6 h-6" />
        </button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 py-2 overflow-y-auto">
        <Conversations />
      </div>

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
