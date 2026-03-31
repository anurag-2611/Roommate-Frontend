import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://roommate-backend-bh0y1q6g1-anurag-choudharys-projects-c0129f03.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
