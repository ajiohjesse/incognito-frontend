import { CopyIcon, DotIcon, ShareIcon } from 'lucide-react';
import { useState } from 'react';
// import { CopyIcon, ShareIcon, OnlineIcon, OfflineIcon } from './Icons';
const Dashboard = () => {
  const [username] = useState<string>('GhostUser123');
  const [messageLink] = useState<string>(
    'https://incognito.rehx.name.ng/ghostuser123'
  );
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

  const copyLink = () => {
    navigator.clipboard.writeText(messageLink);
    alert('Link copied to clipboard!');
  };

  const shareLink = async () => {
    try {
      await navigator.share({ title: 'My Incognito Link', url: messageLink });
    } catch {
      alert('Sharing failed. Please copy the link manually.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-purple-900">
          Welcome, {username}!
        </h1>
        <button className="text-sm text-purple-500 hover:text-purple-700">
          Logout
        </button>
      </header>

      {/* Message Link Section */}
      <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-lg font-semibold text-purple-900 mb-4">
          Your Message Link
        </h2>
        <p>Share this link with others to start receiving messages.</p>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={messageLink}
            readOnly
            className="flex-1 p-2 border font-mediumzz border-purple-200 rounded-lg text-purple-900 bg-purple-50"
          />
          <button
            onClick={copyLink}
            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <CopyIcon className="w-5 h-5" />
          </button>
          <button
            onClick={shareLink}
            className="p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Conversations List */}
      <section className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold text-purple-900 mb-4">
          Your Conversations
        </h2>
        <div className="space-y-4">
          {conversations.map(convo => (
            <div
              key={convo.id}
              className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {convo.friendUsername[0]}
                </div>
                <div>
                  <p className="font-semibold text-purple-900">
                    {convo.friendUsername}
                  </p>
                  <p className="text-sm text-purple-500">
                    {convo.messageCount} messages
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {convo.isActive ? (
                  <DotIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <DotIcon className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm text-purple-500">
                  {convo.isActive ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
