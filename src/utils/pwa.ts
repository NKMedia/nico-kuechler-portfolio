/**
 * PWA (Progressive Web App) utility functions
 * Handles app installation prompts and PWA features
 */

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PWAInstallState {
  isInstallable: boolean;
  isInstalled: boolean;
  isSupported: boolean;
  platform: string | null;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const installState: PWAInstallState = {
  isInstallable: false,
  isInstalled: false,
  isSupported: false,
  platform: null,
};

/**
 * Initialize PWA install functionality
 * Should be called on app startup
 */
export function initializePWA(): void {
  // Check if PWA is supported
  const hasServiceWorkerSupport = "serviceWorker" in navigator;
  const hasBeforeInstallPrompt = "BeforeInstallPromptEvent" in globalThis;
  const isSafari =
    /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
  const isIOSDevice = /iphone|ipad|ipod/i.test(navigator.userAgent);

  // PWA is supported if we have service workers and either:
  // - BeforeInstallPromptEvent support (Chrome, Edge)
  // - Safari/iOS (which supports PWAs but not BeforeInstallPromptEvent)
  if (
    hasServiceWorkerSupport &&
    (hasBeforeInstallPrompt || isSafari || isIOSDevice)
  ) {
    installState.isSupported = true;
  }

  // Check if app is already installed using multiple methods
  const isStandalone = globalThis.matchMedia(
    "(display-mode: standalone)"
  ).matches;
  const isWebAppCapable =
    (navigator as { standalone?: boolean }).standalone === true; // iOS Safari standalone
  const isMinimalUI = globalThis.matchMedia(
    "(display-mode: minimal-ui)"
  ).matches;

  if (isStandalone || isWebAppCapable || isMinimalUI) {
    installState.isInstalled = true;
  }

  // For Safari, show install option even without BeforeInstallPromptEvent
  if (isSafari && !installState.isInstalled) {
    installState.isInstallable = true;
    installState.platform = getPlatform();

    // Trigger custom event for Safari users
    setTimeout(() => {
      globalThis.dispatchEvent(
        new CustomEvent("pwa-installable", {
          detail: installState,
        })
      );
    }, 1000); // Small delay to ensure components are ready
  }

  // Listen for the beforeinstallprompt event
  globalThis.addEventListener("beforeinstallprompt", (e: Event) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();

    deferredPrompt = e as BeforeInstallPromptEvent;
    installState.isInstallable = true;
    installState.platform = getPlatform();

    // Trigger custom event for components to listen to
    globalThis.dispatchEvent(
      new CustomEvent("pwa-installable", {
        detail: installState,
      })
    );
  });

  // Listen for app installation
  globalThis.addEventListener("appinstalled", () => {
    installState.isInstalled = true;
    installState.isInstallable = false;
    deferredPrompt = null;

    // Trigger custom event
    globalThis.dispatchEvent(
      new CustomEvent("pwa-installed", {
        detail: installState,
      })
    );
  });
}

/**
 * Show the PWA install prompt
 * Returns the user's choice
 */
export async function showInstallPrompt(): Promise<{
  outcome: "accepted" | "dismissed" | "not-available";
  platform: string | null;
}> {
  const isSafari =
    /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);

  // For Safari, always show manual instructions since there's no native prompt
  if (isSafari) {
    return {
      outcome: "not-available",
      platform: getPlatform(),
    };
  }

  if (!deferredPrompt) {
    return { outcome: "not-available", platform: null };
  }

  try {
    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Clean up
    deferredPrompt = null;
    installState.isInstallable = false;

    return {
      outcome: choiceResult.outcome,
      platform: choiceResult.platform,
    };
  } catch (error) {
    console.error("PWA: Error showing install prompt:", error);
    return { outcome: "not-available", platform: null };
  }
}

/**
 * Get current PWA install state
 */
export function getInstallState(): PWAInstallState {
  return { ...installState };
}

/**
 * Check if PWA installation is available
 */
/**
 * Check if the app is installable based on Apple's latest guidelines
 */
export function isInstallable(): boolean {
  const isSafari =
    /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
  const isIOSDevice = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
  const isStandalone = globalThis.matchMedia(
    "(display-mode: standalone)"
  ).matches;
  const isWebAppCapable =
    (navigator as { standalone?: boolean }).standalone === true;

  // Don't show install if already installed
  if (isStandalone || isWebAppCapable) {
    return false;
  }

  // For Safari/iOS: always show if we have a manifest and it's not installed
  if ((isSafari || isIOSDevice) && hasManifest) {
    return true;
  }

  // For other browsers: check for BeforeInstallPromptEvent
  return deferredPrompt !== null;
}

/**
 * Check if the app meets Apple's PWA criteria
 */
