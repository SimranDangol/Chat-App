import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    <div className="flex items-center px-4 py-2 mt-auto mb-4 bg-white rounded-lg cursor-pointer w-fit hover:bg-gray-200">
      <BiLogOut className="w-6 h-6 text-gray-900" />
      <span className="ml-2 font-medium text-gray-900">Logout</span>
    </div>
  );
};

export default LogoutButton;
