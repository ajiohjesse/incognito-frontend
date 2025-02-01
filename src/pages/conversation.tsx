import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ActiveStatus from "../components/active-status";
import Header from "../components/header";

interface Message {
  id: number;
  username: string;
  message: string;
  date: string;
}

const Conversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "User1",
      message: "Hey, how are you?",
      date: "2023-10-01 10:00 AM",
    },
    {
      id: 2,
      username: "User2",
      message: "I'm good, thanks! How about you?",
      date: "2023-10-01 10:05 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  }, [newMessage]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: messages.length + 1,
      username: "User1", // Replace with dynamic user logic
      message: newMessage,
      date: new Date().toLocaleString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter key
      handleSendMessage();
    }
  };

  const handleShareMessage = (message: string) => {
    navigator.clipboard.writeText(message).then(() => {
      alert("Message copied to clipboard!");
    });
  };

  return (
    <>
      <Header />

      <main className="flex h-[calc(100dvh-64px)] flex-col bg-gradient-to-b from-purple-50 to-pink-50">
        {/* Fixed Header Section */}
        <div className="z-10 border-y border-purple-200 bg-purple-100 px-4 py-2">
          <div className="mx-auto grid max-w-4xl">
            <span className="flex gap-3">
              <a
                href="#"
                className="self-start rounded bg-purple-200 p-2 transition-colors hover:bg-purple-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </a>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                G
              </span>

              <span className="grid">
                <span className="font-bold text-purple-900">GhostUser421</span>
                <ActiveStatus />
              </span>
            </span>
          </div>
        </div>

        {/* Chat Section */}
        <section
          ref={chatContainerRef}
          className="mx-auto w-full flex-1 overflow-y-auto p-4 py-12"
        >
          <div className="mx-auto max-w-4xl space-y-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.username === "User1" ? "items-end" : "items-start"
                }`}
              >
                <div className="mb-2 grid">
                  <span className="justify-self-end text-sm font-semibold text-purple-700">
                    {msg.username}
                  </span>
                  <span className="text-xs text-gray-500">{msg.date}</span>
                </div>
                <div
                  className={`relative max-w-[70%] rounded-lg p-3 break-words ${
                    msg.username === "User1"
                      ? "bg-purple-800 text-white"
                      : "bg-pink-800 text-white"
                  }`}
                >
                  <p>{msg.message}</p>
                  <button
                    onClick={() => handleShareMessage(msg.message)}
                    className="absolute right-0 -bottom-4 text-xs text-purple-700 hover:text-purple-900"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Message Input Section */}
        <div className="border-t border-purple-200 bg-white p-4">
          <div className="mx-auto flex max-w-4xl items-end space-x-2">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="max-h-32 flex-1 resize-none overflow-y-auto rounded-lg border border-purple-300 p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              style={{ minHeight: "40px" }} // Minimum height for the textarea
            />
            <button
              onClick={handleSendMessage}
              className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Conversation;
