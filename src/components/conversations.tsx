import { useQuery } from "@tanstack/react-query";
import { conversationsQuery } from "../api/queries";
import ActiveStatus from "./active-status";

interface Props {
  userId: string;
}

const Conversations = (props: Props) => {
  const { userId } = props;
  const { data } = useQuery(conversationsQuery());
  if (!data) {
    return <div>Loading...</div>;
  }

  const conversations = data.conversations;
  return (
    <section className="rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-lg font-bold text-purple-900">
        Your Conversations
      </h2>
      <div className="space-y-4">
        {conversations.length === 0 ? (
          <p>No conversations found at the moment</p>
        ) : (
          conversations.map((convo) => {
            const friend =
              convo.user1Id === userId
                ? convo.user_user1Id
                : convo.user_user2Id;
            return (
              <a
                href="#"
                key={convo.id}
                className="block rounded-lg bg-purple-50 p-4 shadow-md transition-colors hover:bg-purple-200"
              >
                <span className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
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
              </a>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Conversations;
