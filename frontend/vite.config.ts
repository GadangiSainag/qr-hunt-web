import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "0.0.0.0", //hosts vite on to local network, if using script `npm run dev` or else can use `npm run host`
    port: 5173,
    open: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
