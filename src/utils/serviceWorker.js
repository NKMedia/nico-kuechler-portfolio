/**
 * Service Worker Registration Utility
 * Handles registration, updates, and lifecycle events
 */

import { FEATURES } from "../constants";

/**
 * Register service worker for PWA functionality
 */
export function registerServiceWorker() {
  if (!FEATURES.pwa) {
    console.log("PWA features disabled");
    return;
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        console.log("Service Worker registered successfully:", registration);

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker is available
                showUpdateNotification();
              }
            });
          }
        });

        // Handle controller change (new SW activated)
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          console.log("Service Worker: New version activated");
          window.location.reload();
        });

        // Enable background sync for contact forms
        if ("sync" in window.ServiceWorkerRegistration.prototype) {
          console.log("Background Sync supported");
        }

        // Request notification permission (optional)
        await requestNotificationPermission();
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    });
  } else {
    console.log("Service Worker not supported");
  }
}

/**
 * Show notification when service worker update is available
 */
function showUpdateNotification() {
  const updateAvailable = document.createElement("div");
  updateAvailable.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 10000;
      max-width: 300px;
    ">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">
        <i class="fas fa-download"></i> Update verfügbar
      </h4>
      <p style="margin: 0 0 1rem 0; font-size: 0.9rem;">
        Eine neue Version der Website ist verfügbar.
      </p>
      <button onclick="location.reload()" style="
        background: white;
        color: #2563eb;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        margin-right: 0.5rem;
      ">
        Aktualisieren
      </button>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
      ">
        Später
      </button>
    </div>
  `;

  document.body.appendChild(updateAvailable);

  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (updateAvailable.parentElement) {
      updateAvailable.remove();
    }
  }, 10000);
}

/**
 * Request notification permission
 */
async function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    try {
      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission);
    } catch (error) {
      console.log("Notification permission request failed:", error);
    }
  }
}

/**
 * Check if app is running as PWA
 */
export function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone ||
    document.referrer.includes("android-app://")
  );
}

/**
 * Show install prompt for PWA
 */
export function showInstallPrompt() {
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Show custom install button
    showInstallButton(deferredPrompt);
  });

  window.addEventListener("appinstalled", () => {
    console.log("PWA was installed");
    hideInstallButton();
  });
}

/**
 * Show install button
 */
function showInstallButton(deferredPrompt) {
  const installButton = document.createElement("button");
  installButton.innerHTML = `
    <i class="fas fa-download"></i> App installieren
  `;
  installButton.className = "btn-outline";
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  `;

  installButton.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log("Install prompt outcome:", outcome);
      deferredPrompt = null;
      installButton.remove();
    }
  });

  document.body.appendChild(installButton);
}

/**
 * Hide install button
 */
function hideInstallButton() {
  const installButton = document.querySelector('button[style*="fixed"]');
  if (installButton) {
    installButton.remove();
  }
}

/**
 * Add to queue for background sync
 */
export function addToSyncQueue(data, syncTag = "contact-form-sync") {
  if (
    "serviceWorker" in navigator &&
    "sync" in window.ServiceWorkerRegistration.prototype
  ) {
    // Store data in IndexedDB for background sync
    // This would typically use IndexedDB to store the data
    console.log("Adding to sync queue:", data);

    // Register for background sync
    navigator.serviceWorker.ready
      .then((registration) => {
        return registration.sync.register(syncTag);
      })
      .catch((error) => {
        console.error("Background sync registration failed:", error);
      });
  }
}

export default {
  registerServiceWorker,
  isPWA,
  showInstallPrompt,
  addToSyncQueue,
};
