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

type Message = {
  id: string;
  createdAt: string;
  conversationId: string;
  senderId: string;
  contentEncrypted: string;
  encryptionIV: string;
  isDelivered: boolean;
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

export type ApiTypes = {
  user: ApiResponse<User>;
  currentUser: ApiResponse<CurrentUser>;
  conversations: ApiResponse<{ conversations: Conversation[] }>;
  messages: ApiResponse<{ messages: { message: Message }[] }>;
  postFirstMessage: FirstMessage;
  fisrtMessage: ApiResponse<{ conversationId: string }>;
};
