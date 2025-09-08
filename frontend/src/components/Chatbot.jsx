import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Dummy AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "🤖 AI: This transaction looks safe. No fraud detected.",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="mt-10 border rounded-lg shadow-lg p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">💬 Fraud Detection Chatbot</h2>
      <div className="h-48 overflow-y-auto border p-3 mb-3 bg-gray-50 rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded-md ${
              msg.sender === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 border rounded-l px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about a transaction..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
