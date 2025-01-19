import { MessageCircle } from "lucide-react";
import ChatHeader from "./ChatHeader";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import MessageInput from "./MessageInput";
import Message from "./Message";

const ChatContainer = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  console.log(selectedUser);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      {selectedUser && <ChatHeader className="w-full" />}

      {!selectedUser ? (
        <div className="flex flex-col items-center justify-center flex-1">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="pt-6 text-center">
              <div className="mb-4">
                <div className="flex items-center justify-center w-8 h-8 mx-auto rounded-lg bg-slate-700">
                  <MessageCircle className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <h1 className="mb-2 text-xl font-semibold text-amber-500">
                Welcome to Chatty!
              </h1>
              <p className="text-slate-500">
                Select a conversation from the sidebar to start chatting
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex-1">
          {/* Chat content */}
          <Message />
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Messages or chat history */}
          </div>
          <MessageInput />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
