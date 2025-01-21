import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const ChatContainer = () => {
  const { selectedUser } = useSelector((state) => state.user);

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow h-screen px-4 bg-gray-900">
        <Card className="w-full max-w-md p-6 bg-gray-800 border-gray-700">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 mb-4 bg-gray-700 rounded-full">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-200">
              Welcome to Chat
            </h2>
            <p className="text-sm text-gray-400">
              Select a conversation to start messaging
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen bg-gray-900">
      <ChatHeader />
      <Message />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
