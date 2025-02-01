import { QueryClient } from "@tanstack/react-query";
import { handleQueryError } from "./utils";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      onError: (error) => {
        handleQueryError(error);
      },
    },
  },
});
