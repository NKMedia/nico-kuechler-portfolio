/**
 * PWA Install Button Component
 * Displays an install button when the PWA can be installed
 */

import { useState, useEffect } from "react";
import {
  isInstallable,
  showInstallPrompt,
  getInstallInstructions,
  initializePWA,
  trackPWAEvent,
  type PWAInstallState,
} from "../utils/pwa";

interface PWAInstallButtonProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

/**
 * PWA Install Button Component
 * Shows install prompt when PWA installation is available
 */
export function PWAInstallButton({
  className = "",
  children,
}: PWAInstallButtonProps) {
  const [installAvailable, setInstallAvailable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // Initialize PWA functionality
    initializePWA();

    // Check initial state
    setInstallAvailable(isInstallable());

    // Listen for PWA install events
    const handleInstallable = (event: CustomEvent<PWAInstallState>) => {
      setInstallAvailable(
        event.detail.isInstallable && !event.detail.isInstalled
      );
    };

    const handleInstalled = () => {
      setInstallAvailable(false);
      setShowInstructions(false);
    };

    globalThis.addEventListener(
      "pwa-installable",
      handleInstallable as EventListener
    );
    globalThis.addEventListener("pwa-installed", handleInstalled);

    return () => {
      globalThis.removeEventListener(
        "pwa-installable",
        handleInstallable as EventListener
      );
      globalThis.removeEventListener("pwa-installed", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installAvailable) return;

    setIsInstalling(true);
    trackPWAEvent("install_prompt_shown");

    try {
      const result = await showInstallPrompt();

      if (result.outcome === "accepted") {
        trackPWAEvent("install_accepted", {
          platform: result.platform ?? "unknown",
        });
        setInstallAvailable(false);
      } else if (result.outcome === "dismissed") {
        trackPWAEvent("install_dismissed", {
          platform: result.platform ?? "unknown",
        });
      } else {
        // Show manual instructions if native prompt is not available
        setShowInstructions(true);
        trackPWAEvent("install_manual_instructions_shown");
      }
    } catch (error) {
      console.error("PWA: Install failed:", error);
      setShowInstructions(true);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    trackPWAEvent("install_instructions_closed");
  };

  if (!installAvailable) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleInstall}
        disabled={isInstalling}
        className={`pwa-install-button ${className}`}
        aria-label="App installieren"
        title="Portfolio als App installieren"
        type="button"
      >
        {isInstalling ? (
          <>
            <span className="sr-only">Installiere...</span>
            <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
          </>
        ) : (
          children || (
            <>
              <i className="fas fa-download" aria-hidden="true"></i>
              <span>App installieren</span>
            </>
          )
        )}
      </button>

      {showInstructions && (
        <InstallInstructions onClose={handleCloseInstructions} />
      )}
    </>
  );
}

/**
 * Manual Install Instructions Modal
 */
interface InstallInstructionsProps {
  readonly onClose: () => void;
}

function InstallInstructions({ onClose }: InstallInstructionsProps) {
  const { title, steps } = getInstallInstructions();

  useEffect(() => {
    // Close on Escape key - using document instead of dialog element
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <dialog
      open
      className="pwa-install-overlay"
      aria-labelledby="install-instructions-title"
      aria-describedby="install-instructions-content"
    >
      <div className="pwa-install-modal">
        <div className="pwa-install-header">
          <h3 id="install-instructions-title">App installieren</h3>
          <button
            onClick={onClose}
            className="pwa-install-close"
            aria-label="Schließen"
            type="button"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div id="install-instructions-content" className="pwa-install-content">
          <p>Um diese App zu installieren, folgen Sie diesen Schritten:</p>

          <h4>{title}</h4>

          <ol className="pwa-install-steps">
            {steps.map((step) => (
              <li key={step.slice(0, 20)}>{step}</li>
            ))}
          </ol>

          <div className="pwa-install-benefits">
            <h4>Vorteile der App-Installation:</h4>
            <ul>
              <li>Schnellerer Zugriff vom Startbildschirm</li>
              <li>Offline-Verfügbarkeit</li>
              <li>App-ähnliche Benutzerführung</li>
              <li>Bessere Performance</li>
            </ul>
          </div>
        </div>

        <div className="pwa-install-footer">
          <button onClick={onClose} className="pwa-install-ok" type="button">
            Verstanden
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default PWAInstallButton;
