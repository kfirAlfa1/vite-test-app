import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import acmeTheme from "@acme-internal/vite-plugin-theme";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8080,
    // The preview proxy forwards a per-sandbox hostname that rotates, so allow all
    // hosts (dev server only). The platform's __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS
    // value is an exact-match list and cannot express the wildcard.
    allowedHosts: true,
  },
  plugins: [react(), acmeTheme({ tokens: "./src/styles/tokens.json", mode: "strict" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
