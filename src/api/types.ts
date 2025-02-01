type User = {
  id: string;
  username: string;
  publicKey: string;
};

type Conversation = {
  id: string;
  user1Id: string;
  user2Id: string;
  sharedKeyEncryptedByUser1: string;
  sharedKeyEncryptedByUser2: string;
  createdAt: string;
  user_user1Id: {
    id: string;
    username: string;
    publicKey: string;
  };
  user_user2Id: {
    id: string;
    username: string;
    publicKey: string;
  };
};

type Message = {
  id: string;
  createdAt: string;
  conversationId: string;
  senderId: string;
  contentEncrypted: string;
  isDelivered: boolean;
};

export type ApiTypes = {
  user: User;
  conversation: Conversation;
  message: Message;
};
