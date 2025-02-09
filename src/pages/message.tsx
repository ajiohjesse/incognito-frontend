import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { MessageCircle, Shield, Trash2, VenetianMaskIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import {
  conversationWithFriendQuery,
  handshakeQuery,
  userQuery,
} from "../api/queries";
import { ApiTypes } from "../api/types";
import ErrorDisplay from "../components/error";
import PageLoader from "../components/page-loader";
import Spinner from "../components/ui/spinner";
import { api } from "../lib/axios";
import Encrypter from "../lib/encrypter";
import { queryClient } from "../lib/react-query";
import { storage } from "../lib/storage";
import { handleQueryError } from "../lib/utils";
import { useSocketStore } from "../stores/socket-store";

const Message: React.FC = () => {
  const { userId } = useParams();
  const savedPrivateKey = storage.getPrivateKey();

  const [handshakeResult, userResult] = useQueries({
    queries: [handshakeQuery(userId as string), userQuery()],
  });

  if (handshakeResult.error) {
    if (
      isAxiosError(handshakeResult.error) &&
      handshakeResult.error.status === 404
    ) {
      return <UserNotFound />;
    }
    return <ErrorDisplay />;
  }

  if (!handshakeResult.data || userResult.isLoading) {
    return <PageLoader />;
  }

  //dont allow user to send message to self
  if (userResult.data?.id === handshakeResult.data.id) {
    return <Navigate to="/u/messages" replace />;
  }

  //if the current user is authenticated and there is a privateKey available
  if (userResult.data && savedPrivateKey) {
    return (
      <UserToUserMessage
        userPublicKey={userResult.data.publicKey}
        friendUsername={handshakeResult.data.username}
        friendId={handshakeResult.data.id}
        friendPublicKey={handshakeResult.data.publicKey}
      />
    );
  }

  //if the current user is not authenticated or no private key,
  // send message from single message page
  //this will authenticate(create) the current user afresh
  //and delete its record if it existed before (i.e no private key)
  return (
    <FirstMessage
      friend={{
        id: handshakeResult.data.id,
        publicKey: handshakeResult.data.publicKey,
        username: handshakeResult.data.username,
      }}
    />
  );
};

export default Message;

const UserToUserMessage = (props: {
  userPublicKey: string;
  friendUsername: string;
  friendId: string;
  friendPublicKey: string;
}) => {
  const { userPublicKey, friendUsername, friendId, friendPublicKey } = props;
  const { data, error } = useQuery(conversationWithFriendQuery(friendId));
  const [message, setMessage] = useState("");
  const encrypter = new Encrypter();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["first-auth-message", friendId],
    mutationFn: async () => {
      const sharedKey = await encrypter.generateAESKey();
      const user1SharedKey = await encrypter.encryptAESKeyWithRSA(
        userPublicKey,
        sharedKey,
      );
      const user2SharedKey = await encrypter.encryptAESKeyWithRSA(
        friendPublicKey,
        sharedKey,
      );

      const { encryptedData, iv } = await encrypter.encryptMessage(
        sharedKey,
        message,
      );

      const data: ApiTypes["postFirstAuthMessage"] = {
        contentEncrypted: encryptedData,
        encryptionIV: iv,
        friendId,
        sharedKeyEncryptedByUser1: user1SharedKey,
        sharedKeyEncryptedByUser2: user2SharedKey,
      };

      return (
        await api.post<ApiTypes["conversationBasic"]>("/conversations", data)
      ).data.data;
    },
    onSuccess: (data) => {
      setMessage("");
      toast.success("Message sent successfully!", {
        id: "message-success",
      });

      navigate(`/u/messages/${data.conversation.id}`);
    },
  });

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data) {
    return <PageLoader />;
  }

  if (data.conversation) {
    return <Navigate to={`/u/messages/${data.conversation.id}`} />;
  }

  const handleSendMessage = () => {
    if (message.trim() === "") {
      toast.error("Please enter a message before sending.", {
        id: "message-error",
      });
      return;
    }
    mutate();
  };

  return (
    <MessageForm
      friendUsername={friendUsername}
      setMessage={setMessage}
      message={message}
      handleSendMessage={handleSendMessage}
      isPending={isPending}
    />
  );
};

interface FirstMessageProps {
  friend: {
    id: string;
    publicKey: string;
    username: string;
  };
}

