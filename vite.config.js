import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
    proxy: {
      "/send": "http://localhost:3001",
      "/send-batch": "http://localhost:3001",
      "/generate": "http://localhost:3001",
      "/upload": "http://localhost:3001",
      "/uploads": "http://localhost:3001",
      "/wa": "http://localhost:3001",
    },
  },
});
