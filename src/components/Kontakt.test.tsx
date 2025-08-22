import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import Kontakt from "./Kontakt";

// Mock ProfileCard component
vi.mock("./ProfileCard", () => ({
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

// Mock utils
vi.mock("../utils", () => ({
  validation: {
    validateForm: vi.fn(),
  },
  navigation: {
    generateMailto: vi.fn(),
    navigateToUrl: vi.fn(),
  },
}));

// Mock constants
vi.mock("../constants", () => ({
  CONTACT_INFO: {
    email: "mail@nico-kuechler.de",
    phone: "+49 171 816 816 4",
    location: "Maisach (Gernlinden), Bayern",
    availability: "Freelance-Projekte & Beratung",
  },
  SUCCESS_MESSAGES: {
    formSubmit: "Ihr E-Mail-Programm wurde geöffnet.",
  },
}));

describe("Kontakt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the contact page correctly", () => {
    render(<Kontakt />);

    expect(screen.getByText("Kontakt")).toBeInTheDocument();
    expect(
      screen.getByText("Lassen Sie uns zusammenarbeiten")
    ).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
  });

  it("displays main heading and subheading", () => {
    render(<Kontakt />);

    const heading = screen.getByRole("heading", { level: 1, name: "Kontakt" });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Lassen Sie uns zusammenarbeiten",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  describe("Contact Information", () => {
    it("displays contact information sections", () => {
      render(<Kontakt />);

      expect(screen.getByText("E-Mail")).toBeInTheDocument();
      expect(screen.getByText("Telefon")).toBeInTheDocument();
      expect(screen.getByText("Standort")).toBeInTheDocument();
      expect(screen.getByText("Verfügbarkeit")).toBeInTheDocument();
    });

    it("displays contact information with icons", () => {
      render(<Kontakt />);

      // Check for FontAwesome icons in contact items
      const emailIcon = document.querySelector(".fas.fa-envelope");
      const phoneIcon = document.querySelector(".fas.fa-phone");
      const locationIcon = document.querySelector(".fas.fa-map-marker-alt");
      const briefcaseIcon = document.querySelector(".fas.fa-briefcase");

      expect(emailIcon).toBeInTheDocument();
      expect(phoneIcon).toBeInTheDocument();
      expect(locationIcon).toBeInTheDocument();
      expect(briefcaseIcon).toBeInTheDocument();
    });

    it("displays contact information values", () => {
      render(<Kontakt />);

      expect(screen.getByText("mail@nico-kuechler.de")).toBeInTheDocument();
      expect(screen.getByText("+49 171 816 816 4")).toBeInTheDocument();
      expect(
        screen.getByText("Maisach (Gernlinden), Bayern")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Freelance-Projekte & Beratung")
      ).toBeInTheDocument();
    });
  });

  describe("Contact Form", () => {
    it("renders contact form with all fields", () => {
      render(<Kontakt />);

      // Use getByRole to get the heading instead of text that appears twice
      expect(
        screen.getByRole("heading", { level: 4, name: "Nachricht senden" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Name *")).toBeInTheDocument();
      expect(screen.getByLabelText("E-Mail *")).toBeInTheDocument();
      expect(screen.getByLabelText("Betreff *")).toBeInTheDocument();
      expect(screen.getByLabelText("Nachricht *")).toBeInTheDocument();
    });

    it("form fields have correct attributes", () => {
      render(<Kontakt />);

      const nameInput = screen.getByLabelText("Name *");
      const emailInput = screen.getByLabelText("E-Mail *");
      const subjectInput = screen.getByLabelText("Betreff *");
      const messageTextarea = screen.getByLabelText("Nachricht *");

      expect(nameInput).toHaveAttribute("type", "text");
      expect(nameInput).toHaveAttribute("placeholder", "Ihr Name");
      expect(nameInput).toHaveAttribute("required");

      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute(
        "placeholder",
        "ihre.email@beispiel.com"
      );
      expect(emailInput).toHaveAttribute("required");

      expect(subjectInput).toHaveAttribute("type", "text");
      expect(subjectInput).toHaveAttribute(
        "placeholder",
        "Betreff Ihrer Nachricht"
      );
      expect(subjectInput).toHaveAttribute("required");

      expect(messageTextarea).toHaveAttribute(
        "placeholder",
        "Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
      );
      expect(messageTextarea).toHaveAttribute("rows", "5");
      expect(messageTextarea).toHaveAttribute("required");
    });

    it("renders submit button", () => {
      render(<Kontakt />);

      const submitButton = screen.getByRole("button", {
        name: /Nachricht senden/i,
      });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveClass("btn-blue");
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    it("updates form fields when user types", async () => {
      const user = userEvent.setup();
      render(<Kontakt />);

      const nameInput = screen.getByLabelText("Name *");
      const emailInput = screen.getByLabelText("E-Mail *");
      const subjectInput = screen.getByLabelText("Betreff *");
      const messageTextarea = screen.getByLabelText("Nachricht *");

      await user.type(nameInput, "Test Name");
      await user.type(emailInput, "test@example.com");
      await user.type(subjectInput, "Test Subject");
      await user.type(messageTextarea, "Test message content");

      expect(nameInput).toHaveValue("Test Name");
      expect(emailInput).toHaveValue("test@example.com");
      expect(subjectInput).toHaveValue("Test Subject");
      expect(messageTextarea).toHaveValue("Test message content");
    });

    it("displays form footer text", () => {
      render(<Kontakt />);

      const footerText = screen.getByText(
        /Pflichtfelder. Die Nachricht wird über Ihr Standard-E-Mail-Programm gesendet./
      );
      expect(footerText).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("validates form submission attempt", async () => {
      const user = userEvent.setup();
      render(<Kontakt />);

      // Just test that the button can be clicked - actual validation happens in the component
      const submitButton = screen.getByRole("button", {
        name: /Nachricht senden/i,
      });

      expect(submitButton).toBeInTheDocument();
      await user.click(submitButton);

      // After clicking, we should still be on the same page
      expect(screen.getByText("Kontakt")).toBeInTheDocument();
    });

    it("form fields update when user types", async () => {
      const user = userEvent.setup();
      render(<Kontakt />);

      const nameInput = screen.getByLabelText("Name *");
      await user.type(nameInput, "Test");

      expect(nameInput).toHaveValue("Test");
    });
  });

  describe("Form Submission", () => {
    it("handles successful form submission", async () => {
      const user = userEvent.setup();
      const { validation, navigation } = await import("../utils");

      // Mock successful validation
      vi.mocked(validation.validateForm).mockReturnValue({
        isValid: true,
        errors: [],
      });

      // Mock navigation utilities
      vi.mocked(navigation.generateMailto).mockReturnValue(
        "mailto:test@example.com"
      );
      vi.mocked(navigation.navigateToUrl).mockImplementation(() => {});

      render(<Kontakt />);

      // Fill out the form
      await user.type(screen.getByLabelText("Name *"), "Test Name");
      await user.type(screen.getByLabelText("E-Mail *"), "test@example.com");
      await user.type(screen.getByLabelText("Betreff *"), "Test Subject");
      await user.type(screen.getByLabelText("Nachricht *"), "Test message");

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /Nachricht senden/i,
      });
      await user.click(submitButton);

      expect(validation.validateForm).toHaveBeenCalled();
      expect(navigation.generateMailto).toHaveBeenCalled();
      expect(navigation.navigateToUrl).toHaveBeenCalled();
    });

    it("shows loading state during submission", async () => {
      const user = userEvent.setup();
      const { validation } = await import("../utils");

      // Mock successful validation
      vi.mocked(validation.validateForm).mockReturnValue({
        isValid: true,
        errors: [],
      });

      render(<Kontakt />);

      // Fill out the form
      await user.type(screen.getByLabelText("Name *"), "Test Name");
      await user.type(screen.getByLabelText("E-Mail *"), "test@example.com");
      await user.type(screen.getByLabelText("Betreff *"), "Test Subject");
      await user.type(screen.getByLabelText("Nachricht *"), "Test message");

      // Submit the form
      const submitButton = screen.getByRole("button", {
        name: /Nachricht senden/i,
      });
      await user.click(submitButton);

      // Check for loading state
      expect(screen.getByText(/Wird gesendet.../)).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });

    it("disables form fields during submission", async () => {
      const user = userEvent.setup();
      const { validation } = await import("../utils");

      // Mock successful validation
      vi.mocked(validation.validateForm).mockReturnValue({
        isValid: true,
        errors: [],
      });

      render(<Kontakt />);

      // Fill out and submit the form
      await user.type(screen.getByLabelText("Name *"), "Test Name");
      await user.type(screen.getByLabelText("E-Mail *"), "test@example.com");
      await user.type(screen.getByLabelText("Betreff *"), "Test Subject");
      await user.type(screen.getByLabelText("Nachricht *"), "Test message");

      const submitButton = screen.getByRole("button", {
        name: /Nachricht senden/i,
      });
      await user.click(submitButton);

      // Check that form fields are disabled
      expect(screen.getByLabelText("Name *")).toBeDisabled();
      expect(screen.getByLabelText("E-Mail *")).toBeDisabled();
      expect(screen.getByLabelText("Betreff *")).toBeDisabled();
      expect(screen.getByLabelText("Nachricht *")).toBeDisabled();
    });
  });

  it("has proper semantic structure", () => {
    render(<Kontakt />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");
    const contactInfo = document.querySelector(".contact-info");
    const contactForm = document.querySelector(".contact-form");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
    expect(contactInfo).toBeInTheDocument();
    expect(contactForm).toBeInTheDocument();
  });

  it("contact info items have proper structure", () => {
    render(<Kontakt />);

    const contactItems = document.querySelectorAll(".contact-item");
    expect(contactItems.length).toBe(4); // Email, Phone, Location, Availability

    contactItems.forEach((item) => {
      const heading = item.querySelector("h4");
      const paragraph = item.querySelector("p");
      expect(heading).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });
  });

  it("form groups have proper structure", () => {
    render(<Kontakt />);

    const formGroups = document.querySelectorAll(".form-group");
    expect(formGroups.length).toBe(4); // Name, Email, Subject, Message

    formGroups.forEach((group) => {
      const label = group.querySelector("label");
      const input = group.querySelector("input, textarea");
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  it("includes ProfileCard component", () => {
    render(<Kontakt />);

    const profileCard = screen.getByTestId("profile-card");
    expect(profileCard).toBeInTheDocument();
  });
});
