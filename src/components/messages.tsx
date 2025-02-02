import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { messagesQuery } from "../api/queries";
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
          <p>
            You have no messages yet. Share you link to begin receiving
            messages.
          </p>
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

                  <span className="mt-3 flex items-center gap-2 font-medium">
                    <span className="text-sm">
                      {m.isDelivered ? "Online" : "Offline"}
                    </span>
                    {m.isDelivered ? (
                      <span className="size-2 rounded-full bg-green-600" />
                    ) : (
                      <span className="size-2 rounded-full bg-rose-600" />
                    )}
                  </span>
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
