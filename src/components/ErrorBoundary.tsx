import React from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "../types";

/**
 * ErrorBoundary component for catching and handling React errors
 *
 * Features:
 * - Catches JavaScript errors anywhere in the child component tree
 * - Logs error information for debugging
 * - Displays a fallback UI instead of crashing the entire app
 * - User-friendly error message with recovery options
 *
 * @class ErrorBoundary
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * Static method to update state when an error occurs
   * @param error - The error that was thrown
   * @returns New state object
   */
  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  /**
   * Catch errors in any components below and re-render with error message
   * @param error - The error that was thrown
   * @param errorInfo - Object with componentStack key containing stack trace
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  /**
   * Reset error state to retry rendering
   */
  handleRetry = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  /**
   * Reload the entire page as a last resort
   */
  handleReload = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="content">
          <div
            className="profile-main"
            style={{ textAlign: "center", padding: "4rem 2rem" }}
          >
            <div
              style={{
                fontSize: "4rem",
                color: "#dc2626",
                marginBottom: "1rem",
              }}
            >
              <i className="fas fa-exclamation-triangle"></i>
            </div>

            <h1>Oops! Etwas ist schief gelaufen</h1>
            <h3 style={{ marginBottom: "2rem", color: "#666" }}>
              Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es
              erneut.
            </h3>

            <div
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "12px",
                padding: "1.5rem",
                margin: "2rem auto",
                maxWidth: "600px",
                textAlign: "left",
              }}
            >
              <h4 style={{ color: "#dc2626", marginBottom: "1rem" }}>
                <i className="fas fa-bug"></i> Fehlerdetails:
              </h4>

              {this.state.error && (
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontFamily: "monospace",
                    background: "#f5f5f5",
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    overflow: "auto",
                  }}
                >
                  <strong>Fehlermeldung:</strong> {this.state.error.toString()}
                </div>
              )}

              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                Wenn dieser Fehler weiterhin auftritt, kontaktieren Sie mich
                bitte über die Kontaktseite und geben Sie die obigen
                Fehlerdetails an.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <button
                className="btn-blue"
                onClick={this.handleRetry}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <i className="fas fa-redo"></i> Erneut versuchen
              </button>

              <button
                className="btn-outline"
                onClick={this.handleReload}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <i className="fas fa-refresh"></i> Seite neu laden
              </button>

              <button
                className="btn-outline"
                onClick={() => (window.location.href = "/")}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <i className="fas fa-home"></i> Zur Startseite
              </button>
            </div>

            {/* Development mode: Show detailed error info */}
            {process.env.NODE_ENV === "development" && this.state.errorInfo && (
              <details
                style={{
                  marginTop: "2rem",
                  textAlign: "left",
                  background: "#f8f9fa",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                  Stack Trace (Development Only)
                </summary>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    marginTop: "1rem",
                    fontSize: "0.7rem",
                    overflow: "auto",
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
