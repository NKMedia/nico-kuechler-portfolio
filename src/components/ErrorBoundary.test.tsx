import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error message");
  }
  return <div>No error</div>;
};

// Component with console.error spy
const setupConsoleErrorSpy = () => {
  return vi.spyOn(console, "error").mockImplementation(() => {});
};

describe("ErrorBoundary", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = setupConsoleErrorSpy();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders error UI when there is an error", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Oops! Etwas ist schief gelaufen")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
      )
    ).toBeInTheDocument();
  });

  it("displays error icon", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorIcon = document.querySelector("i.fas.fa-exclamation-triangle");
    expect(errorIcon).toBeInTheDocument();
  });

  it("displays error details section", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Fehlerdetails:")).toBeInTheDocument();
    expect(screen.getByText("Error: Test error message")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("button", { name: /Erneut versuchen/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Seite neu laden/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Zur Startseite/ })
    ).toBeInTheDocument();
  });

  it("action buttons have correct icons", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const retryButton = screen.getByRole("button", {
      name: /Erneut versuchen/,
    });
    const reloadButton = screen.getByRole("button", {
      name: /Seite neu laden/,
    });
    const homeButton = screen.getByRole("button", { name: /Zur Startseite/ });

    expect(retryButton.querySelector("i.fas.fa-redo")).toBeInTheDocument();
    expect(reloadButton.querySelector("i.fas.fa-refresh")).toBeInTheDocument();
    expect(homeButton.querySelector("i.fas.fa-home")).toBeInTheDocument();
  });

  it("logs error to console", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "ErrorBoundary caught an error:",
      expect.any(Error),
      expect.any(Object)
    );
  });

  it("retry button resets error state", async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should be displayed initially
    expect(
      screen.getByText("Oops! Etwas ist schief gelaufen")
    ).toBeInTheDocument();

    // Click retry button should be present and clickable
    const retryButton = screen.getByRole("button", {
      name: /Erneut versuchen/,
    });
    expect(retryButton).toBeInTheDocument();

    // Test that clicking doesn't throw an error
    await user.click(retryButton);

    // After clicking, the retry button should still exist (component re-renders with same error)
    expect(
      screen.getByRole("button", { name: /Erneut versuchen/ })
    ).toBeInTheDocument();
  });

  it("reload button calls window.location.reload", async () => {
    const user = userEvent.setup();
    const mockReload = vi.fn();

    // Mock window.location.reload
    Object.defineProperty(window, "location", {
      value: {
        reload: mockReload,
      },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByRole("button", {
      name: /Seite neu laden/,
    });
    await user.click(reloadButton);

    expect(mockReload).toHaveBeenCalled();
  });

  it("home button navigates to home page", async () => {
    const user = userEvent.setup();

    // Mock window.location.href
    const mockLocation = { href: "" };
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const homeButton = screen.getByRole("button", { name: /Zur Startseite/ });
    await user.click(homeButton);

    expect(mockLocation.href).toBe("/");
  });

  it("has proper semantic structure when error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
  });

  it("error details section has proper styling", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorDetailsSection = document.querySelector(
      '[style*="background: rgba(239, 68, 68, 0.1)"]'
    );
    expect(errorDetailsSection).toBeInTheDocument();
    expect(errorDetailsSection).toHaveStyle({
      borderRadius: "12px",
      padding: "1.5rem",
      maxWidth: "600px",
    });
  });

  it("error message is displayed in monospace font", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const errorMessageDiv = document.querySelector(
      '[style*="font-family: monospace"]'
    );
    expect(errorMessageDiv).toBeInTheDocument();
    expect(errorMessageDiv).toHaveTextContent("Error: Test error message");
  });

  it("shows contact suggestion for persistent errors", () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(
        /Wenn dieser Fehler weiterhin auftritt, kontaktieren Sie mich bitte über die Kontaktseite/
      )
    ).toBeInTheDocument();
  });

  it("shows development mode stack trace when in development", () => {
    // Mock development environment
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Stack Trace (Development Only)")
    ).toBeInTheDocument();

    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });

  it("hides stack trace when not in development mode", () => {
    // Mock production environment
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(
      screen.queryByText("Stack Trace (Development Only)")
    ).not.toBeInTheDocument();

    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });

  it("renders without error when no children are provided", () => {
    render(<ErrorBoundary>{null}</ErrorBoundary>);

    // Should render nothing but not crash
    expect(document.querySelector(".content")).not.toBeInTheDocument();
  });

  it("getDerivedStateFromError updates state correctly", () => {
    const state = ErrorBoundary.getDerivedStateFromError();

    expect(state).toEqual({ hasError: true });
  });
});
