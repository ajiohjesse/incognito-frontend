import { Socket } from "socket.io-client";

interface MessageSent {
  conversationId: string;
  contentEncrypted: string;
  encryptionIV: string;
  receiverId: string;
}

interface MessageReceived {
  conversationId: string;
  contentEncrypted: string;
  encryptionIV: string;
  createdAt: string;
  senderId: string;
  id: string;
  isDelivered: boolean;
}

interface ServerToClientEvents {
  "friends:online": (friends: string[]) => void;
  "friend:disconnect": (friendId: string) => void;
  "friend:connect": (friendId: string) => void;
  "friend:message": (message: MessageReceived) => void;
  "friend:typing": (friendId: string) => void;
  "friend:stopTyping": (friendId: string) => void;
}

interface ClientToServerEvents {
  "user:message": (
    message: MessageSent,
    cb: (sent: boolean, message?: string) => void,
  ) => void;
  "user:typing": (friendId: string) => void;
  "user:stopTyping": (friendId: string) => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;
