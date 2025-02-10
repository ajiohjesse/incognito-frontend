import { create } from "zustand";

interface ShareMessageStore {
  message: string | null;
  setMessage: (message: string) => void;
  clearMessage: () => void;
}

export const useShareMessageStore = create<ShareMessageStore>((set) => ({
  message: null,
  setMessage: (message) => set({ message }),
  clearMessage: () => set({ message: null }),
}));
