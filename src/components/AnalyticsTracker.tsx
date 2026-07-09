import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Type for global window with gtag function (defined in /ga-init.js)
type WindowWithGtag = typeof globalThis & {
  gtag?: (
    command: string,
    eventName: string,
    params: Record<string, unknown>,
  ) => void;
};

const BASE_TITLE = "Nico Küchler - Senior Software Developer & Media Designer";

// Per-route page titles for SEO and meaningful GA4 page reports
const PAGE_TITLES: Record<string, string> = {
  "/": `Über mich | ${BASE_TITLE}`,
  "/lebenslauf": `Lebenslauf | ${BASE_TITLE}`,
  "/projekte": `Projekte | ${BASE_TITLE}`,
  "/kontakt": `Kontakt | ${BASE_TITLE}`,
  "/impressum": `Impressum | ${BASE_TITLE}`,
  "/datenschutz": `Datenschutz | ${BASE_TITLE}`,
  "/barrierefreiheit": `Barrierefreiheit | ${BASE_TITLE}`,
};

/**
 * Tracks SPA route changes for Google Analytics 4.
 *
 * Sets a per-route document title and sends a `page_view` event on every
 * navigation. Events are pushed to the gtag queue and are only transmitted
 * once the user has given analytics consent (GA4 script is loaded after
 * consent via CookieConsent), so this is GDPR-safe.
 *
 * Must be rendered inside the Router.
 *
 * @returns null - renders nothing
 */
function AnalyticsTracker(): null {
  const location = useLocation();

  useEffect(() => {
    // Update document title per route (fallback: 404 / unknown routes)
    const title = PAGE_TITLES[location.pathname] ?? `404 | ${BASE_TITLE}`;
    document.title = title;

    // Send page_view to GA4 (initial page_view is disabled in ga-init.js)
    const gtag = (globalThis as WindowWithGtag).gtag;
    if (typeof gtag === "function") {
      gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: globalThis.location.href,
        page_title: title,
      });
    }
  }, [location]);

  return null;
}

export default AnalyticsTracker;
