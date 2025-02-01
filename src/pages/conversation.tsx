import { ArrowLeft, CornerUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { ApiTypes } from "../api/types";
import ActiveStatus from "../components/active-status";
import Header from "../components/header";
import { cn } from "../lib/utils";

interface Message {
  id: number;
  username: string;
  message: string;
  date: string;
}

const Conversation: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100dvh-64px)] flex-col bg-gradient-to-b from-purple-50 to-pink-50">
        <ConversationHeader />
        <ConversationBody />
        <ConversationFooter />
      </main>
    </>
  );
};

export default Conversation;

const ConversationHeader = () => {
  return (
    <div className="border-y border-purple-200 bg-purple-100 px-4 py-2">
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
  );
};

const ConversationBody = () => {
  const [messages] = useState<string[]>(["Sample message"]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      ref={chatContainerRef}
      className="mx-auto w-full flex-1 overflow-y-auto p-4 py-12"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {messages.map((_, idx) => (
          <Message key={idx} message={null} conversation={null} />
        ))}
      </div>
    </section>
  );
};

const ConversationFooter = () => {
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  }, [newMessage]);

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault(); // Prevent new line on Enter key
  //   }
  // };

  return (
    <div className="border-t border-purple-200 bg-white p-4">
      <div className="mx-auto flex max-w-4xl items-end space-x-2">
        <textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          // onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows={1}
          className="max-h-32 flex-1 resize-none overflow-y-auto rounded-lg border border-purple-300 p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          style={{ minHeight: "40px" }} // Minimum height for the textarea
        />
        <button
          // onClick={handleSendMessage}
          className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

interface MessageProps {
  message: ApiTypes["message"] | null;
  conversation: ApiTypes["conversation"] | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Message = (_props: MessageProps) => {
  const userId = "User1";

  return (
    <div
      className={cn(
        "flex flex-col",
        userId === "User1" ? "items-end" : "items-start",
      )}
    >
      <div className="mb-2 grid">
        <span className="justify-self-end font-semibold">Some User</span>
        <span className="text-xs font-medium text-slate-600">
          {new Date().toLocaleString()}
        </span>
      </div>
      <div
        className={cn(
          "relative max-w-[70%] rounded-2xl rounded-tr-none px-4 py-2 break-words",
          userId === "User1"
            ? "bg-purple-800 text-white"
            : "bg-pink-800 text-white",
        )}
      >
        <p>the decrypted message</p>
      </div>
      <button className="mt-2 flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-900">
        Share <CornerUpRight className="size-4" />
      </button>
    </div>
  );
};