const FirstMessage = (props: FirstMessageProps) => {
  const { friend } = props;
  const encrypter = new Encrypter();
  const { socket, connect } = useSocketStore();

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["first-message", friend.id],
    mutationFn: async () => {
      const { publicKey, privateKey } = await encrypter.generateKeyPair();
      storage.setPrivateKey(privateKey);
      const sharedKey = await encrypter.generateAESKey();

      const fingerprint = await storage.setDeviceFingerprint();
      if (!fingerprint) {
        throw new Error("Failed to generate device fingerprint");
      }

      const sharedKeyEncryptedByUser1 = await encrypter.encryptAESKeyWithRSA(
        publicKey,
        sharedKey,
      );

      const sharedKeyEncryptedByUser2 = await encrypter.encryptAESKeyWithRSA(
        friend.publicKey,
        sharedKey,
      );

      const { encryptedData, iv } = await encrypter.encryptMessage(
        sharedKey,
        message,
      );

      const data: ApiTypes["postFirstMessage"] = {
        publicKey,
        deviceFingerprint: fingerprint,
        receipientId: friend.id,
        sharedKeyEncryptedByUser1,
        sharedKeyEncryptedByUser2,
        contentEncrypted: encryptedData,
        encryptionIV: iv,
      };

      return (
        await api.post<ApiTypes["fisrtMessage"]>(
          `/conversations/messages`,
          data,
        )
      ).data.data;
    },
    onSuccess: (data) => {
      setMessage("");
      toast.success("Message sent successfully!", {
        id: "message-success",
      });
      if (!socket) connect();
      queryClient.invalidateQueries(userQuery());
      navigate(`/u/messages/${data.conversationId}`);
    },
    onError: (error) => {
      console.log(error);
      handleQueryError(error);
      storage.deletePrivateKey();
      storage.deleteDeviceFingerprint();
    },
  });

  const handleSendMessage = () => {
    if (message.trim() === "") {
      toast.error("Please enter a message before sending.", {
        id: "message-error",
      });
      return;
    }
    mutate();
  };

  return (
    <MessageForm
      friendUsername={friend.username}
      handleSendMessage={handleSendMessage}
      isPending={isPending}
      message={message}
      setMessage={setMessage}
    />
  );
};

interface MessageFormProps {
  friendUsername: string;
  handleSendMessage: () => void;
  message: string;
  setMessage: (message: string) => void;
  isPending: boolean;
}
const MessageForm = (props: MessageFormProps) => {
  const { friendUsername, handleSendMessage, isPending, message, setMessage } =
    props;

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Fancy Text Section */}
      <div className="bg-gradient-to-bl from-pink-500 to-purple-500 pt-12 pb-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="flex flex-col items-center gap-2">
            <VenetianMaskIcon className="mr-2 mb-2 inline-block size-20" />
            <h1 className="mb-4 text-4xl font-bold">
              Send an Anonymous Message
            </h1>
          </div>
          <p className="mx-auto max-w-[60ch] font-medium">
            Share your thoughts, feelings, or secrets without revealing your
            identity. Let your words speak for themselves!
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-12 flex max-w-3xl flex-col px-4 pb-12">
        {/* Recipient Username Section */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-2 text-xl font-semibold text-purple-700">
            Sending to:
          </h2>
          <p className="text-lg font-bold text-pink-700">@{friendUsername}</p>
        </div>

        {/* Message Input Section */}
        <div className="flex flex-1 flex-col rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold text-purple-700">
            Your Message:
          </h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your anonymous message here..."
            rows={1}
            className="flex-1 resize-none overflow-y-auto rounded-2xl border border-purple-300 bg-white px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            style={{ minHeight: "200px" }}
          />

          <div className="mt-4 rounded-2xl bg-purple-200 p-4 text-sm text-purple-800">
            🔒 Your identity stays secret throughout the entire chat!
          </div>

          <button
            onClick={handleSendMessage}
            disabled={isPending}
            className="mt-4 rounded-2xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Spinner loading={isPending} title="Sending message">
              Send Secret Message
            </Spinner>
          </button>
        </div>

        {/* Instructions Section */}
        {/* <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-purple-700">
            How It Works:
          </h2>
          <ul className="list-inside list-disc space-y-2 text-slate-700">
            <li>Start an anonymous conversation with this user.</li>
            <li>Both of you can reply to this conversation.</li>
            <li>
              You can delete your account at any point to stop receiving
              messages. You can always create a new link afterwards.
            </li>
          </ul>
        </div> */}

        {/* Fun Feature Cards - Moved to bottom */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Start Your Secret Chat!",
              desc: "Begin your mysterious journey anonymously",
            },
            {
              icon: <MessageCircle className="h-6 w-6" />,
              title: "Chat Back & Forth",
              desc: "Keep the conversation flowing both ways",
            },
            {
              icon: <Trash2 className="h-6 w-6" />,
              title: "Vanish Anytime",
              desc: "Poof! Delete and start fresh whenever you want",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-block rounded-xl bg-white/90 p-3 text-fuchsia-500 shadow-md">
                  {card.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-fuchsia-500">
                  {card.title}
                </h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

const UserNotFound: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50 p-6">
      <div className="mb-6 text-8xl">😕</div>{" "}
      <h1 className="mb-4 text-center text-4xl font-bold text-purple-700">
        User Not Found
      </h1>
      <p className="mb-8 text-center text-lg text-gray-600">
        Oops! It seems like the user you're looking for doesn't exist or has
        been removed.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
      >
        Go Back Home
      </Link>
    </div>
  );
};
