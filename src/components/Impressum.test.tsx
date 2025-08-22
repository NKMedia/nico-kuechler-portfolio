import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import Impressum from "./Impressum";

// Mock ProfileCard component
vi.mock("./ProfileCard", () => ({
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

describe("Impressum", () => {
  it("renders the impressum page correctly", () => {
    render(<Impressum />);

    expect(screen.getByText("Impressum")).toBeInTheDocument();
    expect(screen.getByText("Angaben gemäß § 5 TMG")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
  });

  it("displays main heading and subheading", () => {
    render(<Impressum />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Impressum",
    });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Angaben gemäß § 5 TMG",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  describe("Responsible Person Information", () => {
    it("displays responsible person section", () => {
      render(<Impressum />);

      expect(screen.getByText("Verantwortlich")).toBeInTheDocument();
      expect(screen.getByText("Nico Küchler")).toBeInTheDocument();
      expect(screen.getByText(/Wilhelm-Busch-Weg 22/)).toBeInTheDocument();
      expect(
        screen.getByText(/82216 Maisach, Ortsteil Gernlinden/)
      ).toBeInTheDocument();
      expect(screen.getByText(/Deutschland/)).toBeInTheDocument();

      // Check for business name in the responsible section specifically
      const responsibleSection = screen
        .getByText("Verantwortlich")
        .closest(".cv-section");
      expect(responsibleSection).toHaveTextContent("Nico Küchler Mediendesign");
    });
  });

  describe("Contact Information", () => {
    it("displays contact section", () => {
      render(<Impressum />);

      expect(screen.getByText("Kontakt")).toBeInTheDocument();
      expect(screen.getByText(/\+49 \(0\)171 8168164/)).toBeInTheDocument();
      expect(
        screen.getByText(/mail\(at\)nico-kuechler\.de/)
      ).toBeInTheDocument();
    });
  });

  describe("Tax Information", () => {
    it("displays VAT identification number", () => {
      render(<Impressum />);

      expect(
        screen.getByText("Umsatzsteuer-Identifikationsnummer")
      ).toBeInTheDocument();
      expect(screen.getByText("DE283872860")).toBeInTheDocument();
    });

    it("displays business identification number", () => {
      render(<Impressum />);

      expect(
        screen.getByText("Wirtschafts-Identifikationsnummer")
      ).toBeInTheDocument();
      expect(screen.getByText("145/154/51278")).toBeInTheDocument();
    });
  });

  describe("Legal Disclaimers", () => {
    it("displays liability disclaimer section", () => {
      render(<Impressum />);

      expect(screen.getByText("Haftungshinweis")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Die Informationen auf unseren Internetseiten werden mit großer Sorgfalt erstellt/
        )
      ).toBeInTheDocument();
    });

    it("contains liability limitation text", () => {
      render(<Impressum />);

      const liabilityText = screen.getByText(
        /Etwaige Schadensersatzansprüche des Nutzers gegen Nico Küchler Mediendesign/
      );
      expect(liabilityText).toBeInTheDocument();
      expect(liabilityText).toHaveTextContent(
        "schuldhafte Verletzung vertraglicher Hauptpflichten"
      );
    });

    it("contains disclaimer for external links", () => {
      render(<Impressum />);

      const disclaimerText = screen.getByText(
        /Nico Küchler Mediendesign distanziert sich hiermit ausdrücklich von Inhalten aller verknüpften Seiten/
      );
      expect(disclaimerText).toBeInTheDocument();
    });
  });

  describe("Intellectual Property", () => {
    it("displays trademark section", () => {
      render(<Impressum />);

      expect(screen.getByText("Marken")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Das Logo sowie der Name von Nico Küchler Mediendesign sind eingetragene Marken/
        )
      ).toBeInTheDocument();
    });

    it("displays copyright section", () => {
      render(<Impressum />);

      expect(screen.getByText("Copyright")).toBeInTheDocument();
      expect(screen.getByText(/Alle Rechte vorbehalten/)).toBeInTheDocument();
      expect(
        screen.getByText(/Nachdruck, Aufnahme in Online-Dienste und Internet/)
      ).toBeInTheDocument();
    });
  });

  describe("Download and Data Consent", () => {
    it("displays download disclaimer", () => {
      render(<Impressum />);

      expect(screen.getByText("Download")).toBeInTheDocument();
      expect(
        screen.getByText(/Der Download von Dateien erfolgt auf eigene Gefahr/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Trotz aktueller Virenprüfung ist eine Haftung/)
      ).toBeInTheDocument();
    });

    it("displays data consent section", () => {
      render(<Impressum />);

      expect(screen.getByText("Zustimmung")).toBeInTheDocument();
      expect(
        screen.getByText(/Wenn Sie Daten über sich selbst eingeben/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Ein Widerspruch gegen die Speicherung Ihrer Daten/)
      ).toBeInTheDocument();
    });
  });

  it("has proper semantic structure", () => {
    render(<Impressum />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");
    const cvSections = document.querySelectorAll(".cv-section");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
    expect(cvSections.length).toBeGreaterThan(0);
  });

  it("all sections have headings", () => {
    render(<Impressum />);

    const sectionHeadings = [
      "Verantwortlich",
      "Kontakt",
      "Umsatzsteuer-Identifikationsnummer",
      "Wirtschafts-Identifikationsnummer",
      "Haftungshinweis",
      "Marken",
      "Copyright",
      "Download",
      "Zustimmung",
    ];

    sectionHeadings.forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it("contains business address information", () => {
    render(<Impressum />);

    // Check for address parts individually
    expect(screen.getByText(/Wilhelm-Busch-Weg 22/)).toBeInTheDocument();
    expect(screen.getByText(/82216 Maisach/)).toBeInTheDocument();
    expect(screen.getByText(/Deutschland/)).toBeInTheDocument();
  });

  it("includes ProfileCard component", () => {
    render(<Impressum />);

    const profileCard = screen.getByTestId("profile-card");
    expect(profileCard).toBeInTheDocument();
  });

  it("contains legal compliance text", () => {
    render(<Impressum />);

    // Check for important legal phrases
    expect(screen.getByText(/§ 5 TMG/)).toBeInTheDocument();
    expect(screen.getByText(/Bundesdatenschutzgesetzes/)).toBeInTheDocument();
    expect(screen.getByText(/Alle Rechte vorbehalten/)).toBeInTheDocument();
  });

  it("sections are properly structured with cv-section class", () => {
    render(<Impressum />);

    const cvSections = document.querySelectorAll(".cv-section");
    expect(cvSections.length).toBe(9); // Total number of sections

    cvSections.forEach((section) => {
      const heading = section.querySelector("h4");
      expect(heading).toBeInTheDocument();
    });
  });
});
