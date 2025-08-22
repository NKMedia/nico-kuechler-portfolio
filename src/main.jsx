import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerServiceWorker, showInstallPrompt } from "@utils/serviceWorker";
import performanceMonitor from "@utils/performance";

// Initialize performance monitoring
if (import.meta.env.DEV) {
  console.log("🚀 Development mode - Performance monitoring enabled");
}

// Register service worker for PWA features
registerServiceWorker();

// Show install prompt for PWA
showInstallPrompt();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
