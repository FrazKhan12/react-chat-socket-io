import React, { useEffect, useState } from "react";
import ChatBar from "../componenets/ChatBar";
import ChatBody from "../componenets/ChatBody";
import ChatFooter from "../componenets/ChatFooter";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);
  return (
    <div>
      <div className="chat">
        <ChatBar socket={socket} />
        <div className="chat__main">
          <ChatBody messages={messages} />
          <ChatFooter socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
