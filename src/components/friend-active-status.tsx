import { useSocketStore } from "../stores/socket-store";
import ActiveStatus from "./active-status";

const FriendActiveStatus = ({ friendId }: { friendId: string }) => {
  const { activeFriends } = useSocketStore();
  const isOnline = activeFriends.includes(friendId);

  return <ActiveStatus online={isOnline} />;
};

export default FriendActiveStatus;
