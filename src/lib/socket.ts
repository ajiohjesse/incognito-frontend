import { Socket } from "socket.io-client";

// interface MessageReceived {
//   id: string;
//   conversationId: string;
//   senderId: string;
//   contentEncrypted: string;
//   encryptionIV: string;
//   isDelivered: boolean;
//   createdAt: string;
// }

interface MessageSent {
  conversationId: string;
  contentEncrypted: string;
  encryptionIV: string;
  createdAt: string;
  receiverId: string;
}

interface ServerToClientEvents {
  "friends:online": (friends: string[]) => void;
  "friend:disconnect": (friendId: string) => void;
  "friend:connect": (friendId: string) => void;
  "friend:message": (message: { conversationId: string }) => void;
  "friend:typing": (friendId: string) => void;
  "friend:stopTyping": (friendId: string) => void;
}

interface ClientToServerEvents {
  "user:message": (message: MessageSent, cb: (sent: boolean) => void) => void;
  "user:typing": (friendId: string) => void;
  "user:stopTyping": (friendId: string) => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
