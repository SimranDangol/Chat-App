import { BsImage } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const MessageInput = () => (
  <div className="p-4 text-black bg-white border-t">
    <div className="flex items-center w-full overflow-hidden bg-gray-300 rounded-full">
      <button className="p-2 text-gray-500 hover:text-gray-700">
        <BsImage className="w-6 h-6" />
      </button>
      <input
        type="text"
        placeholder="Send a message"
        className="flex-grow px-4 py-2 text-black bg-transparent focus:outline-none"
      />
      <button className="p-2 text-black hover:text-blue-700">
        <IoSend className="w-6 h-6" />
      </button>
    </div>
  </div>
);

export default MessageInput;
