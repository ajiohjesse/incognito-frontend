import axios from "axios";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const fingerprint = storage.getDeviceFingerprint();
    if (fingerprint) {
      config.headers["x-device-fingerprint"] = fingerprint;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error?.response?.status === 401) {
//       toast.error("Your session has expired. Create a new link.", {
//         id: "auth-error",
//       });
//       storage.deletePrivateKey();
//       storage.deleteDeviceFingerprint();
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   },
// );
