import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/chat/messageslice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((state) => state.socket);
  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for new messages
    const handleNewMessage = (newMessage) => {
      // Check if the new message is already in the state before dispatching
      if (!messages.some((msg) => msg._id === newMessage.message._id)) {
        dispatch(setMessages([...messages, newMessage.message]));
      }
    };

    socket?.on("newMessage", handleNewMessage);

    // Clean up the socket listener on unmount
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);

  return null; // This hook does not render any UI
};

export default useGetRealTimeMessage;
