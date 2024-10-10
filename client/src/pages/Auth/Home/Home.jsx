// import MessageContainer from "../../../components/Messages/MessageContainer";
// import Sidebar from "../../../components/ChatSidebar/Sidebar";

// const Home = () => {
// 	return (
// 		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
// 			<Sidebar />
// 			<MessageContainer />
// 		</div>
// 	);
// };
// export default Home;

import MessageContainer from "../../../components/Messages/MessageContainer";
import Sidebar from "../../../components/ChatSidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
