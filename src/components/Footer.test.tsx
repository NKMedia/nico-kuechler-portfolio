import { describe, it, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer correctly", () => {
    render(<Footer />);

    const footer = document.querySelector("footer.footer");
    expect(footer).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);

    const impressumLink = screen.getByRole("link", { name: "Impressum" });
    const datenschutzLink = screen.getByRole("link", { name: "Datenschutz" });

    expect(impressumLink).toBeInTheDocument();
    expect(datenschutzLink).toBeInTheDocument();

    expect(impressumLink).toHaveAttribute("href", "/impressum");
    expect(datenschutzLink).toHaveAttribute("href", "/datenschutz");
  });

  it("displays copyright text", () => {
    render(<Footer />);

    const copyrightText = screen.getByText("© 2025 Nico Küchler Mediendesign.");
    expect(copyrightText).toBeInTheDocument();
  });

  it("displays contact information", () => {
    render(<Footer />);

    // Phone section
    expect(screen.getByText("Telefon")).toBeInTheDocument();
    expect(screen.getByText("+49 (0)171 8168164")).toBeInTheDocument();

    // Email section
    expect(screen.getByText("E-Mail")).toBeInTheDocument();
    expect(screen.getByText("mail@nico-kuechler.de")).toBeInTheDocument();

    // Socials section
    expect(screen.getByText("Socials")).toBeInTheDocument();
  });

  it("renders social media links with correct attributes", () => {
    render(<Footer />);

    // Email link
    const emailLink = screen.getByLabelText("E-Mail");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:mail@nico-kuechler.de");
    expect(emailLink).toHaveAttribute("title", "E-Mail senden");

    // LinkedIn link
    const linkedinLink = screen.getByLabelText("LinkedIn");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nico-kuechler-9337a762/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedinLink).toHaveAttribute("title", "LinkedIn Profil");

    // GitHub link
    const githubLink = screen.getByLabelText("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/levoram");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink).toHaveAttribute("title", "GitHub Profil");
  });

  it("renders correct social media icons", () => {
    render(<Footer />);

    const emailIcon = screen
      .getByLabelText("E-Mail")
      .querySelector("i.fas.fa-envelope");
    const linkedinIcon = screen
      .getByLabelText("LinkedIn")
      .querySelector("i.fab.fa-linkedin-in");
    const githubIcon = screen
      .getByLabelText("GitHub")
      .querySelector("i.fab.fa-github");

    expect(emailIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
  });

  it("has proper layout structure", () => {
    render(<Footer />);

    const footerLeft = document.querySelector(".footer-left");
    const footerRight = document.querySelector(".footer-right");
    const footerContact = document.querySelector(".footer-contact");

    expect(footerLeft).toBeInTheDocument();
    expect(footerRight).toBeInTheDocument();
    expect(footerContact).toBeInTheDocument();
  });

  it("legal links have correct CSS classes", () => {
    render(<Footer />);

    const impressumLink = screen.getByRole("link", { name: "Impressum" });
    const datenschutzLink = screen.getByRole("link", { name: "Datenschutz" });

    expect(impressumLink).toHaveClass("footer-link");
    expect(datenschutzLink).toHaveClass("footer-link");
  });

  it("copyright text has correct CSS class", () => {
    render(<Footer />);

    const copyrightElement = document.querySelector(".footer-copyright");
    expect(copyrightElement).toBeInTheDocument();
    expect(copyrightElement).toHaveTextContent(
      "© 2025 Nico Küchler Mediendesign."
    );
  });

  it("contact information is properly structured", () => {
    render(<Footer />);

    const contactDiv = document.querySelector(".footer-contact");
    expect(contactDiv).toBeInTheDocument();

    // Check that contact sections are present
    const boldElements = contactDiv?.querySelectorAll("b");
    expect(boldElements).toHaveLength(3); // Telefon, E-Mail, Socials
  });

  it("has accessible external link attributes", () => {
    render(<Footer />);

    const externalLinks = [
      screen.getByLabelText("LinkedIn"),
      screen.getByLabelText("GitHub"),
    ];

    for (const link of externalLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("contains all expected contact methods", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link");
    // 3 legal links + 3 social links = 6 total links (added Barrierefreiheit link)
    expect(links).toHaveLength(6);
  });

  it("displays contact information in the right section", () => {
    render(<Footer />);

    const footerRight = document.querySelector(".footer-right");
    expect(footerRight).toContainElement(screen.getByText("Telefon"));
    expect(footerRight).toContainElement(screen.getByText("E-Mail"));
    expect(footerRight).toContainElement(screen.getByText("Socials"));
  });
});
