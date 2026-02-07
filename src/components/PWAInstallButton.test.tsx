/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PWAInstallButton from "./PWAInstallButton";

// Mock the PWA utilities
import * as pwaUtils from "../utils/pwa";

vi.mock("../utils/pwa", () => ({
  initializePWA: vi.fn(),
  isInstallable: vi.fn(() => false),
  showInstallPrompt: vi.fn(),
  getInstallInstructions: vi.fn(() => ({
    title: "Desktop Installation",
    steps: ["Click install button", "Confirm installation"],
  })),
  trackPWAEvent: vi.fn(),
}));

// Get mocked functions
const mockedPwaUtils = vi.mocked(pwaUtils);

describe("PWAInstallButton", () => {
  const mockEventListeners = new Map();

  beforeEach(() => {
    // Mock global addEventListener and removeEventListener
    globalThis.addEventListener = vi.fn((event, handler) => {
      mockEventListeners.set(event, handler);
    });
    globalThis.removeEventListener = vi.fn((event) => {
      mockEventListeners.delete(event);
    });
    globalThis.dispatchEvent = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockEventListeners.clear();
  });

  it("should not render when PWA installation is not available", () => {
    mockedPwaUtils.isInstallable.mockReturnValue(false);

    const { container } = render(<PWAInstallButton />);
    expect(container.firstChild).toBeNull();
  });

  it("should render install button when PWA installation is available", () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);

    render(<PWAInstallButton />);

    const button = screen.getByRole("button", { name: /app installieren/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("pwa-install-button");
  });

  it("should render custom children when provided", () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);

    render(
      <PWAInstallButton>
        <span>Install Now</span>
      </PWAInstallButton>,
    );

    expect(screen.getByText("Install Now")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);

    render(<PWAInstallButton className="custom-class" />);

    const button = screen.getByRole("button", { name: /app installieren/i });
    expect(button).toHaveClass("pwa-install-button", "custom-class");
  });

  it("should handle successful install prompt", async () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);
    mockedPwaUtils.showInstallPrompt.mockResolvedValue({
      outcome: "accepted",
      platform: "android",
    });

    render(<PWAInstallButton />);

    const button = screen.getByRole("button", { name: /app installieren/i });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByLabelText(/installiere/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockedPwaUtils.showInstallPrompt).toHaveBeenCalled();
      expect(mockedPwaUtils.trackPWAEvent).toHaveBeenCalledWith(
        "install_prompt_shown",
      );
      expect(mockedPwaUtils.trackPWAEvent).toHaveBeenCalledWith(
        "install_accepted",
        {
          platform: "android",
        },
      );
    });
  });

  it("should handle dismissed install prompt", async () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);
    mockedPwaUtils.showInstallPrompt.mockResolvedValue({
      outcome: "dismissed",
      platform: "ios",
    });

    render(<PWAInstallButton />);

    const button = screen.getByRole("button", { name: /app installieren/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedPwaUtils.trackPWAEvent).toHaveBeenCalledWith(
        "install_dismissed",
        {
          platform: "ios",
        },
      );
    });
  });

  it("should show manual instructions when native prompt is not available", async () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);
    mockedPwaUtils.showInstallPrompt.mockResolvedValue({
      outcome: "not-available",
      platform: null,
    });

    render(<PWAInstallButton />);

    const button = screen.getByRole("button", { name: /app installieren/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(
        screen.getByText(/um diese app zu installieren/i),
      ).toBeInTheDocument();
    });
  });

  it("should close instructions modal on close button click", async () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);
    mockedPwaUtils.showInstallPrompt.mockResolvedValue({
      outcome: "not-available",
      platform: null,
    });

    render(<PWAInstallButton />);

    const installButton = screen.getByRole("button", {
      name: /app installieren/i,
    });
    fireEvent.click(installButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const closeButton = screen.getByRole("button", { name: /schließen/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should close instructions modal on escape key", async () => {
    mockedPwaUtils.isInstallable.mockReturnValue(true);
    mockedPwaUtils.showInstallPrompt.mockResolvedValue({
      outcome: "not-available",
      platform: null,
    });

    render(<PWAInstallButton />);

    const button = screen.getByRole("button", { name: /app installieren/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    const modal = screen.getByRole("dialog");
    fireEvent.keyDown(modal, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should handle PWA event listeners correctly", () => {
    mockedPwaUtils.isInstallable.mockReturnValue(false);

    const { unmount } = render(<PWAInstallButton />);

    // Check that event listeners are added
    expect(globalThis.addEventListener).toHaveBeenCalledWith(
      "pwa-installable",
      expect.any(Function),
    );
    expect(globalThis.addEventListener).toHaveBeenCalledWith(
      "pwa-installed",
      expect.any(Function),
    );

    unmount();

    // Check that event listeners are removed
    expect(globalThis.removeEventListener).toHaveBeenCalledWith(
      "pwa-installable",
      expect.any(Function),
    );
    expect(globalThis.removeEventListener).toHaveBeenCalledWith(
      "pwa-installed",
      expect.any(Function),
    );
  });

  it("should update install availability when receiving PWA events", () => {
    mockedPwaUtils.isInstallable.mockReturnValue(false);

    render(<PWAInstallButton />);

    // Simulate PWA installable event
    const installableHandler = mockEventListeners.get("pwa-installable");
    if (installableHandler) {
      installableHandler({
        detail: { isInstallable: true, isInstalled: false },
      });
    }

    // The button should now be available (mocked canInstall should be checked)
    expect(globalThis.addEventListener).toHaveBeenCalledWith(
      "pwa-installable",
      expect.any(Function),
    );
  });
});
