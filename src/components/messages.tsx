import { useState } from 'react';

const Messages = () => {
  const [conversations] = useState<
    Array<{
      id: string;
      friendUsername: string;
      message: string;
    }>
  >([
    {
      id: '1',
      friendUsername: 'AnonymousFriend1',
      message:
        'Some random message that is just going to be truncated with a button to show more.',
    },
    {
      id: '3',
      friendUsername: 'MysteryBuddy3',
      message:
        'Some random message that is just going to be truncated with a button to show more.',
    },
  ]);
  return (
    <section className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-purple-900 mb-4">Your Messages</h2>
      <div className="space-y-4">
        {conversations.map(convo => (
          <a
            href="#"
            key={convo.id}
            className=" block p-4 bg-purple-50 rounded-lg hover:bg-purple-200 transition-colors shadow-md"
          >
            <span className="flex gap-3">
              <span className="w-10 h-10 shrink-0 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {convo.friendUsername[0]}
              </span>

              <span>
                <span className="font-bold text-lg text-purple-900">
                  {convo.friendUsername}
                </span>
                <span className="font-medium line-clamp-1">
                  {convo.message}
                </span>

                <span className="flex font-medium items-center gap-2 mt-3">
                  <span className="text-sm">
                    {convo.message ? 'Online' : 'Offline'}
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
