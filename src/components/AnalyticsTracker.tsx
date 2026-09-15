import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "../seo/routes";

// Type for global window with gtag function (defined in /ga-init.js)
type WindowWithGtag = typeof globalThis & {
  gtag?: (
    command: string,
    eventName: string,
    params: Record<string, unknown>,
  ) => void;
};

/**
 * Tracks SPA route changes for Google Analytics 4.
 *
 * Sends a `page_view` event on every navigation, titled with the route's SEO
 * title from src/seo/routes.ts (the document title itself is set by
 * RouteMeta). Events are pushed to the gtag queue and are only transmitted
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
    const title = getRouteMeta(location.pathname).title;

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
