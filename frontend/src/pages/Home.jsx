/* eslint-disable no-unused-vars */
import ChatContainer from "@/components/ChatContainer";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Home = () => {
  return (
    <main className="flex w-full min-h-screen bg-gray-900">
      <Sidebar />
      <ChatContainer />
    </main>
  );
};

export default Home;