export function isApplePWAReady(): boolean {
  const hasManifest = document.querySelector('link[rel="manifest"]') !== null;
  const hasAppleTouchIcon =
    document.querySelector('link[rel="apple-touch-icon"]') !== null;
  const hasAppleWebAppCapable =
    document.querySelector('meta[name="apple-mobile-web-app-capable"]') !==
    null;
  const hasServiceWorker = "serviceWorker" in navigator;
  const isHTTPS =
    location.protocol === "https:" || location.hostname === "localhost";

  return (
    hasManifest &&
    hasAppleTouchIcon &&
    hasAppleWebAppCapable &&
    hasServiceWorker &&
    isHTTPS
  );
}

/**
 * Check if app is running as PWA
 */
export function isRunningAsPWA(): boolean {
  return installState.isInstalled;
}

type PlatformType =
  | "android"
  | "ios"
  | "windows"
  | "macos"
  | "linux"
  | "iPhone"
  | "iPad"
  | "Safari"
  | "Chrome"
  | "unknown";

/**
 * Get platform information
 */
function getPlatform(): PlatformType {
  const ua = navigator.userAgent.toLowerCase();

  if (/iphone/.test(ua)) return "iPhone";
  if (/ipad/.test(ua)) return "iPad";

  const isChrome = /chrome/.test(ua);
  const isSafari = /safari/.test(ua) && !isChrome;

  if (/android/.test(ua)) return "android";
  if (/mac/.test(ua) && isSafari) return "Safari";
  if (isChrome) return "Chrome";
  if (/mac/.test(ua)) return "macos";
  if (/windows/.test(ua)) return "windows";
  if (/linux/.test(ua)) return "linux";

  return "unknown";
}

/**
 * Get platform-specific install instructions
 */
export function getInstallInstructions(): {
  title: string;
  steps: string[];
} {
  const platform = getPlatform();

  switch (platform) {
    case "iPhone":
      return {
        title: "iPhone Installation",
        steps: [
          "1. Öffne diese Website in Safari",
          "2. Tippe auf das Teilen-Symbol (□↑) unten in der Browser-Leiste",
          "3. Scrolle nach unten und tippe auf 'Zum Home-Bildschirm'",
          "4. Passe den Namen falls gewünscht an und tippe auf 'Hinzufügen'",
        ],
      };
    case "iPad":
      return {
        title: "iPad Installation",
        steps: [
          "1. Öffne diese Website in Safari",
          "2. Tippe auf das Teilen-Symbol (□↑) in der oberen Browser-Leiste",
          "3. Tippe auf 'Zum Home-Bildschirm hinzufügen'",
          "4. Passe den Namen falls gewünscht an und tippe auf 'Hinzufügen'",
        ],
      };
    case "Safari":
      return {
        title: "Mac Safari Installation",
        steps: [
          "1. Öffne diese Website in Safari",
          "2. Gehe zu 'Ablage' > 'Als Web-Clip zum Dock hinzufügen'",
          "3. Oder verwende die Tastenkombination Cmd+Shift+A",
          "4. Passe den Namen falls gewünscht an und klicke auf 'Hinzufügen'",
        ],
      };
    case "android":
      return {
        title: "Android Installation",
        steps: [
          "1. Öffne diese Website in Chrome",
          "2. Tippe auf die drei Punkte (⋮) oben rechts",
          "3. Tippe auf 'App installieren' oder 'Zum Startbildschirm hinzufügen'",
          "4. Bestätige die Installation",
        ],
      };
    case "Chrome":
      return {
        title: "Chrome Installation",
        steps: [
          "1. Schaue nach dem App-Symbol in der Adressleiste",
          "2. Klicke auf das Symbol und dann auf 'Installieren'",
          "3. Oder gehe zu den drei Punkten (⋮) > 'App installieren'",
          "4. Bestätige die Installation",
        ],
      };
    default:
      return {
        title: "PWA Installation",
        steps: [
          "1. Schaue nach einem 'Installieren'-Button in deinem Browser",
          "2. Oder gehe zu den Browser-Einstellungen",
          "3. Suche nach 'App installieren' oder 'Zum Startbildschirm hinzufügen'",
          "4. Folge den Anweisungen deines Browsers",
        ],
      };
  }
}

/**
 * Analytics helper for PWA events
 */
export function trackPWAEvent(
  event: string,
  data?: Record<string, string | number | boolean>
): void {
  // Example: Send to Google Analytics, Plausible, etc.
  const gtagFunction = (
    globalThis as unknown as {
      gtag?: (
        type: string,
        event: string,
        params: Record<string, unknown>
      ) => void;
    }
  ).gtag;
  if (globalThis.window !== undefined && gtagFunction) {
    gtagFunction("event", event, {
      event_category: "PWA",
      ...data,
    });
  }
}
