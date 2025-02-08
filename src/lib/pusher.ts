import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { storage } from "./storage";

export const beamsClient = new PusherPushNotifications.Client({
  instanceId: import.meta.env.VITE_PUSHER_ID,
});

export const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: import.meta.env.VITE_API_BASE_URL + "/users/pusher-token",
  headers: {
    "x-device-fingerprint": storage.getDeviceFingerprint() || "",
  },
});
