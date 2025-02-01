import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/header';
import ActiveStatus from '../components/active-status';
import { ArrowLeft } from 'lucide-react';

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
      username: 'User1',
      message: 'Hey, how are you?',
      date: '2023-10-01 10:00 AM',
    },
    {
      id: 2,
      username: 'User2',
      message: "I'm good, thanks! How about you?",
      date: '2023-10-01 10:05 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
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
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      username: 'User1', // Replace with dynamic user logic
      message: newMessage,
      date: new Date().toLocaleString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter key
      handleSendMessage();
    }
  };

  const handleShareMessage = (message: string) => {
    navigator.clipboard.writeText(message).then(() => {
      alert('Message copied to clipboard!');
    });
  };

  return (
    <>
      <Header />

      <main className="flex flex-col h-[calc(100dvh-64px)] bg-gradient-to-b from-purple-50 to-pink-50">
        {/* Fixed Header Section */}
        <div className="fixed top-16 left-0 right-0 bg-purple-100 px-4 py-2 border-y border-purple-200 z-10">
          <div className="grid max-w-4xl mx-auto">
            <span className="flex gap-3">
              <a
                href="#"
                className="bg-purple-200 hover:bg-purple-300 transition-colors self-start p-2 rounded"
              >
                <ArrowLeft className="w-5 h-5" />
              </a>
              <span className="w-10 h-10 shrink-0 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
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
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 w-full max-w-4xl mx-auto mt-20"
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.username === 'User1' ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-purple-700">
                  {msg.username}
                </span>
                <span className="text-xs text-gray-500">{msg.date}</span>
              </div>
              <div
                className={`relative max-w-[70%] p-3 rounded-lg ${
                  msg.username === 'User1'
                    ? 'bg-purple-800 text-white'
                    : 'bg-pink-800 text-white'
                }`}
              >
                <p>{msg.message}</p>
                <button
                  onClick={() => handleShareMessage(msg.message)}
                  className="absolute -bottom-4 right-0 text-xs text-purple-700 hover:text-purple-900"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Section */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-purple-200">
          <div className="flex space-x-2 items-end">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 p-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none overflow-y-auto max-h-32"
              style={{ minHeight: '40px' }} // Minimum height for the textarea
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
