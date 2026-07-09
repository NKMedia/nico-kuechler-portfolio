import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "analytics_consent";
const CONSENT_VERSION = "1.0";

interface ConsentState {
  given: boolean;
  version: string;
  timestamp: number;
}

// Type for global window with GA4 loader
type WindowWithGA4 = typeof globalThis & { loadGA4?: () => void };

/**
 * Reads the stored consent state from localStorage.
 * Returns null if no valid consent for the current version exists.
 */
function getStoredConsent(): ConsentState | null {
  try {
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (storedConsent) {
      const consent: ConsentState = JSON.parse(storedConsent);
      if (consent.version === CONSENT_VERSION) {
        return consent;
      }
    }
  } catch {
    // localStorage might be blocked or contain invalid JSON
  }
  return null;
}

/**
 * Cookie Consent Banner for GDPR compliance with Google Analytics 4
 * Shows a consent banner for analytics tracking and handles user preferences
 *
 * @returns Cookie consent banner component or null if consent already given
 */
function CookieConsent(): React.ReactElement | null {
  // Show banner only if no valid consent decision is stored
  const [showBanner, setShowBanner] = useState(
    () => getStoredConsent() === null,
  );
  const [isClosing, setIsClosing] = useState(false);

  const loadAnalytics = useCallback(() => {
    // Call the global function defined in index.html
    const win = globalThis as WindowWithGA4;
    if (typeof win.loadGA4 === "function") {
      win.loadGA4();
    }
  }, []);

  const saveConsent = useCallback((given: boolean) => {
    const consent: ConsentState = {
      given,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      // localStorage might be blocked
      console.warn("Could not save consent preference");
    }
  }, []);

  useEffect(() => {
    // Load GA4 if consent was already given
    const consent = getStoredConsent();
    if (consent?.given) {
      loadAnalytics();
    }
  }, [loadAnalytics]);

  const handleAccept = useCallback(() => {
    setIsClosing(true);
    saveConsent(true);
    loadAnalytics();
    setTimeout(() => setShowBanner(false), 300);
  }, [saveConsent, loadAnalytics]);

  const handleDecline = useCallback(() => {
    setIsClosing(true);
    saveConsent(false);
    setTimeout(() => setShowBanner(false), 300);
  }, [saveConsent]);

  if (!showBanner) {
    return null;
  }

  return (
    <section
      className={`cookie-consent-banner ${isClosing ? "closing" : ""}`}
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="cookie-consent-content">
        <h2 id="cookie-consent-title" className="cookie-consent-heading">
          🍪 Cookie-Einstellungen
        </h2>
        <p id="cookie-consent-description" className="cookie-consent-text">
          Diese Website verwendet Google Analytics, um die Nutzung zu
          analysieren und zu verbessern. Dabei werden Cookies gesetzt und Daten
          an Google übertragen. Ihre IP-Adresse wird anonymisiert.{" "}
          <Link to="/datenschutz" className="cookie-consent-link">
            Mehr erfahren
          </Link>
        </p>
        <div className="cookie-consent-buttons">
          <button
            type="button"
            onClick={handleAccept}
            className="btn-blue cookie-consent-accept"
            aria-label="Cookies akzeptieren und Google Analytics aktivieren"
          >
            Akzeptieren
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="btn-outline cookie-consent-decline"
            aria-label="Cookies ablehnen und Google Analytics deaktivieren"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </section>
  );
}

export default CookieConsent;
