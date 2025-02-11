import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { vitePostHog } from "vite-plugin-posthog";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePostHog({
      apiKey: process.env.VITE_POSTHOG_KEY!,
      hostUrl: process.env.VITE_POSTHOG_HOST!,
    }),
  ],
});
