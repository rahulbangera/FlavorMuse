// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/ayur": {
        target: "https://ayur-analytics-6mthurpbxq-el.a.run.app",
        changeOrigin: true,
        secure: true,
        rewrite: p => p.replace(/^\/ayur/, ""),
      },
    },
  },
});
