import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { conversationsQuery } from "../api/queries";
import ActiveStatus from "./active-status";

interface Props {
  userId: string;
}

const Conversations = (props: Props) => {
  const { userId } = props;
  const { data } = useQuery(conversationsQuery());
  if (!data) {
    return (
      <section className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-purple-900">
          Your Conversations
        </h2>
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-pink-500"></div>
          <p className="text-lg text-purple-700">Loading...</p>
        </div>
      </section>
    );
  }

  const conversations = data.conversations;
  return (
    <section className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-8 text-lg font-bold text-purple-900">
        Your Conversations
      </h2>
      <div className="space-y-4">
        {conversations.length === 0 ? (
          <p>No conversations found at the moment</p>
        ) : (
          conversations.map((convo) => {
            const friend =
              convo.user1Id === userId
                ? convo.user_user2Id
                : convo.user_user1Id;
            return (
              <Link
                to={`/u/messages/${convo.id}`}
                key={convo.id}
                className="block rounded-lg bg-purple-50 p-4 shadow-md transition-colors hover:bg-purple-200"
              >
                <span className="relative flex gap-3">
                  <span className="absolute -top-8 -left-8 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                    {friend.username[0]}
                  </span>

                  <span className="grid">
                    <span className="text-lg font-bold text-purple-900">
                      {friend.username}
                    </span>
                    <span className="font-medium text-purple-500">
                      12 messages
                    </span>

                    <ActiveStatus />
                  </span>
                </span>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Conversations;
