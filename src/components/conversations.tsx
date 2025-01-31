import { useState } from 'react';

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
      id: '1',
      friendUsername: 'AnonymousFriend1',
      messageCount: 12,
      isActive: true,
    },
    { id: '2', friendUsername: 'SecretPal2', messageCount: 5, isActive: false },
    {
      id: '3',
      friendUsername: 'MysteryBuddy3',
      messageCount: 20,
      isActive: true,
    },
  ]);
  return (
    <section className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-purple-900 mb-4">
        Your Conversations
      </h2>
      <div className="space-y-4">
        {conversations.map(convo => (
          <a
            href="#"
            key={convo.id}
            className="p-4 block bg-purple-50 rounded-lg hover:bg-purple-200 transition-colors shadow-md"
          >
            <span className="flex gap-3">
              <span className="w-10 h-10 shrink-0 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {convo.friendUsername[0]}
              </span>

              <span className="grid">
                <span className="font-bold text-lg text-purple-900">
                  {convo.friendUsername}
                </span>
                <span className="text-purple-500 font-medium">
                  {convo.messageCount} messages
                </span>

                <span className="flex font-medium items-center gap-2 mt-3">
                  <span className="text-sm">
                    {convo.isActive ? 'Online' : 'Offline'}
                  </span>
                  {convo.isActive ? (
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

export default Conversations;
