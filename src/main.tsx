import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@acme-internal/ui-kit";
import { StoreProvider } from "@acme-internal/state";
import App from "./App.tsx";
import "@acme-internal/ui-kit/styles.css";
import "./styles/overrides.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme="midnight">
    <StoreProvider>
      <App />
    </StoreProvider>
  </ThemeProvider>
);
