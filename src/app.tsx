import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";
import { queryClient } from "./lib/react-query";
import Conversation from "./pages/conversation";
import Dashboard from "./pages/dashboard";
import HomePage from "./pages/homepage";
import Layout from "./pages/layout";
import Message from "./pages/message";
import NotFoundPage from "./pages/not-found";
import { useSocketStore } from "./stores/socket-store";

function App() {
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="u/messages" element={<Dashboard />} />

            <Route path=":userId" element={<Message />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="u/messages/:conversationId" element={<Conversation />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
