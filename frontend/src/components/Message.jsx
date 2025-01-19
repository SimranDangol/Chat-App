// import React, { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "@/redux/chat/messageslice";
// import { axiosInstance } from "@/lib/axios";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// const Message = () => {
//   const scroll = useRef();
//   const { selectedUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const { messages } = useSelector((state) => state.message);
//   const { currentUser } = useSelector((state) => state.user); // Updated line

//   useEffect(() => {
//     if (selectedUser?._id) {
//       const fetchMessages = async () => {
//         try {
//           const res = await axiosInstance.get(`/message/${selectedUser._id}`);
//           const messagesData = res.data?.data || [];
//           console.log("New messages:", messagesData);
//           dispatch(setMessages(messagesData));
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//           dispatch(setMessages([]));
//         }
//       };
//       fetchMessages();
//     }
//   }, [selectedUser, dispatch]);

//   useEffect(() => {
//     // Scroll to the latest message when messages are updated
//     if (scroll.current) {
//       scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     }
//   }, [messages]);

//   if (!Array.isArray(messages) || messages.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400">
//         No messages yet. Start a conversation!
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full gap-4 p-4 overflow-y-auto">
//       {messages.map((msg) => {
//         const isCurrentUser = msg.senderId._id === currentUser._id;

//         return (
//           <div
//             key={msg._id}
//             className={`flex flex-col ${
//               isCurrentUser ? "items-end" : "items-start"
//             }`}
//           >
//             <div
//               className={`max-w-[70%] rounded-lg p-3 ${
//                 isCurrentUser
//                   ? "bg-amber-500 text-white"
//                   : "bg-slate-700 text-white"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 {/* Avatar and fallback */}
//                 <Avatar>
//                   <AvatarImage
//                     src={msg.senderId?.profileImage || "/default-avatar.png"} // Fallback image if profile image is not available
//                     alt={msg.senderId?.name || "User"}
//                   />
//                   <AvatarFallback>
//                     {/* Fallback shows the initials of the sender */}
//                     {msg.senderId?.fullName
//                       ? msg.senderId.fullName
//                           .split(" ")
//                           .map((name) => name.charAt(0))
//                           .join("")
//                       : "U"}
//                     {/* Display the initials or "U" if full name is unavailable */}
//                   </AvatarFallback>
//                 </Avatar>
//                 {/* Sender name and message */}
//                 <div>
//                   {msg.text && (
//                     <div className="mb-2 break-words">{msg.text}</div>
//                   )}
//                 </div>
//               </div>
//               <div className="text-xs opacity-75">
//                 {new Date(msg.createdAt).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       {/* This div helps scroll to the bottom after each message update */}
//       <div ref={scroll} />
//     </div>
//   );
// };

// export default Message;

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/chat/messageslice";
import { axiosInstance } from "@/lib/axios";

const Message = () => {
  const scroll = useRef();
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.message);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (selectedUser?._id) {
      const fetchMessages = async () => {
        try {
          const res = await axiosInstance.get(`/message/${selectedUser._id}`);
          const messagesData = res.data?.data || [];
          dispatch(setMessages(messagesData));
        } catch (error) {
          console.error("Error fetching messages:", error);
          dispatch(setMessages([]));
        }
      };
      fetchMessages();
    }
  }, [selectedUser, dispatch]);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-y-auto">
      {messages.map((msg) => {
        const myUserId = localStorage.getItem('userId') || currentUser?.message?._id;
        const senderUserId = msg.senderId?._id;
        
        const isCurrentUser = myUserId === senderUserId;

        return (
          <div
            key={msg._id}
            className={`flex flex-col ${!isCurrentUser ? 'items-start' : 'items-end'} space-y-2`}
          >
            {/* Left side avatar for other user's messages */}
            {!isCurrentUser && (
              <div className="flex-shrink-0 w-8 h-8 mr-2 overflow-hidden rounded-full">
                <img
                  src={msg.senderId?.profileImage || "/default-avatar.png"}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <div className={`px-4 py-2 rounded-2xl ${
              !isCurrentUser
                ? "bg-[#1e2732] text-white rounded-bl-none"
                : "bg-blue-500 text-white rounded-br-none"
            }`}>
              <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className={`text-xs text-gray-500 mt-1 ${!isCurrentUser ? 'text-left' : 'text-right'}`}>
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })}
            </span>
            
            {/* Right side avatar for current user's messages */}
            {isCurrentUser && (
              <div className="flex-shrink-0 w-8 h-8 ml-2 overflow-hidden rounded-full">
                <img
                  src={currentUser?.message?.profileImage || "/default-avatar.png"}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        );
      })}
      <div ref={scroll} />
    </div>
  );
};

export default Message;
