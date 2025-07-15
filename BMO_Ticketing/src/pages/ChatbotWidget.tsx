import { useState } from "react";
import "../css/ChatbotWidget.css";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, `😸: ${data.reply}`]);
      } else {
        setMessages((prev) => [...prev, "😸: Sorry, I didn't get that."]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, "😸: Failed to reach AI server."]);
      console.error(err);
    }
  };

  return (
    <div className="chatbot-container">
      {open ? (
        <div className="chatbox">
          <div className="chat-header">
            <span>BMO AI Assistant</span>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                {msg}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="I'm BemoreAI, Ask me anything!"
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <div className="chatbot-button-wrapper">
          <button className="chatbot-button" onClick={() => setOpen(true)}>
            💬
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
