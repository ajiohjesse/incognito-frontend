/* eslint-disable react-refresh/only-export-components */
import {
  type Client,
  type TokenProvider,
} from "@pusher/push-notifications-web";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { storage } from "./storage";

type PusherBeamsContextType = {
  registerUser: null | ((userId: string) => Promise<void>);
  stopBeams: null | (() => Promise<void>);
};

const PusherBeamsContext = createContext<PusherBeamsContextType>({
  registerUser: null,
  stopBeams: null,
});

export const usePusherBeams = () => useContext(PusherBeamsContext);

type PusherBeamsProviderProps = {
  children: ReactNode;
};

export function PusherBeamsProvider({ children }: PusherBeamsProviderProps) {
  const [beamsClient, setBeamsClient] = useState<Client | null>(null);
  const [beamsTokenProvider, setBeamsClientTokenProvider] =
    useState<TokenProvider | null>(null);

  useEffect(() => {
    const fingerprint = storage.getDeviceFingerprint();

    if (!fingerprint) {
      console.log("PushError: Device fingerprint not found");
      return;
    }

    if (!isBeamSupported()) {
      console.log("PushError: Pusher Beams is not supported in this browser");
      return;
    }

    const initializeBeams = async () => {
      try {
        const PusherPushNotifications = await import(
          "@pusher/push-notifications-web"
        );

        const client = new PusherPushNotifications.Client({
          instanceId: import.meta.env.VITE_PUSHER_ID,
        });

        const tokenProvider = new PusherPushNotifications.TokenProvider({
          url: import.meta.env.VITE_API_BASE_URL + "/users/pusher-token",
          headers: {
            "x-device-fingerprint": fingerprint,
          },
        });

        setBeamsClient(client);
        setBeamsClientTokenProvider(tokenProvider);
      } catch (err) {
        console.log("PushError: ", err);
      }
    };

    initializeBeams();
  }, []);

  const registerUser = async (userId: string) => {
    if (!beamsClient || !beamsTokenProvider) return;

    try {
      const currentId = await beamsClient.getUserId();

      if (currentId && currentId !== userId) {
        await beamsClient.stop();
      }

      if (currentId) return;

      await beamsClient.start();
      await beamsClient.setUserId(userId, beamsTokenProvider);
    } catch (err) {
      console.error("Failed to register user for push notifications:", err);
    }
  };

  const stopBeams = async () => {
    if (!beamsClient) return;
    await beamsClient.stop();
  };

  return (
    <PusherBeamsContext.Provider value={{ registerUser, stopBeams }}>
      {children}
    </PusherBeamsContext.Provider>
  );
}

function isBeamSupported(): boolean {
  return (
    "indexedDB" in window &&
    window.isSecureContext &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    !/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  );
}
