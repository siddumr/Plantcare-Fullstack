import React, { useState } from 'react';
import './Chatbot.css';
import 'font-awesome/css/font-awesome.min.css';  // Import Font Awesome

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you with your plant care today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Toggle chat visibility
  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle user message input
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() !== '') {
      // Add user message
      setMessages([...messages, { text: input, sender: 'user' }]);

      // Process response based on input
      let botResponse = processInput(input);

      // Show typing indicator for bot response
      setIsTyping(true);

      // Add bot response after a delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' }
        ]);
        setIsTyping(false);
      }, 1000);

      // Clear input field
      setInput('');
    }
  };

  // Process input to generate bot response
  const processInput = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('water')) {
      return "💧 Plants need water to stay healthy, but be sure not to overwater!";
    }
    if (lowerInput.includes('sunlight')) {
      return "🌞 Most plants need indirect sunlight for 6-8 hours daily.";
    }
    if (lowerInput.includes('fertilizer') || lowerInput.includes('fertilize')) {
      return "🌿 You should fertilize your plants every 4-6 weeks during the growing season.";
    }
    if (lowerInput.includes('plant care')) {
      return "🌱 Sure! Let me know what kind of plant you are caring for, and I can provide specific advice.";
    }
    if (lowerInput === 'hi') {
      return "👋 Hello! How can I assist you with your plant care today?";
    }
    return "I will provide plant care advice shortly... ⏳";
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={handleToggleChat}>
        💬
      </div>

      {/* Chatbot Container */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span>Plant Care Assistant</span>
            <button className="close-btn" onClick={handleToggleChat}>X</button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chatbot-message ${message.sender} ${isTyping && message.sender === 'bot' ? 'typing' : ''}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input-form">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about plant care..."
              />
              <button onClick={handleSendMessage} className="send-btn">
                <i className="fa fa-paper-plane"></i> {/* Font Awesome Paper Plane Icon */}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
