/**
 * Service Worker for Portfolio Website
 *
 * Features:
 * - Cache static assets for offline availability
 * - Cache API responses with network-first strategy
 * - Background sync for contact form submissions
 * - Push notification support (future use)
 */

const CACHE_NAME = "nico-kuechler-portfolio-v1";
const STATIC_CACHE_NAME = "static-v1";
const DYNAMIC_CACHE_NAME = "dynamic-v1";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/src/main.jsx",
  "/src/App.jsx",
  "/src/App.css",
  "/src/index.css",
  "/nklogo.webp",
  "/favicon.ico",
  // Add other critical assets
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("Service Worker: Static assets cached");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Error caching static assets", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            ) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different request types
  if (request.destination === "document") {
    // HTML pages - Network first, fallback to cache
    event.respondWith(networkFirstThenCache(request));
  } else if (request.destination === "image") {
    // Images - Cache first, fallback to network
    event.respondWith(cacheFirstThenNetwork(request));
  } else {
    // Other assets - Cache first, fallback to network
    event.respondWith(cacheFirstThenNetwork(request));
  }
});

/**
 * Network first, then cache strategy
 * Good for dynamic content like HTML pages
 */
async function networkFirstThenCache(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Service Worker: Network failed, trying cache", error);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline page or default response
    if (request.destination === "document") {
      const offlineResponse = await caches.match("/");
      return (
        offlineResponse ||
        new Response(
          "<h1>Offline</h1><p>Diese Seite ist offline nicht verfügbar.</p>",
          { headers: { "Content-Type": "text/html" } }
        )
      );
    }

    throw error;
  }
}

/**
 * Cache first, then network strategy
 * Good for static assets like images, CSS, JS
 */
async function cacheFirstThenNetwork(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error("Service Worker: Failed to fetch", request.url, error);
    throw error;
  }
}

// Background sync for contact form submissions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered", event.tag);

  if (event.tag === "contact-form-sync") {
    event.waitUntil(syncContactForm());
  }
});

/**
 * Sync contact form submissions when online
 */
async function syncContactForm() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingSubmissions = await getPendingSubmissions();

    for (const submission of pendingSubmissions) {
      try {
        // Attempt to submit the form
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submission.data),
        });

        if (response.ok) {
          // Remove from pending submissions
          await removePendingSubmission(submission.id);
          console.log("Service Worker: Contact form synced successfully");
        }
      } catch (error) {
        console.error("Service Worker: Failed to sync contact form", error);
      }
    }
  } catch (error) {
    console.error("Service Worker: Background sync failed", error);
  }
}

// Placeholder functions for IndexedDB operations
async function getPendingSubmissions() {
  // Implementation would use IndexedDB to get pending submissions
  return [];
}

async function removePendingSubmission(id) {
  // Implementation would remove the submission from IndexedDB
  console.log("Removing pending submission:", id);
}

// Push notification handling (for future use)
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push notification received", event);

  const options = {
    body: event.data ? event.data.text() : "Neue Nachricht vom Portfolio",
    icon: "/nklogo.webp",
    badge: "/nklogo.webp",
    tag: "portfolio-notification",
    requireInteraction: true,
    actions: [
      {
        action: "view",
        title: "Ansehen",
        icon: "/nklogo.webp",
      },
      {
        action: "dismiss",
        title: "Schließen",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Nico Küchler Portfolio", options)
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/"));
  }
});

console.log("Service Worker: Script loaded");
