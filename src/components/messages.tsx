import { useState } from "react";

const Messages = () => {
  const [conversations] = useState<
    Array<{
      id: string;
      friendUsername: string;
      message: string;
    }>
  >([
    {
      id: "1",
      friendUsername: "AnonymousFriend1",
      message:
        "Some random message that is just going to be truncated with a button to show more.",
    },
    {
      id: "3",
      friendUsername: "MysteryBuddy3",
      message:
        "Some random message that is just going to be truncated with a button to show more.",
    },
  ]);
  return (
    <section className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-bold text-purple-900">Your Messages</h2>
      <div className="space-y-4">
        {conversations.map((convo) => (
          <a
            href="#"
            key={convo.id}
            className="block rounded-lg bg-purple-50 p-4 shadow-md transition-colors hover:bg-purple-200"
          >
            <span className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                {convo.friendUsername[0]}
              </span>

              <span>
                <span className="text-lg font-bold text-purple-900">
                  {convo.friendUsername}
                </span>
                <span className="line-clamp-1 font-medium">
                  {convo.message}
                </span>

                <span className="mt-3 flex items-center gap-2 font-medium">
                  <span className="text-sm">
                    {convo.message ? "Online" : "Offline"}
                  </span>
                  {convo.message ? (
                    <span className="size-2 rounded-full bg-green-600" />
                  ) : (
                    <span className="size-2 rounded-full bg-rose-600" />
                  )}
                </span>
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Messages;
