import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { userQuery } from "../api/queries";
import ActiveStatus from "../components/active-status";
import Conversations from "../components/conversations";
import {
  CopyMessageLink,
  ShareMessageLink,
} from "../components/copy-and-share";
import DeleteAccount from "../components/delete-account";
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
  const { socket, connect } = useSocketStore();

  useEffect(() => {
    if (socket) return;
    connect();
  }, [socket, connect]);

  if (userError) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <PageLoader />;
  }

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

          <div className="flex max-w-[540px] flex-wrap items-center gap-2">
            <CopyMessageLink link={location + `/${user.id}`} />
            <ShareMessageLink link={location + `/${user.id}`} />
            <DeleteAccount />
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
