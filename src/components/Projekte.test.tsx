import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import Projekte from "./Projekte";

// Mock ProfileCard component
vi.mock("./ProfileCard", () => ({
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

describe("Projekte", () => {
  it("renders the projects page correctly", () => {
    render(<Projekte />);

    expect(screen.getByText("Projekte")).toBeInTheDocument();
    expect(
      screen.getByText("Ausgewählte Arbeiten & Entwicklungen")
    ).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
  });

  it("displays main heading and subheading", () => {
    render(<Projekte />);

    const heading = screen.getByRole("heading", { level: 1, name: "Projekte" });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Ausgewählte Arbeiten & Entwicklungen",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  it("displays project grid with all project cards", () => {
    render(<Projekte />);

    const projectGrid = document.querySelector(".project-grid");
    expect(projectGrid).toBeInTheDocument();

    const projectCards = document.querySelectorAll(".project-card");
    expect(projectCards).toHaveLength(6); // Total number of projects
  });

  describe("Flughafen München Project", () => {
    it("displays Flughafen München project information", () => {
      render(<Projekte />);

      expect(
        screen.getByText("Flughafen München - Softwarelösungen")
      ).toBeInTheDocument();
      expect(screen.getByText("2017 - heute")).toBeInTheDocument();
      expect(
        screen.getByText(/React, Node.js, TypeScript, Figma/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Konzeption und Entwicklung individueller Softwarelösungen für FMG/
        )
      ).toBeInTheDocument();
    });
  });

  describe("VR/AR Mixed Reality Project", () => {
    it("displays VR/AR project information", () => {
      render(<Projekte />);

      expect(
        screen.getByText("VR/AR Mixed Reality Projekte")
      ).toBeInTheDocument();

      // Use more specific selectors to avoid duplicates
      const vrProjectCard = screen
        .getByText("VR/AR Mixed Reality Projekte")
        .closest(".project-card");
      expect(vrProjectCard).toHaveTextContent("2012 - heute");
      expect(vrProjectCard).toHaveTextContent("Unity, C#, VR/AR SDKs");
      expect(vrProjectCard).toHaveTextContent(
        "Entwicklung immersiver VR- und AR-Anwendungen"
      );
    });
  });

  describe("3D Navigation Prototype", () => {
    it("displays 3D navigation project information", () => {
      render(<Projekte />);

      expect(screen.getByText("3D Navigation Prototyp")).toBeInTheDocument();
      expect(screen.getByText("2014 - 2016")).toBeInTheDocument();
      expect(
        screen.getByText("InfoGate Information Systems")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Unity, 3D Modeling, UI\/UX Design/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Entwicklung eines innovativen 3D-Navigationssystems/)
      ).toBeInTheDocument();
    });
  });

  describe("Media Design Business", () => {
    it("displays media design business information", () => {
      render(<Projekte />);

      expect(screen.getByText("Nico Küchler Mediendesign")).toBeInTheDocument();

      // Use more specific selector to avoid duplicates
      const mediendesignCard = screen
        .getByText("Nico Küchler Mediendesign")
        .closest(".project-card");
      expect(mediendesignCard).toHaveTextContent("2012 - heute");
      expect(mediendesignCard).toHaveTextContent(
        "Game Design, Videoproduktion, Fotografie"
      );
      expect(mediendesignCard).toHaveTextContent(
        "Selbstständige Tätigkeit mit Fokus auf 3D-Konfiguratoren"
      );
    });
  });

  describe("Library Digitalization Project", () => {
    it("displays library digitalization project information", () => {
      render(<Projekte />);

      expect(
        screen.getByText("Digitalisierung Fachbibliotheken")
      ).toBeInTheDocument();
      expect(screen.getByText("2005 - 2006")).toBeInTheDocument();
      expect(screen.getByText("NATO E3-A Verband")).toBeInTheDocument();
      expect(
        screen.getByText(/Projektleitung für die Digitalisierung militärischer/)
      ).toBeInTheDocument();
    });
  });

  describe("Web & Graphic Design Projects", () => {
    it("displays web and graphic design projects information", () => {
      render(<Projekte />);

      expect(
        screen.getByText("Web- & Grafikdesign Projekte")
      ).toBeInTheDocument();
      expect(screen.getByText("2014 - heute")).toBeInTheDocument();
      expect(
        screen.getByText(/Adobe Creative Cloud, CAD, Video Editing/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Vielfältige Projekte im Bereich Produktrenderings/)
      ).toBeInTheDocument();
    });
  });

  it("has proper semantic structure", () => {
    render(<Projekte />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");
    const projectGrid = document.querySelector(".project-grid");
    const projectCards = document.querySelectorAll(".project-card");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
    expect(projectGrid).toBeInTheDocument();
    expect(projectCards.length).toBeGreaterThan(0);
  });

  it("each project card has proper structure", () => {
    render(<Projekte />);

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      // Each card should have at least one heading
      const heading = card.querySelector("h4");
      expect(heading).toBeInTheDocument();

      // Each card should have paragraphs with project information
      const paragraphs = card.querySelectorAll("p");
      expect(paragraphs.length).toBeGreaterThan(0);
    });
  });

  it("displays technology information in project cards", () => {
    render(<Projekte />);

    // Check for technology sections
    const technologySections = screen.getAllByText(/Technologien:/);
    expect(technologySections.length).toBeGreaterThan(0);
  });

  it("displays timeframe information in project cards", () => {
    render(<Projekte />);

    // Check for timeframe sections
    const timeframeSections = screen.getAllByText(/Zeitraum:/);
    expect(timeframeSections.length).toBeGreaterThan(0);
  });

  it("includes ProfileCard component", () => {
    render(<Projekte />);

    const profileCard = screen.getByTestId("profile-card");
    expect(profileCard).toBeInTheDocument();
  });

  it("contains relevant project keywords", () => {
    render(<Projekte />);

    // Check for important technology keywords using getAllByText to handle multiple occurrences
    expect(screen.getAllByText(/React/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Unity/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/TypeScript/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/VR\/AR/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/UI\/UX Design/).length).toBeGreaterThan(0);
  });

  it("shows project descriptions with sufficient detail", () => {
    render(<Projekte />);

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      // Each project should have descriptive text
      const paragraphs = card.querySelectorAll("p");
      const hasDescription = Array.from(paragraphs).some(
        (p) => p.textContent && p.textContent.length > 50
      );
      expect(hasDescription).toBe(true);
    });
  });
});
