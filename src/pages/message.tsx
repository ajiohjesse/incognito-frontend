import { useMutation, useQueries } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { VenetianMaskIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { handshakeQuery, userQuery } from "../api/queries";
import { ApiTypes } from "../api/types";
import ErrorDisplay from "../components/error";
import PageLoader from "../components/page-loader";
import Spinner from "../components/ui/spinner";
import { api } from "../lib/axios";
import Encrypter from "../lib/encrypter";
import { queryClient } from "../lib/react-query";
import { storage } from "../lib/storage";
import { handleQueryError } from "../lib/utils";

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

  //if the current user is authenticated and there is a privateKey available,
  // send message from chat interface
  if (userResult.data && savedPrivateKey) {
    return (
      <UserToUserMessage
        userId={userResult.data.id}
        publicKey={userResult.data.publicKey}
      />
    );
  }

  //if the current user is not authenticated or no private key,
  // send message from dashboard
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

const UserToUserMessage = (props: { userId: string; publicKey: string }) => {
  //if yes,
  // check if there is a conversation with the friend
  //if yes, navigate to conversation component
  //if not, create a new conversation and redirect to it
  return <div>Enter</div>;
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
    <main className="bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="mx-auto flex max-w-4xl flex-col px-4 py-12">
        {/* Fancy Text Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-purple-700">
            <VenetianMaskIcon className="mr-2 mb-2 inline-block h-10 w-10 text-purple-500" />
            Send an Anonymous Message
          </h1>
          <p className="font-medium text-slate-800">
            Share your thoughts, feelings, or secrets without revealing your
            identity. Let your words speak for themselves!
          </p>
        </div>

        {/* Recipient Username Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-2 text-xl font-semibold text-purple-700">
            Sending to:
          </h2>
          <p className="text-lg text-pink-600">@{friend.username}</p>
        </div>

        {/* Message Input Section */}
        <div className="flex flex-1 flex-col rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-purple-700">
            Your Message:
          </h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your anonymous message here..."
            rows={1}
            className="flex-1 resize-none overflow-y-auto rounded-lg border border-purple-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            style={{ minHeight: "200px" }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isPending}
            className="mt-4 rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <Spinner loading={isPending} title="Sending message">
              Send Message
            </Spinner>
          </button>
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
