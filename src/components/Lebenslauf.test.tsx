import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import Lebenslauf from "./Lebenslauf";

// Mock ProfileCard component
vi.mock("./ProfileCard", () => ({
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

describe("Lebenslauf", () => {
  it("renders the CV page correctly", () => {
    render(<Lebenslauf />);

    expect(screen.getByText("Lebenslauf")).toBeInTheDocument();
    expect(screen.getByText("Meine berufliche Laufbahn")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
  });

  it("displays main heading and subheading", () => {
    render(<Lebenslauf />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Lebenslauf",
    });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Meine berufliche Laufbahn",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  it("displays all CV sections", () => {
    render(<Lebenslauf />);

    expect(screen.getByText("Berufserfahrung")).toBeInTheDocument();
    expect(screen.getByText("Ausbildung")).toBeInTheDocument();
    expect(screen.getByText("Technische Fähigkeiten")).toBeInTheDocument();
    expect(screen.getByText("Sprachen")).toBeInTheDocument();
    expect(screen.getByText("Zusätzliche Qualifikationen")).toBeInTheDocument();
  });

  describe("Work Experience", () => {
    it("displays current position at Flughafen München", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Referent Senior Software Developer & Designer")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Flughafen München GmbH - Servicebereich IT")
      ).toBeInTheDocument();
      expect(screen.getByText("09/2022 - heute")).toBeInTheDocument();
    });

    it("displays previous position at Flughafen München", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Referent Software Developer & Designer")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Flughafen München GmbH - IT Development and Engineering"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("02/2017 - 08/2022")).toBeInTheDocument();
    });

    it("displays self-employment information", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Inhaber - Nico Küchler Mediendesign")
      ).toBeInTheDocument();
      expect(screen.getByText("Selbstständig")).toBeInTheDocument();
      expect(screen.getByText("03/2012 - heute")).toBeInTheDocument();
    });

    it("displays InfoGate experience", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Werkstudent - Software Developer & Designer")
      ).toBeInTheDocument();
      expect(
        screen.getByText("InfoGate Information Systems GmbH")
      ).toBeInTheDocument();
      expect(screen.getByText("03/2014 - 02/2016")).toBeInTheDocument();
    });

    it("displays Bundeswehr experience", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Stabsoffizier & Ausbildungsleiter")
      ).toBeInTheDocument();
      expect(screen.getByText("Deutsche Bundeswehr")).toBeInTheDocument();
      expect(screen.getByText("10/2002 - 03/2012")).toBeInTheDocument();
    });

    it("displays Deutsche Post experience", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Fachkraft für Brief- und Frachtverkehr")
      ).toBeInTheDocument();
      expect(screen.getByText("Deutsche Post AG")).toBeInTheDocument();
      expect(screen.getByText("06/2001 - 09/2002")).toBeInTheDocument();
    });
  });

  describe("Education", () => {
    it("displays bachelor's degree information", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Bachelor of Arts - Medien- und Kommunikationsdesign")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Hochschule Macromedia, München")
      ).toBeInTheDocument();
      expect(screen.getByText("10/2012 - 04/2016")).toBeInTheDocument();
      expect(screen.getByText(/Abschlussnote: 1,8/)).toBeInTheDocument();
    });

    it("displays university studies information", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Diplom (FH) Betriebswirtschaftslehre")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Universität der Bundeswehr, München")
      ).toBeInTheDocument();
      expect(screen.getByText("10/2008 - 11/2010")).toBeInTheDocument();
    });

    it("displays vocational training information", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Ausbildung Kaufmann für Bürokommunikation")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Deutsche Post AG, Oldenburg")
      ).toBeInTheDocument();
      expect(screen.getByText("08/1998 - 07/2001")).toBeInTheDocument();
      expect(screen.getByText(/Abschlussnote: 2,0/)).toBeInTheDocument();
    });
  });

  describe("Technical Skills", () => {
    it("displays programming skills", () => {
      render(<Lebenslauf />);

      expect(screen.getByText(/JavaScript \(sehr gut\)/)).toBeInTheDocument();
      expect(screen.getByText(/TypeScript \(sehr gut\)/)).toBeInTheDocument();
      expect(screen.getByText(/HTML \(sehr gut\)/)).toBeInTheDocument();
      expect(screen.getByText(/CSS \(gut\)/)).toBeInTheDocument();
      expect(screen.getByText(/C# \(gut\)/)).toBeInTheDocument();
    });

    it("displays frameworks and tools", () => {
      render(<Lebenslauf />);

      expect(screen.getByText(/React, Node\.js, Unity/)).toBeInTheDocument();
      expect(screen.getByText(/Unity \(zertifiziert\)/)).toBeInTheDocument();
      expect(screen.getByText(/Storybook, Figma/)).toBeInTheDocument();
    });

    it("displays design software skills", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText(/Adobe Creative Cloud \(sehr gut\)/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Autodesk Cloud \(gut\)/)).toBeInTheDocument();
    });

    it("displays specialization areas", () => {
      render(<Lebenslauf />);

      // Use getAllByText to handle multiple occurrences
      expect(
        screen.getAllByText(/VR\/AR\/Mixed Reality/).length
      ).toBeGreaterThan(0);
      expect(screen.getAllByText(/Game Design/).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/UI\/UX Design/).length).toBeGreaterThan(0);
      expect(screen.getByText(/3D Entwicklung/)).toBeInTheDocument();
    });
  });

  describe("Languages", () => {
    it("displays language skills", () => {
      render(<Lebenslauf />);

      expect(screen.getByText("Deutsch - Muttersprache")).toBeInTheDocument();
      expect(screen.getByText("Englisch - TOEFL 98 (C1)")).toBeInTheDocument();
      expect(
        screen.getByText("Französisch - Grundkenntnisse")
      ).toBeInTheDocument();
    });
  });

  describe("Additional Qualifications", () => {
    it("displays additional qualifications", () => {
      render(<Lebenslauf />);

      expect(
        screen.getByText("Ausbildungsbeauftragter (seit 2019)")
      ).toBeInTheDocument();
      expect(screen.getByText("Betrieblicher Ersthelfer")).toBeInTheDocument();
      expect(
        screen.getByText("Führungserfahrung (bis zu 46 Mitarbeiter)")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Internationale Projekterfahrung")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Selbstständige Tätigkeit im Mediendesign")
      ).toBeInTheDocument();
    });
  });

  it("has proper semantic structure", () => {
    render(<Lebenslauf />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");
    const cvSections = document.querySelectorAll(".cv-section");
    const cvItems = document.querySelectorAll(".cv-item");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
    expect(cvSections.length).toBeGreaterThan(0);
    expect(cvItems.length).toBeGreaterThan(0);
  });

  it("displays CV items with proper structure", () => {
    render(<Lebenslauf />);

    const cvItems = document.querySelectorAll(".cv-item");
    expect(cvItems.length).toBeGreaterThan(0);

    // Check that CV items have date and details sections
    cvItems.forEach((item) => {
      const dateElement = item.querySelector(".cv-date");
      const detailsElement = item.querySelector(".cv-details");
      expect(dateElement).toBeInTheDocument();
      expect(detailsElement).toBeInTheDocument();
    });
  });

  it("includes ProfileCard component", () => {
    render(<Lebenslauf />);

    const profileCard = screen.getByTestId("profile-card");
    expect(profileCard).toBeInTheDocument();
  });
});
