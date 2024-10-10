const Message = () => {
  return (
    <div className={`chat chat-end`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              "https://images.pexels.com/photos/5475178/pexels-photo-5475178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi!What up</div>
      <div className="flex items-center gap-1 text-xs text-black chat-footer">
        12:42
      </div>
    </div>
  );
};
export default Message;
