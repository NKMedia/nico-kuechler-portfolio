import { describe, it, expect } from "vitest";
import { render, screen } from "../test/test-utils";
import ProfileCard from "./ProfileCard";

describe("ProfileCard", () => {
  it("renders profile information correctly", () => {
    render(<ProfileCard />);

    expect(screen.getByText("Nico Küchler")).toBeInTheDocument();
    expect(
      screen.getByText("SENIOR SOFTWARE DEVELOPER & MEDIA DESIGNER")
    ).toBeInTheDocument();
  });

  it("displays profile image with correct alt text", () => {
    render(<ProfileCard />);

    const profileImage = screen.getByAltText("Nico Küchler");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveClass("profile-img");
  });

  it("renders social media links with correct attributes", () => {
    render(<ProfileCard />);

    // Email link
    const emailLink = screen.getByLabelText("E-Mail");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:mail@nico-kuechler.de");
    expect(emailLink).toHaveAttribute("title", "E-Mail senden");

    // Phone link
    const phoneLink = screen.getByLabelText("Telefon");
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:+491718168164");
    expect(phoneLink).toHaveAttribute("title", "Anrufen");

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
    render(<ProfileCard />);

    const emailIcon = screen
      .getByLabelText("E-Mail")
      .querySelector("i.fas.fa-envelope");
    const phoneIcon = screen
      .getByLabelText("Telefon")
      .querySelector("i.fas.fa-phone");
    const linkedinIcon = screen
      .getByLabelText("LinkedIn")
      .querySelector("i.fab.fa-linkedin-in");
    const githubIcon = screen
      .getByLabelText("GitHub")
      .querySelector("i.fab.fa-github");

    expect(emailIcon).toBeInTheDocument();
    expect(phoneIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<ProfileCard />);

    const profileCard = document.querySelector(".profile-card");
    const profileInfo = document.querySelector(".profile-info");
    const profileRole = document.querySelector(".profile-role");
    const profileSocials = document.querySelector(".profile-socials");
    const profileHr = document.querySelector(".profile-hr");

    expect(profileCard).toBeInTheDocument();
    expect(profileInfo).toBeInTheDocument();
    expect(profileRole).toBeInTheDocument();
    expect(profileSocials).toBeInTheDocument();
    expect(profileHr).toBeInTheDocument();
  });

  it("renders name as heading", () => {
    render(<ProfileCard />);

    const nameHeading = screen.getByRole("heading", {
      level: 2,
      name: "Nico Küchler",
    });
    expect(nameHeading).toBeInTheDocument();
  });

  it("contains all contact links", () => {
    render(<ProfileCard />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4); // email, phone, linkedin, github
  });

  it("has accessible link attributes", () => {
    render(<ProfileCard />);

    const externalLinks = [
      screen.getByLabelText("LinkedIn"),
      screen.getByLabelText("GitHub"),
    ];

    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("renders profile image with correct source", () => {
    render(<ProfileCard />);

    const profileImage = screen.getByAltText("Nico Küchler");
    expect(profileImage).toHaveAttribute("src");
    // The actual src value contains the imported image path
    expect(profileImage.getAttribute("src")).toBeTruthy();
  });
});
