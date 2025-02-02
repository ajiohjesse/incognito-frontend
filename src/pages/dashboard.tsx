import { useQuery } from "@tanstack/react-query";
import { CopyIcon, ShareIcon } from "lucide-react";
import { Navigate } from "react-router";
import { userQuery } from "../api/queries";
import ActiveStatus from "../components/active-status";
import Conversations from "../components/conversations";
import Messages from "../components/messages";
import PageLoader from "../components/page-loader";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useSocketStore } from "../stores/socket-store";

const Dashboard = () => {
  const { data: user, error: userError } = useQuery(userQuery());
  const location = window.location.origin;

  if (userError) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <PageLoader />;
  }

  const copyLink = () => {
    // navigator.clipboard.writeText(messageLink);
    alert("Link copied to clipboard!");
  };

  const shareLink = async () => {
    try {
      // await navigator.share({ title: "My Incognito Link", url: messageLink });
    } catch {
      alert("Sharing failed. Please copy the link manually.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-100 to-indigo-100">
      <div className="mx-auto min-h-screen max-w-4xl p-4 md:p-8">
        {/* Message Link Section */}
        <section className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-2xl leading-6 font-bold break-words text-purple-900">
            Hi, {user.username}
          </h1>
          <div className="flex items-center gap-2 py-2">
            You are currently
            <UserOnlineStatus />
          </div>
          <p className="rounded-xl border border-purple-300 bg-purple-50 p-4 font-bold break-words text-purple-700">
            {`${location}/${user.id}`}
          </p>
          <p className="mt-2 mb-4 font-medium">
            Share the above link with others to start receiving messages.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={copyLink}
              className="flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-600"
            >
              <CopyIcon className="size-4" />
              Copy Link
            </button>
            <button
              onClick={shareLink}
              className="flex items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-600"
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
              <Conversations userId={user.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const UserOnlineStatus = () => {
  const { socket } = useSocketStore();
  return <ActiveStatus online={!!socket} />;
};
