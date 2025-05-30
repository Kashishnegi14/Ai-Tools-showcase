import React from "react";
import "./Chatbot.css";

const Message = ({ text, isUser }) => {
  return (
    <div className={`message ${isUser ? "user-message" : "bot-message"}`}>
      {text}
    </div>
  );
};

export default Message;
