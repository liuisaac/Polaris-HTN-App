"use client";

import React, { useState, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage: Message = { sender: 'user', content: userInput };
    setMessages(prev => [...prev, newMessage]);
    setUserInput('');

    const botResponse = await getBotResponse(userInput);
    setMessages(prev => [...prev, { sender: 'bot', content: botResponse }]);
  };

  // Simulate fetching AI response
  async function getBotResponse(input: string): Promise<string> {
    // This is where you'd connect to an AI API.
    // Returning a mock response for demonstration:
    return `Echo: ${input}`;
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.sender}`}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
