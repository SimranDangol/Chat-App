import { useDispatch, useSelector } from "react-redux";
import { deselectUser } from "../redux/user/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);
  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 md:px-6 md:py-4">
      <div className="flex items-center gap-2 md:gap-4">
        <Avatar className="w-8 h-8 border-2 border-gray-800 md:w-10 md:h-10">
          <AvatarImage
            src={selectedUser?.profileImage || "/default-avatar.png"}
          />
          <AvatarFallback className="text-gray-200 bg-gray-700">
            {selectedUser?.fullName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-sm font-semibold text-gray-200 md:text-base">
            {selectedUser?.fullName}
          </h3>
          <p
            className={`text-xs md:text-sm ${
              isOnline ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Separator
          orientation="vertical"
          className="hidden h-6 mx-2 md:block"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(deselectUser())}
          className="text-gray-400 hover:text-gray-200"
        >
          <X className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
