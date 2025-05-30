import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import Message from "./Message.jsx";
import responses from "./responses.js";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(responses.greetings[0]);
      }, 500);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue);
      setInputValue("");
      generateResponse(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { text, isUser: false }]);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response;

    // Simple response logic - expand as needed
    if (input.includes("hello") || input.includes("hi")) {
      response =
        responses.greetings[
          Math.floor(Math.random() * responses.greetings.length)
        ];
    } else if (input.includes("help")) {
      response = responses.help;
    } else if (input.includes("thank")) {
      response = responses.thanksResponse;
    } else {
      response = responses.fallback;
    }

    // Simulate typing delay
    setTimeout(() => {
      addBotMessage(response);
    }, 500 + Math.random() * 500);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Help Bot</h3>
            <button className="chatbot-close" onClick={toggleChatbot}>
              ×
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                isUser={message.isUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        {isOpen ? "Close Chat" : "Chat with us"}
      </button>
    </div>
  );
};

export default Chatbot;
