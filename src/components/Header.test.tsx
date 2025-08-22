import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

// Mock useLocation hook
const mockLocation = {
  pathname: "/",
  search: "",
  hash: "",
  state: null,
  key: "test",
};

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: () => mockLocation,
  };
});

// Mock ThemeToggle component
vi.mock("./ThemeToggle", () => ({
  default: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.pathname = "/";
  });

  it("renders header with name and role", () => {
    render(<Header />);

    expect(screen.getByText("Nico Küchler")).toBeInTheDocument();
    expect(
      screen.getByText("/ SENIOR SOFTWARE DEVELOPER & MEDIA DESIGNER")
    ).toBeInTheDocument();
  });

  it("renders dot element", () => {
    render(<Header />);

    const dot = document.querySelector(".dot");
    expect(dot).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Header />);

    expect(
      screen.getAllByRole("link", { name: "ÜBER MICH" })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "LEBENSLAUF" })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "PROJEKTE" })[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "KONTAKT" })[0]
    ).toBeInTheDocument();
  });

  it("highlights active navigation link", () => {
    mockLocation.pathname = "/lebenslauf";
    render(<Header />);

    const lebenslaufLinks = screen.getAllByRole("link", { name: "LEBENSLAUF" });
    expect(lebenslaufLinks[0]).toHaveClass("active");

    const aboutLinks = screen.getAllByRole("link", { name: "ÜBER MICH" });
    expect(aboutLinks[0]).not.toHaveClass("active");
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Header />);

    expect(
      screen.getAllByRole("link", { name: "ÜBER MICH" })[0]
    ).toHaveAttribute("href", "/");
    expect(
      screen.getAllByRole("link", { name: "LEBENSLAUF" })[0]
    ).toHaveAttribute("href", "/lebenslauf");
    expect(
      screen.getAllByRole("link", { name: "PROJEKTE" })[0]
    ).toHaveAttribute("href", "/projekte");
    expect(screen.getAllByRole("link", { name: "KONTAKT" })[0]).toHaveAttribute(
      "href",
      "/kontakt"
    );
  });

  it("renders theme toggle component", () => {
    render(<Header />);

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders hamburger menu button", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: "Toggle menu",
    });
    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveClass("hamburger");
  });

  it("hamburger button has three spans", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: "Toggle menu",
    });
    const spans = hamburgerButton.querySelectorAll("span");
    expect(spans).toHaveLength(3);
  });

  it("toggles mobile menu when hamburger is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: "Toggle menu",
    });
    const mobileNav = document.querySelector(".mobile-nav");

    // Initially not active
    expect(hamburgerButton).not.toHaveClass("active");
    expect(mobileNav).not.toHaveClass("active");

    // Click to open
    await user.click(hamburgerButton);
    expect(hamburgerButton).toHaveClass("active");
    expect(mobileNav).toHaveClass("active");

    // Click to close
    await user.click(hamburgerButton);
    expect(hamburgerButton).not.toHaveClass("active");
    expect(mobileNav).not.toHaveClass("active");
  });

  it("renders mobile navigation with same links", () => {
    render(<Header />);

    const mobileNav = document.querySelector(".mobile-nav");
    expect(mobileNav).toBeInTheDocument();

    // Mobile nav should contain the same navigation links
    const mobileLinks = mobileNav?.querySelectorAll("a");
    expect(mobileLinks).toHaveLength(4);
  });

  it("closes mobile menu when mobile nav link is clicked", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: "Toggle menu",
    });
    const mobileNav = document.querySelector(".mobile-nav");

    // Open mobile menu
    await user.click(hamburgerButton);
    expect(mobileNav).toHaveClass("active");

    // Click on mobile navigation link
    const mobileLinks = mobileNav?.querySelectorAll("a");
    if (mobileLinks && mobileLinks[0]) {
      await user.click(mobileLinks[0]);
      expect(mobileNav).not.toHaveClass("active");
    }
  });

  it("highlights active link in mobile navigation", () => {
    mockLocation.pathname = "/projekte";
    render(<Header />);

    const mobileNav = document.querySelector(".mobile-nav");
    const mobileLinks = mobileNav?.querySelectorAll("a");

    if (mobileLinks) {
      // Find the projekte link in mobile nav
      const projekteLink = Array.from(mobileLinks).find((link) =>
        link.textContent?.includes("PROJEKTE")
      );
      expect(projekteLink).toHaveClass("active");
    }
  });

  it("has proper semantic structure", () => {
    render(<Header />);

    const header = document.querySelector("header.header");
    const headerLeft = document.querySelector(".header-left");
    const headerRight = document.querySelector(".header-right");
    const headerNav = document.querySelector(".header-nav");

    expect(header).toBeInTheDocument();
    expect(headerLeft).toBeInTheDocument();
    expect(headerRight).toBeInTheDocument();
    expect(headerNav).toBeInTheDocument();
  });

  it("hamburger button has proper accessibility", () => {
    render(<Header />);

    const hamburgerButton = screen.getByRole("button", {
      name: "Toggle menu",
    });
    expect(hamburgerButton).toHaveAttribute("aria-label", "Toggle menu");
  });

  describe("active link highlighting", () => {
    it("highlights home page when on root path", () => {
      mockLocation.pathname = "/";
      render(<Header />);

      const aboutLinks = screen.getAllByRole("link", { name: "ÜBER MICH" });
      expect(aboutLinks[0]).toHaveClass("active"); // Desktop nav link
    });

    it("highlights lebenslauf when on lebenslauf page", () => {
      mockLocation.pathname = "/lebenslauf";
      render(<Header />);

      const lebenslaufLinks = screen.getAllByRole("link", {
        name: "LEBENSLAUF",
      });
      expect(lebenslaufLinks[0]).toHaveClass("active"); // Desktop nav link
    });

    it("highlights projekte when on projekte page", () => {
      mockLocation.pathname = "/projekte";
      render(<Header />);

      const projekteLinks = screen.getAllByRole("link", { name: "PROJEKTE" });
      expect(projekteLinks[0]).toHaveClass("active"); // Desktop nav link
    });

    it("highlights kontakt when on kontakt page", () => {
      mockLocation.pathname = "/kontakt";
      render(<Header />);

      const kontaktLinks = screen.getAllByRole("link", { name: "KONTAKT" });
      expect(kontaktLinks[0]).toHaveClass("active"); // Desktop nav link
    });
  });
});
