/* eslint-disable no-unused-vars */
import ChatContainer from "@/components/ChatContainer";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen"> {/* Full screen height */}
      <div className="w-1/4 h-full bg-gray-200"> {/* Sidebar width and full height */}
        <Sidebar />
      </div>
      <div className="flex-1 h-full bg-white"> {/* ChatContainer takes remaining space */}
        <ChatContainer />
      </div>
    </div>
  );
};

export default Home;
