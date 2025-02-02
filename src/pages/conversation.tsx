import { useQueries, useQuery } from "@tanstack/react-query";
import { ArrowLeft, CornerUpRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import {
  conversationMessagesQuery,
  conversationQuery,
  userQuery,
} from "../api/queries";
import ActiveStatus from "../components/active-status";
import ErrorDisplay from "../components/error";
import Header from "../components/header";
import MessageText from "../components/message-text";
import PageLoader from "../components/page-loader";
import { cn } from "../lib/utils";

interface Message {
  id: number;
  username: string;
  message: string;
  date: string;
}

const Conversation: React.FC = () => {
  const { conversationId } = useParams();
  const [userResult, conversationResult] = useQueries({
    queries: [userQuery(), conversationQuery(conversationId)],
  });

  if (userResult.error || conversationResult.error) {
    return (
      <>
        <Header />
        <ErrorDisplay />
      </>
    );
  }

  if (!userResult.data || !conversationResult.data) {
    return <PageLoader />;
  }

  const user = userResult.data;
  const conversation = conversationResult.data;
  const friend =
    conversation.user1Id === user.id
      ? conversation.user_user2Id
      : conversation.user_user1Id;
  const sharedKeyEncrypted =
    conversation.user1Id === user.id
      ? conversation.sharedKeyEncryptedByUser1
      : conversation.sharedKeyEncryptedByUser2;

  return (
    <>
      <Header />
      <main className="flex h-[calc(100dvh-64px)] flex-col bg-gradient-to-b from-purple-50 to-pink-50">
        <ConversationHeader
          friendId={friend.id}
          friendUsername={friend.username}
        />
        <ConversationBody
          conversationId={conversation.id}
          sharedKeyEncrypted={sharedKeyEncrypted}
          friendUsername={friend.username}
          username={user.username}
          userId={user.id}
        />
        <ConversationFooter />
      </main>
    </>
  );
};

export default Conversation;

const ConversationHeader = ({
  friendUsername,
}: {
  friendUsername: string;
  friendId: string;
}) => {
  return (
    <div className="border-y border-purple-200 bg-purple-100 px-4 py-2">
      <div className="mx-auto grid max-w-4xl">
        <span className="flex gap-3">
          <Link
            to="/u/messages"
            className="self-start rounded bg-purple-200 p-2 transition-colors hover:bg-purple-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
            {friendUsername[0]}
          </span>

          <span className="grid">
            <span className="font-bold text-purple-900">{friendUsername}</span>
            <ActiveStatus />
          </span>
        </span>
      </div>
    </div>
  );
};

const ConversationBody = ({
  conversationId,
  username,
  userId,
  friendUsername,
  sharedKeyEncrypted,
}: {
  conversationId: string;
  sharedKeyEncrypted: string;
  username: string;
  userId: string;
  friendUsername: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { data, error } = useQuery(conversationMessagesQuery(conversationId));

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-pink-500"></div>
        <p className="text-lg text-purple-700">Loading...</p>
      </div>
    );
  }

  return (
    <section
      ref={chatContainerRef}
      className="mx-auto w-full flex-1 overflow-y-auto p-4 py-12"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {data.messages.map((msg, idx) => (
          <Message
            key={idx}
            contentEncrypted={msg.contentEncrypted}
            encryptionIV={msg.encryptionIV}
            sharedKeyEncrypted={sharedKeyEncrypted}
            username={username}
            friendUsername={friendUsername}
            createdAt={msg.createdAt}
            isMine={msg.senderId === userId}
          />
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
  contentEncrypted: string;
  encryptionIV: string;
  sharedKeyEncrypted: string;
  username: string;
  friendUsername: string;
  createdAt: string;
  isMine: boolean;
}

const Message = (props: MessageProps) => {
  const {
    contentEncrypted,
    encryptionIV,
    sharedKeyEncrypted,
    username,
    friendUsername,
    createdAt,
    isMine,
  } = props;

  return (
    <div className={cn("flex flex-col", isMine ? "items-end" : "items-start")}>
      <div className="mb-2 grid">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white shadow-2xl",
              isMine ? "bg-purple-800" : "bg-pink-800",
            )}
          >
            {isMine ? username[0] : friendUsername[0]}
          </span>
          <div className="grid">
            <span className="font-bold">
              {isMine ? username : friendUsername}
            </span>
            <span className="text-xs font-medium text-slate-600">
              {new Date(createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "relative max-w-[70%] rounded-2xl px-4 py-2 break-words",
          isMine
            ? "rounded-br-none bg-purple-800 text-white"
            : "rounded-bl-none bg-pink-800 text-white",
        )}
      >
        <p>
          <MessageText
            iv={encryptionIV}
            messageEncrypted={contentEncrypted}
            sharedKeyEncrypted={sharedKeyEncrypted}
          />
        </p>
      </div>
      <button className="mt-2 flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-200 hover:text-purple-900">
        Share <CornerUpRight className="size-4" />
      </button>
    </div>
  );
};
