import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { messagesQuery } from "../api/queries";

const Messages = () => {
  const { data } = useQuery(messagesQuery());

  if (!data) {
    return <div>Loading...</div>;
  }

  const messages = data.messages;

  return (
    <section className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-bold text-purple-900">Your Messages</h2>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p>
            You have no messages yet. Share you link to begin receiving
            messages.
          </p>
        ) : (
          messages.map((m) => (
            <Link
              to="#"
              key={m.message.id}
              className="block rounded-lg bg-purple-50 p-4 shadow-md transition-colors hover:bg-purple-200"
            >
              <span className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                  {m.message.senderUsername[0]}
                </span>

                <span>
                  <span className="text-lg font-bold text-purple-900">
                    {m.message.senderUsername[0]}
                  </span>
                  <span className="line-clamp-1 font-medium">
                    {m.message.contentEncrypted}
                  </span>

                  <span className="mt-3 flex items-center gap-2 font-medium">
                    <span className="text-sm">
                      {m.message.isDelivered ? "Online" : "Offline"}
                    </span>
                    {m.message.isDelivered ? (
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
