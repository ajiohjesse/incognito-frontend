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
