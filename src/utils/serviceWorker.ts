/**
 * Service Worker utility functions for Progressive Web App functionality
 * Handles service worker registration, updates, and offline capabilities
 */

import { FEATURES } from "../constants";

export interface ServiceWorkerConfig {
  swPath: string;
  scope?: string;
  updateCheckInterval?: number;
}

export interface RegistrationResult {
  success: boolean;
  registration?: ServiceWorkerRegistration;
  error?: Error;
}

export interface ServiceWorkerStatus {
  isSupported: boolean;
  isRegistered: boolean;
  isActive: boolean;
  isWaiting: boolean;
  registration?: ServiceWorkerRegistration;
}

/**
 * Check if service workers are supported
 * @returns {boolean} - Whether service workers are supported
 */
export const isServiceWorkerSupported = (): boolean => {
  return "serviceWorker" in navigator;
};

/**
 * Register service worker
 * @param {ServiceWorkerConfig} config - Service worker configuration
 * @returns {Promise<RegistrationResult>} - Registration result
 */
export const registerServiceWorker = async (
  config: ServiceWorkerConfig = { swPath: "/sw.js" }
): Promise<RegistrationResult> => {
  if (!isServiceWorkerSupported()) {
    return {
      success: false,
      error: new Error("Service workers are not supported in this browser"),
    };
  }

  try {
    const registration = await navigator.serviceWorker.register(config.swPath, {
      scope: config.scope || "/",
    });

    console.log("Service Worker registered successfully:", registration);

    // Set up update checking if interval is provided
    if (config.updateCheckInterval) {
      setInterval(() => {
        registration.update();
      }, config.updateCheckInterval);
    }

    // Listen for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (newWorker) {
        console.log("New service worker available");
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            console.log("New service worker installed, refresh required");
            // Dispatch custom event for UI to handle
            window.dispatchEvent(
              new CustomEvent("sw-update-available", {
                detail: { registration },
              })
            );
          }
        });
      }
    });

    return {
      success: true,
      registration,
    };
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return {
      success: false,
      error: error as Error,
    };
  }
};

/**
 * Unregister service worker
 * @returns {Promise<boolean>} - Whether unregistration was successful
 */
export const unregisterServiceWorker = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      const result = await registration.unregister();
      console.log("Service Worker unregistered:", result);
      return result;
    }
    return true;
  } catch (error) {
    console.error("Service Worker unregistration failed:", error);
    return false;
  }
};

/**
 * Get service worker status
 * @returns {Promise<ServiceWorkerStatus>} - Current service worker status
 */
export const getServiceWorkerStatus =
  async (): Promise<ServiceWorkerStatus> => {
    const status: ServiceWorkerStatus = {
      isSupported: isServiceWorkerSupported(),
      isRegistered: false,
      isActive: false,
      isWaiting: false,
    };

    if (!status.isSupported) {
      return status;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        status.isRegistered = true;
        status.registration = registration;
        status.isActive = !!registration.active;
        status.isWaiting = !!registration.waiting;
      }
    } catch (error) {
      console.error("Failed to get service worker status:", error);
    }

    return status;
  };

/**
 * Force service worker update
 * @returns {Promise<boolean>} - Whether update check was successful
 */
export const updateServiceWorker = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log("Service Worker update check completed");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Service Worker update failed:", error);
    return false;
  }
};

/**
 * Skip waiting and activate new service worker
 * @returns {Promise<boolean>} - Whether skip waiting was successful
 */
export const skipWaiting = async (): Promise<boolean> => {
  if (!isServiceWorkerSupported()) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Skip waiting failed:", error);
    return false;
  }
};

/**
 * Initialize service worker with default configuration
 * @returns {Promise<RegistrationResult>} - Registration result
 */
export const initializeServiceWorker =
  async (): Promise<RegistrationResult> => {
    if (!FEATURES.pwa) {
      console.log("PWA features disabled");
      return {
        success: false,
        error: new Error("PWA features are disabled"),
      };
    }

    return registerServiceWorker({
      swPath: "/sw.js",
      scope: "/",
      updateCheckInterval: 60000, // Check for updates every minute
    });
  };

/**
 * Listen for service worker messages
 * @param {(event: MessageEvent) => void} callback - Message handler
 * @returns {() => void} - Cleanup function
 */
export const listenForServiceWorkerMessages = (
  callback: (event: MessageEvent) => void
): (() => void) => {
  if (!isServiceWorkerSupported()) {
    return () => {};
  }

  navigator.serviceWorker.addEventListener("message", callback);

  return () => {
    navigator.serviceWorker.removeEventListener("message", callback);
  };
};

// Export service worker utilities as default
export default {
  isServiceWorkerSupported,
  registerServiceWorker,
  unregisterServiceWorker,
  getServiceWorkerStatus,
  updateServiceWorker,
  skipWaiting,
  initializeServiceWorker,
  listenForServiceWorkerMessages,
};
