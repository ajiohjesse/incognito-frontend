import { useState } from "react";
import ActiveStatus from "./active-status";

const Conversations = () => {
  const [conversations] = useState<
    Array<{
      id: string;
      friendUsername: string;
      messageCount: number;
      isActive: boolean;
    }>
  >([
    {
      id: "1",
      friendUsername: "AnonymousFriend1",
      messageCount: 12,
      isActive: true,
    },
    { id: "2", friendUsername: "SecretPal2", messageCount: 5, isActive: false },
    {
      id: "3",
      friendUsername: "MysteryBuddy3",
      messageCount: 20,
      isActive: true,
    },
  ]);
  return (
    <section className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-bold text-purple-900">
        Your Conversations
      </h2>
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

              <span className="grid">
                <span className="text-lg font-bold text-purple-900">
                  {convo.friendUsername}
                </span>
                <span className="font-medium text-purple-500">
                  {convo.messageCount} messages
                </span>

                <ActiveStatus />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Conversations;
