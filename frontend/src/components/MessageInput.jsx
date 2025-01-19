/* eslint-disable no-unused-vars */
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addMessage } from "@/redux/chat/messageslice";
// import { axiosInstance } from "@/lib/axios";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { selectedUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     try {
//       const res = await axiosInstance.post(
//         `/message/send/${selectedUser._id}`,
//         { text: message }, // Only send the message text
//         {
//           headers: {
//             "Content-Type": "application/json", // No need for multipart
//           },
//         }
//       );

//       if (res.data?.data) {
//         console.log("New message sent:", res.data.data); // Log the sent message
//         dispatch(addMessage(res.data.data)); // Dispatch the new message
//         setMessage("");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//         />
//         <button
//           type="submit"
//           disabled={!message.trim()}
//           className="px-4 py-2 text-white rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
//         >
//           Send
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/redux/chat/messageslice";
import { axiosInstance } from "@/lib/axios";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { selectedUser } = useSelector((state) => state.user);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!message.trim()) return;
      
        try {
          const res = await axiosInstance.post(
            `/message/send/${selectedUser._id}`,
            { 
              text: message,
              // Use the correct ID path
              senderId: localStorage.getItem('userId') || currentUser?.message?._id
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          if (res.data?.data) {
            dispatch(addMessage(res.data.data));
            setMessage("");
          }
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };
  
    return (
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 px-4 py-2 bg-[#1e2732] text-white rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={!message.trim()}
          >
            →
          </button>
        </div>
      </form>
    );
  };
  

export default MessageInput;