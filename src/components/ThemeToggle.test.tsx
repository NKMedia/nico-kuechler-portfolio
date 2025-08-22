import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock document.body.classList
    document.body.className = "";
  });

  it("renders theme toggle button", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it("shows moon icon in light mode", () => {
    render(<ThemeToggle />);

    const icon = screen.getByRole("button").querySelector("i");
    expect(icon).toHaveClass("fas", "fa-moon");
  });

  it("toggles to dark mode when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("theme", '"dark"');
    expect(document.body.classList.contains("dark-theme")).toBe(true);
  });

  it("initializes with saved theme from localStorage", () => {
    mockLocalStorage.getItem.mockReturnValue('"dark"');

    render(<ThemeToggle />);

    expect(document.body.classList.contains("dark-theme")).toBe(true);
  });

  it("uses system preference when no saved theme", () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    window.matchMedia = vi.fn(() => ({
      matches: true, // Dark mode
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<ThemeToggle />);

    expect(document.body.classList.contains("dark-theme")).toBe(true);
  });

  it("has proper accessibility attributes", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("theme-toggle");
    expect(button).toHaveAttribute("aria-label");
  });
});
