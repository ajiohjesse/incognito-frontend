import { useQuery } from "@tanstack/react-query";
import { MessageSquareIcon } from "lucide-react";
import { Link } from "react-router";
import { messagesQuery } from "../api/queries";
import FriendActiveStatus from "./friend-active-status";
import MessageText from "./message-text";

const Messages = () => {
  const { data } = useQuery(messagesQuery());

  if (!data) {
    return (
      <section className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-purple-900">
          Your Messages
        </h2>
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-pink-500"></div>
          <p className="text-lg text-purple-700">Loading...</p>
        </div>
      </section>
    );
  }

  const messages = data.messages;

  return (
    <section className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-8 text-lg font-bold text-purple-900">Your Messages</h2>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="grid place-items-center gap-2 py-4 text-center font-semibold">
            <MessageSquareIcon className="size-24 text-purple-400" />
            <p className="text-slate-600">
              You have no messages yet. Share your link to begin receiving
              messages.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <Link
              to={`/u/messages/${m.conversationId}`}
              key={m.id}
              className="block rounded-lg bg-purple-50 p-4 shadow-md transition-colors hover:bg-purple-200"
            >
              <span className="relative flex gap-3">
                <span className="absolute -top-8 -left-8 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                  {m.senderUsername[0]}
                </span>

                <span>
                  <span className="text-lg font-bold text-purple-900">
                    {m.senderUsername}
                  </span>
                  <span className="line-clamp-1 font-medium">
                    {
                      <MessageText
                        messageEncrypted={m.contentEncrypted}
                        sharedKeyEncrypted={m.userSharedKeyEncrypted}
                        iv={m.encryptionIV}
                      />
                    }
                  </span>

                  <span className="text-sm font-medium text-slate-600">
                    {new Date(m.createdAt).toLocaleString()}
                  </span>

                  <FriendActiveStatus friendId={m.senderId} />
                </span>
              </span>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Messages;
