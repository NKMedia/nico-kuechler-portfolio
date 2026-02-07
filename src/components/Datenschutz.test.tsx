import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import Datenschutz from "./Datenschutz";

// Mock ProfileCard component
vi.mock("./ProfileCard", () => ({
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

describe("Datenschutz", () => {
  it("renders the privacy policy page correctly", () => {
    render(<Datenschutz />);

    expect(screen.getByText("Datenschutzerklärung")).toBeInTheDocument();
    expect(screen.getByText("Geltungsbereich")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
  });

  it("displays main heading and subheading", () => {
    render(<Datenschutz />);

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Datenschutzerklärung",
    });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Geltungsbereich",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  describe("Responsible Person", () => {
    it("displays data controller information", () => {
      render(<Datenschutz />);

      expect(screen.getByText("1. Verantwortlicher")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Verantwortlicher im Sinne der Datenschutz-Grundverordnung/,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("Nico Küchler")).toBeInTheDocument();
      expect(screen.getByText(/Nico Küchler Mediendesign/)).toBeInTheDocument();
      expect(screen.getByText(/Wilhelm-Busch-Weg 22/)).toBeInTheDocument();
      expect(
        screen.getByText(/82216 Maisach, Ortsteil Gernlinden/),
      ).toBeInTheDocument();
    });

    it("displays contact information", () => {
      render(<Datenschutz />);

      expect(
        screen.getAllByText(/\+49 \(0\)171 8168164/)[0],
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(/mail\(at\)nico-kuechler\.de/)[0],
      ).toBeInTheDocument();
    });
  });

  describe("General Data Processing Information", () => {
    it("displays general data processing section", () => {
      render(<Datenschutz />);

      expect(
        screen.getByText("2. Allgemeine Hinweise zur Datenverarbeitung"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen/,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText(/DSGVO, TKG 2003/)).toBeInTheDocument();
    });
  });

  describe("Contact Data Processing", () => {
    it("displays contact form data processing information", () => {
      render(<Datenschutz />);

      expect(screen.getByText("3. Kontakt mit uns")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(/Art. 6 Abs. 1 lit. f DSGVO/)[0],
      ).toBeInTheDocument();
    });
  });

  describe("Server Log Files", () => {
    it("displays server log files section", () => {
      render(<Datenschutz />);

      expect(screen.getByText("4. Server-Log-Dateien")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Der Provider der Seiten erhebt und speichert automatisch Informationen/,
        ),
      ).toBeInTheDocument();
    });

    it("lists server log data types", () => {
      render(<Datenschutz />);

      const logDataTypes = [
        "Browsertyp und Browserversion",
        "Verwendetes Betriebssystem",
        "Referrer URL",
        "Hostname des zugreifenden Rechners",
        "Uhrzeit der Serveranfrage",
        "IP-Adresse",
      ];

      logDataTypes.forEach((dataType) => {
        expect(screen.getByText(dataType)).toBeInTheDocument();
      });
    });
  });

  describe("Cookies", () => {
    it("displays cookies section", () => {
      render(<Datenschutz />);

      expect(screen.getByText("5. Cookies")).toBeInTheDocument();
      expect(
        screen.getByText(/Diese Website verwendet Cookies für die Webanalyse/),
      ).toBeInTheDocument();
    });
  });

  describe("External Services", () => {
    it("displays external services section", () => {
      render(<Datenschutz />);

      expect(screen.getByText("6. Externe Dienste")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Diese Website nutzt externe Schriftarten \(Google Fonts\)/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/https:\/\/developers.google.com\/fonts\/faq/),
      ).toBeInTheDocument();
      // Google privacy policy link appears multiple times (Google Fonts + Google Analytics)
      expect(
        screen.getAllByText(/https:\/\/policies.google.com\/privacy/).length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe("User Rights", () => {
    it("displays user rights section", () => {
      render(<Datenschutz />);

      expect(screen.getByText("8. Ihre Rechte")).toBeInTheDocument();
      expect(
        screen.getByText("Ihnen stehen grundsätzlich die Rechte auf:"),
      ).toBeInTheDocument();
    });

    it("lists all user rights", () => {
      render(<Datenschutz />);

      const userRights = [
        "Auskunft:",
        "Berichtigung:",
        "Löschung:",
        "Einschränkung:",
        "Datenübertragbarkeit:",
        "Widerspruch:",
        "Beschwerde:",
      ];

      userRights.forEach((right) => {
        expect(screen.getByText(right)).toBeInTheDocument();
      });
    });

    it("contains detailed right descriptions", () => {
      render(<Datenschutz />);

      expect(
        screen.getByText(
          /Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Sie können die Berichtigung unrichtiger oder unvollständiger Daten verlangen/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Sie können die Löschung Ihrer personenbezogenen Daten verlangen/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Data Security", () => {
    it("displays data security section", () => {
      render(<Datenschutz />);

      expect(screen.getByText("9. Datensicherheit")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren/,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText(/256 Bit Verschlüsselung/)).toBeInTheDocument();
    });
  });

  describe("Updates and Changes", () => {
    it("displays policy updates section", () => {
      render(<Datenschutz />);

      expect(
        screen.getByText(
          "10. Aktualität und Änderung dieser Datenschutzerklärung",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Februar 2026/,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("Contact for Privacy Matters", () => {
    it("displays privacy contact section", () => {
      render(<Datenschutz />);

      expect(screen.getByText("11. Kontakt")).toBeInTheDocument();
      expect(
        screen.getByText(
          /Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten/,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(/mail\(at\)nico-kuechler\.de/)[0],
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(/\+49 \(0\)171 8168164/)[0],
      ).toBeInTheDocument();
    });
  });

  it("has proper semantic structure", () => {
    render(<Datenschutz />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");
    const cvSections = document.querySelectorAll(".cv-section");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
    expect(cvSections.length).toBeGreaterThan(0);
  });

  it("all sections have numbered headings", () => {
    render(<Datenschutz />);

    const numberedSections = [
      "1. Verantwortlicher",
      "2. Allgemeine Hinweise zur Datenverarbeitung",
      "3. Kontakt mit uns",
      "4. Server-Log-Dateien",
      "5. Cookies",
      "6. Externe Dienste",
      "7. Google Analytics 4",
      "8. Ihre Rechte",
      "9. Datensicherheit",
      "10. Aktualität und Änderung dieser Datenschutzerklärung",
      "11. Kontakt",
    ];

    numberedSections.forEach((section) => {
      expect(screen.getByText(section)).toBeInTheDocument();
    });
  });

  it("contains GDPR compliance references", () => {
    render(<Datenschutz />);

    expect(screen.getAllByText(/DSGVO/)[0]).toBeInTheDocument();
    expect(
      screen.getAllByText(/Art. 6 Abs. 1 lit. f DSGVO/)[0],
    ).toBeInTheDocument();
    expect(screen.getByText(/Datenschutz-Grundverordnung/)).toBeInTheDocument();
  });

  it("includes ProfileCard component", () => {
    render(<Datenschutz />);

    const profileCard = screen.getByTestId("profile-card");
    expect(profileCard).toBeInTheDocument();
  });

  it("contains business address information", () => {
    render(<Datenschutz />);

    // Check for address parts individually
    expect(screen.getByText(/Wilhelm-Busch-Weg 22/)).toBeInTheDocument();
    expect(screen.getByText(/82216 Maisach/)).toBeInTheDocument();
    expect(screen.getByText(/Deutschland/)).toBeInTheDocument();
  });

  it("sections are properly structured with cv-section class", () => {
    render(<Datenschutz />);

    const cvSections = document.querySelectorAll(".cv-section");
    expect(cvSections.length).toBe(11); // Total number of privacy policy sections (including Google Analytics 4)

    cvSections.forEach((section) => {
      const heading = section.querySelector("h4");
      expect(heading).toBeInTheDocument();
    });
  });

  it("contains user rights list with proper structure", () => {
    render(<Datenschutz />);

    // Get the user rights list (the one in "Ihre Rechte" section with 7 items)
    const cvSections = document.querySelectorAll(".cv-section");
    // Section 8 (index 7) is "Ihre Rechte"
    const userRightsSection = cvSections[7];
    const userRightsList =
      userRightsSection?.querySelector(".cv-certifications");
    expect(userRightsList).toBeInTheDocument();

    const listItems = userRightsList?.querySelectorAll("li");
    expect(listItems?.length).toBe(7); // Total number of user rights (including Beschwerde)
  });
});
