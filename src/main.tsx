import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeServiceWorker } from "./utils/serviceWorker";
import { initializePerformanceMonitoring } from "./utils/performance";

// Initialize performance monitoring
if (import.meta.env.DEV) {
  console.log("🚀 Development mode - Performance monitoring enabled");
}
initializePerformanceMonitoring();

// Initialize service worker for PWA features
initializeServiceWorker();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
