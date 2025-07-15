import { useState } from "react";
import "../css/ChatbotWidget.css";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = input;
    setMessages([...messages, `🧑: ${userMessage}`]);
    setInput("");

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, `🤖: ${data.reply}`]);
  };

  return (
    <div className="chatbot-container">
      {open ? (
        <div className="chatbox">
          <div className="chat-header">
            <span>Chat with BMO AI</span>
            <button onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message">{msg}</div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <button className="chatbot-button" onClick={() => setOpen(true)}>💬</button>
      )}
    </div>
  );
};

export default ChatbotWidget;
