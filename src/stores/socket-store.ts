import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { conversationMessagesQuery, messagesQuery } from "../api/queries";
import { queryClient } from "../lib/react-query";
import { type SocketType } from "../lib/socket";
import { storage } from "../lib/storage";

interface SocketStore {
  socket: SocketType | null;
  activeFriends: string[];
  friendsTyping: string[];
  connect: () => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  activeFriends: [],
  friendsTyping: [],
  connect: () => {
    const deviceFingerprint = storage.getDeviceFingerprint();
    if (!deviceFingerprint) return;
    const socket: SocketType = io(import.meta.env.VITE_API_BASE_URL, {
      auth: {
        deviceFingerprint,
      },
    });
    socket.connect();

    socket.on("connect", () => {
      set({ socket: socket });
    });

    socket.on("connect_error", (error) => {
      console.error(error);
      set({ socket: null, activeFriends: [], friendsTyping: [] });
      toast.error("Connection failed", { id: "socket-error" });
    });

    socket.on("friends:online", (friends) => {
      set({ activeFriends: friends });
    });

    socket.on("friend:disconnect", (friendId) => {
      set({ activeFriends: get().activeFriends.filter((f) => f !== friendId) });
    });

    socket.on("friend:connect", (friendId) => {
      set({ activeFriends: [...get().activeFriends, friendId] });
    });

    socket.on("friend:typing", (friendId) => {
      set({ friendsTyping: [...get().friendsTyping, friendId] });
    });

    socket.on("friend:stopTyping", (friendId) => {
      set({
        friendsTyping: get().friendsTyping.filter((f) => f !== friendId),
      });
    });

    socket.on("friend:message", (message) => {
      toast("You have a new message!", { id: "new-message" });
      queryClient.invalidateQueries(messagesQuery());
      queryClient.invalidateQueries(
        conversationMessagesQuery(message.conversationId),
      );
    });
  },
  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, activeFriends: [], friendsTyping: [] });
  },
}));
