/**
 * Service Worker for Portfolio Website
 *
 * Features:
 * - Stale-while-revalidate caching for optimal performance
 * - Cache static assets for offline availability
 * - Background sync for contact form submissions
 * - PWA installation support
 * - Push notification support (future use)
 */

const CACHE_VERSION = "v2";
const STATIC_CACHE_NAME = `nico-portfolio-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `nico-portfolio-dynamic-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `nico-portfolio-runtime-${CACHE_VERSION}`;

// Cache duration for stale-while-revalidate (24 hours)
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/site.webmanifest",
  "/nklogo.webp",
  "/favicon.ico",
  // Add other critical assets when they exist
];

// Install event - cache static assets
globalThis.addEventListener("install", (event) => {
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
        return globalThis.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Error caching static assets", error);
      })
  );
});

// Activate event - clean up old caches
globalThis.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== RUNTIME_CACHE_NAME
            ) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activated");
        return globalThis.clients.claim();
      })
  );
});

// Fetch event - handle network requests with stale-while-revalidate
globalThis.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests and non-GET requests
  if (url.origin !== location.origin || request.method !== "GET") {
    return;
  }

  // Handle different request types with stale-while-revalidate
  if (request.destination === "document") {
    // HTML pages - Stale while revalidate with network fallback
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE_NAME));
  } else if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    // Static assets - Stale while revalidate
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE_NAME));
  } else {
    // Other requests - Cache first approach
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME));
  }
});

/**
 * Stale-while-revalidate strategy
 * Serves from cache immediately, then updates cache in background
 */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Always try to fetch fresh content in background
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        // Clone and cache the response
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((error) => {
      console.log("Service Worker: Fetch failed", error);
      return null;
    });

  // If we have cached content, return it immediately
  if (cachedResponse) {
    // Check if cache is still fresh
    const cacheDate = new Date(cachedResponse.headers.get("date") || 0);
    const now = new Date();
    const isStale = now.getTime() - cacheDate.getTime() > CACHE_MAX_AGE;

    if (!isStale) {
      // Cache is fresh, just update in background
      fetchPromise.catch(() => {}); // Ignore background fetch errors
      return cachedResponse;
    }

    // Cache is stale, but return it while we fetch fresh content
    const freshResponse = await fetchPromise;
    return freshResponse || cachedResponse;
  }

  // No cached content, wait for network
  const freshResponse = await fetchPromise;
  if (freshResponse) {
    return freshResponse;
  }

  // Network failed and no cache, return offline response for documents
  if (request.destination === "document") {
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Offline - Nico Küchler Portfolio</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 2rem; background: #f5f5f5; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2563eb; }
            .retry-btn { background: #2563eb; color: white; border: none; padding: 1rem 2rem; border-radius: 4px; cursor: pointer; font-size: 1rem; }
            .retry-btn:hover { background: #1d4ed8; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Offline</h1>
            <p>Diese Seite ist momentan nicht verfügbar. Bitte überprüfen Sie Ihre Internetverbindung.</p>
            <button class="retry-btn" onclick="window.location.reload()">Erneut versuchen</button>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "no-cache",
        },
      }
    );
  }

  throw new Error("Network failed and no cache available");
}

/**
 * Cache first strategy
 * Good for API calls and other dynamic content
 */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("Service Worker: Cache first failed", error);
    throw error;
  }
}

// Background sync for contact form submissions
globalThis.addEventListener("sync", (event) => {
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
globalThis.addEventListener("push", (event) => {
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
    globalThis.registration.showNotification("Nico Küchler Portfolio", options)
  );
});

// Handle notification clicks
globalThis.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/"));
  }
});

console.log("Service Worker: Script loaded");
