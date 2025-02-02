import { queryOptions } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { ApiTypes } from "./types";

export const userQuery = () => {
  return queryOptions({
    queryKey: ["user"],
    queryFn: async () => {
      return (await api.get<ApiTypes["currentUser"]>("/users")).data.data;
    },
    staleTime: Infinity,
  });
};

export const messagesQuery = () => {
  return queryOptions({
    queryKey: ["messages"],
    queryFn: async () => {
      return (await api.get<ApiTypes["messages"]>("/conversations/messages"))
        .data.data;
    },
  });
};

export const conversationsQuery = () => {
  return queryOptions({
    queryKey: ["conversations"],
    queryFn: async () => {
      return (await api.get<ApiTypes["conversations"]>("/conversations")).data
        .data;
    },
  });
};

export const handshakeQuery = (userId: string) => {
  return queryOptions({
    enabled: !!userId,
    queryKey: ["handshake", userId],
    queryFn: async () => {
      return (await api.get<ApiTypes["user"]>(`/users/handshake/${userId}`))
        .data.data;
    },
  });
};

export const conversationWithFriendQuery = (friendId: string) => {
  return queryOptions({
    queryKey: ["conversation-with-friend", friendId],
    queryFn: async () => {
      return (
        await api.get<ApiTypes["conversationNullable"]>(
          `/conversations/friends/${friendId}`,
        )
      ).data.data;
    },
  });
};
