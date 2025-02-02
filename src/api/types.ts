interface ApiResponse<T> {
  type: "success" | "error";
  statusCode: number;
  message: string;
  data: T;
}

type CurrentUser = {
  id: string;
  createdAt: string;
  username: string;
  deviceFingerprint: string;
  publicKey: string;
};

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

type ConversationBasic = {
  id: string;
  user1Id: string;
  user2Id: string;
  sharedKeyEncryptedByUser1: string;
  sharedKeyEncryptedByUser2: string;
  createdAt: string;
};

type Message = {
  id: string;
  createdAt: string;
  conversationId: string;
  senderId: string;
  contentEncrypted: string;
  encryptionIV: string;
  isDelivered: boolean;
  senderUsername: string;
  userSharedKeyEncrypted: string;
};

type FirstMessage = {
  sharedKeyEncryptedByUser1: string;
  sharedKeyEncryptedByUser2: string;
  contentEncrypted: string;
  encryptionIV: string;
  receipientId: string;
  deviceFingerprint: string;
  publicKey: string;
};

type FirstAuthMessage = {
  sharedKeyEncryptedByUser1: string;
  sharedKeyEncryptedByUser2: string;
  contentEncrypted: string;
  encryptionIV: string;
  friendId: string;
};

export type ApiTypes = {
  user: ApiResponse<User>;
  currentUser: ApiResponse<CurrentUser>;
  conversations: ApiResponse<{ conversations: Conversation[] }>;
  messages: ApiResponse<{ messages: Message[] }>;
  postFirstMessage: FirstMessage;
  postFirstAuthMessage: FirstAuthMessage;
  fisrtMessage: ApiResponse<{ conversationId: string }>;
  conversationNullable: ApiResponse<{
    conversation: ConversationBasic | null;
  }>;
  conversation: ApiResponse<{
    conversation: ConversationBasic;
  }>;
};
