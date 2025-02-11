import { useQueries, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ArrowLeft, CornerUpRight } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router";
import {
  conversationMessagesQuery,
  conversationQuery,
  messagesQuery,
  userQuery,
} from "../api/queries";
import ActiveStatus from "../components/active-status";
import ErrorDisplay from "../components/error";
import Header from "../components/header";
import PageLoader from "../components/page-loader";
import Spinner from "../components/ui/spinner";
import useDecryptMessage from "../hooks/use-decrypt-message";
import useViewportHeight from "../hooks/use-viewport-height";
import Encrypter from "../lib/encrypter";
import { queryClient } from "../lib/react-query";
import { storage } from "../lib/storage";
import { cn, formatDate } from "../lib/utils";
import { useShareMessageStore } from "../stores/share-message-store";
import { useSocketStore } from "../stores/socket-store";

interface Message {
  id: number;
  username: string;
  message: string;
  date: string;
}

const Conversation: React.FC = () => {
  const { conversationId } = useParams();

  const { socket, connect } = useSocketStore();
  useEffect(() => {
    if (socket) return;
    connect();
  }, [socket, connect]);

  const viewportHeight = useViewportHeight();

  const [userResult, conversationResult] = useQueries({
    queries: [userQuery(), conversationQuery(conversationId)],
  });

  if (userResult.error || conversationResult.error) {
    if (
      isAxiosError(userResult.error) &&
      userResult.error.response?.status === 401
    ) {
      return <Navigate to="/" />;
    }
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
    <div style={{ maxHeight: viewportHeight, overflow: "hidden" }}>
      <Header />
      <main
        style={{
          height: viewportHeight - 64,
        }}
        className={cn(
          "flex flex-col bg-gradient-to-b from-purple-50 to-pink-50",
        )}
      >
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
          friendId={friend.id}
        />
        <ConversationFooter
          conversationId={conversation.id}
          friendId={friend.id}
          sharedKeyEncrypted={sharedKeyEncrypted}
          userId={user.id}
        />
      </main>
    </div>
  );
};

export default Conversation;

const ConversationHeader = ({
  friendUsername,
  friendId,
}: {
  friendUsername: string;
  friendId: string;
}) => {
  const { activeFriends, friendsTyping } = useSocketStore();
  const isOnline = activeFriends.includes(friendId);
  const isTyping = friendsTyping.includes(friendId);

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
            <ActiveStatus online={isOnline} />
            <span
              className={cn(
                "animate-pulse text-sm font-medium",
                isTyping ? "visible" : "invisible",
              )}
            >
              Is Typing . . .
            </span>
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
  friendId,
}: {
  conversationId: string;
  sharedKeyEncrypted: string;
  username: string;
  userId: string;
  friendUsername: string;
  friendId: string;
}) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { data, error } = useQuery(conversationMessagesQuery(conversationId));
  const { friendsTyping } = useSocketStore();
  const isTyping = friendsTyping.includes(friendId);
  const [decryptedMessagesCount, setDecryptedMessagesCount] = useState(0);

  // Scroll when all messages are decrypted
  useEffect(() => {
    if (!data || decryptedMessagesCount < data.messages.length) return;

    const messagesDiv = chatContainerRef?.current?.lastElementChild;
    messagesDiv?.scrollIntoView();
  }, [data, decryptedMessagesCount]);

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-pink-500"></div>
        <p className="animate-pulse text-center text-lg font-medium text-slate-500">
          Loading messages . . .
        </p>
      </div>
    );
  }

  return (
    <section className="relative mx-auto w-full flex-1 overflow-y-auto bg-[url('/chat-bg.jfif')] bg-cover bg-center p-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8" ref={chatContainerRef}>
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
            setDecryptedMessagesCount={setDecryptedMessagesCount}
          />
        ))}
        {isTyping && (
          <div className="w-fit animate-bounce rounded-2xl rounded-bl-none bg-pink-800 px-4 py-2 text-white">
            Is Typing . . .
          </div>
        )}
      </div>
    </section>
  );
};

