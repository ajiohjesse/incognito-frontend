import { CopyIcon, ShareIcon } from 'lucide-react';
import { useState } from 'react';
// import { CopyIcon, ShareIcon, OnlineIcon, OfflineIcon } from './Icons';
import Messages from '../components/messages';
import Conversations from '../components/conversations';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';

const Dashboard = () => {
  const [username] = useState<string>('GhostUser123');
  const [messageLink] = useState<string>(
    'https://incognito.rehx.name.ng/ghostuser123'
  );

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
    <div className="bg-gradient-to-b from-purple-100 to-indigo-100">
      <div className="min-h-screen max-w-4xl mx-auto p-4 md:p-8">
        {/* Message Link Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h1 className="font-bold text-2xl mb-4 text-purple-900 break-words leading-6">
            Hi, {username}
          </h1>
          <p className="p-4 bg-purple-50 border break-words border-purple-300 rounded-xl text-purple-700 font-bold">
            {messageLink}
          </p>
          <p className="font-medium mt-2 mb-4">
            Share the above link with others to start receiving messages.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={copyLink}
              className="py-2 px-4 flex text-sm items-center font-semibold gap-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <CopyIcon className="size-4" />
              Copy Link
            </button>
            <button
              onClick={shareLink}
              className="py-2 px-4 flex text-sm items-center font-semibold gap-2  bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              <ShareIcon className="size-4" />
              Share Link
            </button>
          </div>
        </section>

        <div>
          <Tabs defaultValue="messages" className="">
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
            </TabsList>
            <TabsContent value="messages">
              <Messages />
            </TabsContent>
            <TabsContent value="conversations">
              <Conversations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
