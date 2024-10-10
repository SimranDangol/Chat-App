import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { CiCircleInfo } from "react-icons/ci";

const MessageContainer = () => {
  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-slate-50">
        <span className="font-bold">John Doe</span>
        <button className="btn btn-ghost btn-circle">
          <CiCircleInfo className="w-6 h-6 text-neutral-content" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