const ConversationFooter = ({
  conversationId,
  friendId,
  sharedKeyEncrypted,
  userId,
}: {
  conversationId: string;
  friendId: string;
  sharedKeyEncrypted: string;
  userId: string;
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { socket } = useSocketStore();
  const encrypter = new Encrypter();

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  }, [newMessage]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      toast.error("Please enter a message before sending.", {
        id: "message-error",
      });
      return;
    }
    if (!socket) {
      toast.error("You can't send messages while discconnected!", {
        id: "message-error",
      });
      return;
    }

    setIsSending(true);

    try {
      const privateKey = storage.getPrivateKey();
      if (!privateKey) return;
      const sharedKey = await encrypter.decryptAESKeyWithRSA(
        privateKey,
        sharedKeyEncrypted,
      );
      const { encryptedData, iv } = await encrypter.encryptMessage(
        sharedKey,
        newMessage,
      );

      const now = new Date();
      now.setHours(now.getHours() - 1);

      queryClient.setQueryData(
        conversationMessagesQuery(conversationId).queryKey,
        (old) => ({
          messages: old
            ? [
                ...old.messages,
                {
                  contentEncrypted: encryptedData,
                  encryptionIV: iv,
                  createdAt: now.toISOString(),
                  senderId: userId,
                  conversationId,
                  id: crypto.randomUUID(),
                  isDelivered: false,
                },
              ]
            : [
                {
                  contentEncrypted: encryptedData,
                  encryptionIV: iv,
                  createdAt: now.toISOString(),
                  senderId: userId,
                  conversationId,
                  id: crypto.randomUUID(),
                  isDelivered: false,
                },
              ],
        }),
      );

      socket?.emit(
        "user:message",
        {
          conversationId: conversationId,
          contentEncrypted: encryptedData,
          encryptionIV: iv,
          receiverId: friendId,
        },
        (sent, message) => {
          if (message || !sent) {
            toast.error(message || "Message sending failed!", {
              id: "message-error",
            });
          }
          queryClient.invalidateQueries(
            conversationMessagesQuery(conversationId),
          );
          queryClient.invalidateQueries(messagesQuery());
        },
      );
      setNewMessage("");
    } catch (error) {
      console.error("Message Error:", error);
      toast.error("Message sending failed!", { id: "message-error" });
    } finally {
      setIsSending(false);
    }
  };

  const handleTypingEvent = () => {
    socket?.emit("user:typing", friendId);
  };
  const handleStopTypingEvent = () => {
    socket?.emit("user:stopTyping", friendId);
  };

  return (
    <div className="pointer-events-none border-t border-purple-200 bg-white p-4">
      <div className="pointer-events-auto mx-auto flex max-w-4xl items-end space-x-2">
        <textarea
          ref={textareaRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={handleTypingEvent}
          onBlur={handleStopTypingEvent}
          placeholder="Type a message..."
          rows={1}
          className="max-h-32 flex-1 resize-none overflow-y-auto rounded-lg border border-purple-300 p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          style={{ minHeight: "40px" }}
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          <Spinner loading={isSending} title="Sending message">
            Send
          </Spinner>
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
  setDecryptedMessagesCount: React.Dispatch<React.SetStateAction<number>>;
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
    setDecryptedMessagesCount,
  } = props;

  const message = useDecryptMessage({
    messageEncrypted: contentEncrypted,
    sharedKeyEncrypted,
    iv: encryptionIV,
  });

  // Notify parent when message is decrypted
  useEffect(() => {
    if (message) {
      setDecryptedMessagesCount((prev) => prev + 1);
    }
  }, [message, setDecryptedMessagesCount]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      className={cn("flex flex-col", isMine ? "items-end" : "items-start")}
    >
      <div className="mb-2 grid">
        <div className="flex items-center gap-2">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold text-white shadow-2xl",
              isMine ? "bg-purple-800" : "bg-pink-800",
            )}
          >
            {isMine ? username[0] : friendUsername[0]}
          </motion.span>
          <div className="grid">
            <span className="font-bold">
              {isMine ? username : friendUsername}
            </span>
            <span className="text-sm font-medium text-slate-600">
              {formatDate(createdAt)}
            </span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ x: isMine ? 20 : -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring" }}
        className={cn(
          "relative max-w-[80%] rounded-2xl px-4 py-2 break-words shadow-xl sm:max-w-[70%]",
          isMine
            ? "rounded-br-none bg-purple-800 text-white"
            : "rounded-bl-none bg-pink-800 text-white",
        )}
      >
        <p>{message}</p>
      </motion.div>
      <ShareButton message={message} />
    </motion.div>
  );
};

const ShareButton = ({ message }: { message: string }) => {
  const handleShare = () => {
    useShareMessageStore.getState().setMessage(message);
  };

  return (
    <Link
      to="/u/messages/share"
      onClick={handleShare}
      className="mt-2 flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm font-semibold text-purple-600 transition-colors hover:bg-purple-200 hover:text-purple-900"
    >
      Share <CornerUpRight className="size-4" />
    </Link>
  );
};
