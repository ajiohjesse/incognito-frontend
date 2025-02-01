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
