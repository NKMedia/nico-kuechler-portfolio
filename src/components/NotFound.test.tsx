import { describe, it, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("renders the 404 page correctly", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Seite nicht gefunden")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Die angeforderte Seite existiert nicht oder wurde verschoben."
      )
    ).toBeInTheDocument();
  });

  it("displays main heading and error message", () => {
    render(<NotFound />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Seite nicht gefunden",
    });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Die angeforderte Seite existiert nicht oder wurde verschoben.",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  it("displays large 404 error code", () => {
    render(<NotFound />);

    const errorCode = screen.getByText("404");
    expect(errorCode).toBeInTheDocument();
    expect(errorCode).toHaveStyle({ fontSize: "6rem", color: "#2563eb" });
  });

  it("displays helpful error message", () => {
    render(<NotFound />);

    const helpText = screen.getByText(
      "Möglicherweise haben Sie sich in der URL vertippt oder die Seite wurde entfernt."
    );
    expect(helpText).toBeInTheDocument();
  });

  describe("Navigation Links", () => {
    it("renders all navigation buttons", () => {
      render(<NotFound />);

      expect(
        screen.getByRole("link", { name: /Zur Startseite/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Lebenslauf/ })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Projekte/ })
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Kontakt/ })).toBeInTheDocument();
    });

    it("navigation links have correct hrefs", () => {
      render(<NotFound />);

      expect(
        screen.getByRole("link", { name: /Zur Startseite/ })
      ).toHaveAttribute("href", "/");
      expect(screen.getByRole("link", { name: /Lebenslauf/ })).toHaveAttribute(
        "href",
        "/lebenslauf"
      );
      expect(screen.getByRole("link", { name: /Projekte/ })).toHaveAttribute(
        "href",
        "/projekte"
      );
      expect(screen.getByRole("link", { name: /Kontakt/ })).toHaveAttribute(
        "href",
        "/kontakt"
      );
    });

    it("navigation links have correct CSS classes", () => {
      render(<NotFound />);

      const homeLink = screen.getByRole("link", { name: /Zur Startseite/ });
      const lebenslaufLink = screen.getByRole("link", { name: /Lebenslauf/ });
      const projekteLink = screen.getByRole("link", { name: /Projekte/ });
      const kontaktLink = screen.getByRole("link", { name: /Kontakt/ });

      expect(homeLink).toHaveClass("btn-blue");
      expect(lebenslaufLink).toHaveClass("btn-outline");
      expect(projekteLink).toHaveClass("btn-outline");
      expect(kontaktLink).toHaveClass("btn-outline");
    });

    it("navigation links contain icons", () => {
      render(<NotFound />);

      const homeIcon = screen
        .getByRole("link", { name: /Zur Startseite/ })
        .querySelector("i.fas.fa-home");
      const userIcon = screen
        .getByRole("link", { name: /Lebenslauf/ })
        .querySelector("i.fas.fa-user");
      const briefcaseIcon = screen
        .getByRole("link", { name: /Projekte/ })
        .querySelector("i.fas.fa-briefcase");
      const envelopeIcon = screen
        .getByRole("link", { name: /Kontakt/ })
        .querySelector("i.fas.fa-envelope");

      expect(homeIcon).toBeInTheDocument();
      expect(userIcon).toBeInTheDocument();
      expect(briefcaseIcon).toBeInTheDocument();
      expect(envelopeIcon).toBeInTheDocument();
    });
  });

  describe("Help Section", () => {
    it("displays help section with suggestions", () => {
      render(<NotFound />);

      expect(
        screen.getByText("Suchen Sie etwas Bestimmtes?")
      ).toBeInTheDocument();
      expect(screen.getByText(/Über mich:/)).toBeInTheDocument();
      expect(screen.getByText(/Lebenslauf:/)).toBeInTheDocument();
      expect(screen.getByText(/Projekte:/)).toBeInTheDocument();
      expect(screen.getByText(/Kontakt:/)).toBeInTheDocument();
    });

    it("help section contains lightbulb icon", () => {
      render(<NotFound />);

      const lightbulbIcon = document.querySelector("i.fas.fa-lightbulb");
      expect(lightbulbIcon).toBeInTheDocument();
    });

    it("displays detailed descriptions for each section", () => {
      render(<NotFound />);

      expect(
        screen.getByText("Informationen zu meiner Person und Arbeitsweise")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Beruflicher Werdegang und Qualifikationen")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Portfolio meiner aktuellen und vergangenen Arbeiten")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Kontaktformular und Verfügbarkeit für neue Projekte")
      ).toBeInTheDocument();
    });
  });

  it("has proper semantic structure", () => {
    render(<NotFound />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
  });

  it("has centered layout styling", () => {
    render(<NotFound />);

    const profileMain = document.querySelector(".profile-main");
    expect(profileMain).toHaveStyle({
      textAlign: "center",
      padding: "4rem 2rem",
    });
  });

  it("help section has proper styling", () => {
    render(<NotFound />);

    const helpSection = document.querySelector(
      '[style*="background: rgba(37, 99, 235, 0.1)"]'
    );
    expect(helpSection).toBeInTheDocument();
    expect(helpSection).toHaveStyle({
      borderRadius: "12px",
      padding: "1.5rem",
      maxWidth: "500px",
    });
  });

  it("navigation buttons are properly grouped", () => {
    render(<NotFound />);

    const buttonContainer = document.querySelector(
      '[style*="display: flex"][style*="gap: 1rem"][style*="justify-content: center"]'
    );
    expect(buttonContainer).toBeInTheDocument();

    const links = buttonContainer?.querySelectorAll("a");
    expect(links?.length).toBe(4);
  });

  it("links are functional", async () => {
    const user = userEvent.setup();
    render(<NotFound />);

    // Test that links are clickable (they won't actually navigate in test environment)
    const homeLink = screen.getByRole("link", { name: /Zur Startseite/ });
    await user.click(homeLink);

    // In a real application, this would trigger navigation
    // Here we just verify the link is interactive
    expect(homeLink).toBeInTheDocument();
  });

  it("help list has proper styling", () => {
    render(<NotFound />);

    const helpList = document.querySelector('[style*="list-style: none"]');
    expect(helpList).toBeInTheDocument();
    expect(helpList).toHaveStyle({
      padding: "0",
      textAlign: "left",
      lineHeight: "1.8",
    });
  });

  it("contains all required UI elements", () => {
    render(<NotFound />);

    // Check for main elements
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Seite nicht gefunden")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(4);
    expect(
      screen.getByText("Suchen Sie etwas Bestimmtes?")
    ).toBeInTheDocument();
  });
});
