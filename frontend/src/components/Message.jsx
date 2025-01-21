import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/chat/messageslice";
import { axiosInstance } from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const Message = () => {
  const scroll = useRef();
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedUser?._id) {
      const fetchMessages = async () => {
        setLoading(true);
        try {
          const res = await axiosInstance.get(`/message/${selectedUser._id}`);
          dispatch(setMessages(res.data?.data || []));
        } catch (error) {
          console.error("Error fetching messages:", error);
          dispatch(setMessages([]));
        } finally {
          setLoading(false);
        }
      };
      fetchMessages();
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4">
      <div className="py-4 space-y-4 sm:space-y-3 md:space-y-5">
        {messages.map((msg) => {
          const myUserId = localStorage.getItem("userId") || currentUser?._id;
          const isCurrentUser = myUserId === msg.senderId?._id;

          return (
            <div
              key={msg._id}
              className={`flex items-end gap-2 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={msg.senderId?.profileImage || "/default-avatar.png"}
                  />
                  <AvatarFallback className="text-gray-200 bg-gray-700">
                    {msg.senderId?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <div
                  className={`px-4 py-2 rounded-2xl max-w-md ${
                    isCurrentUser
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-200 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm break-words whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
                <span
                  className={`text-xs text-gray-500 mt-1 ${
                    isCurrentUser ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
              {isCurrentUser && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={currentUser?.profileImage || "/default-avatar.png"}
                  />
                  <AvatarFallback className="text-gray-200 bg-gray-700">
                    {currentUser?.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
        <div ref={scroll} />
      </div>
    </ScrollArea>
  );
};

export default Message;
