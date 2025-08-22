import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import userEvent from "@testing-library/user-event";
import About from "./About";

// Mock react-router-dom navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock ProfileCard component
vi.mock("./ProfileCard", () => ({
  default: () => <div data-testid="profile-card">Profile Card</div>,
}));

describe("About", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the about page correctly", () => {
    render(<About />);

    expect(screen.getByText("Hallo")).toBeInTheDocument();
    expect(screen.getByText("Wer ich bin & was ich mache")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
  });

  it("displays the main heading and subheading", () => {
    render(<About />);

    const heading = screen.getByRole("heading", { level: 1, name: "Hallo" });
    const subheading = screen.getByRole("heading", {
      level: 3,
      name: "Wer ich bin & was ich mache",
    });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  it("displays the profile description text", () => {
    render(<About />);

    const descriptionText = screen.getByText(/Ich bin Nico Küchler/);
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText).toHaveTextContent(
      "Senior Software Developer und Media Designer"
    );
    expect(descriptionText).toHaveTextContent("Flughafen München");
  });

  it("renders navigation buttons", () => {
    render(<About />);

    const lebenslaufButton = screen.getByRole("button", {
      name: "LEBENSLAUF",
    });
    const projekteButton = screen.getByRole("button", { name: "PROJEKTE" });

    expect(lebenslaufButton).toBeInTheDocument();
    expect(projekteButton).toBeInTheDocument();
  });

  it("has correct button styles", () => {
    render(<About />);

    const lebenslaufButton = screen.getByRole("button", {
      name: "LEBENSLAUF",
    });
    const projekteButton = screen.getByRole("button", { name: "PROJEKTE" });

    expect(lebenslaufButton).toHaveClass("btn-blue");
    expect(projekteButton).toHaveClass("btn-outline");
  });

  it("navigates to lebenslauf when LEBENSLAUF button is clicked", async () => {
    const user = userEvent.setup();
    render(<About />);

    const lebenslaufButton = screen.getByRole("button", {
      name: "LEBENSLAUF",
    });
    await user.click(lebenslaufButton);

    expect(mockNavigate).toHaveBeenCalledWith("/lebenslauf");
  });

  it("navigates to projekte when PROJEKTE button is clicked", async () => {
    const user = userEvent.setup();
    render(<About />);

    const projekteButton = screen.getByRole("button", { name: "PROJEKTE" });
    await user.click(projekteButton);

    expect(mockNavigate).toHaveBeenCalledWith("/projekte");
  });

  it("has proper content structure", () => {
    render(<About />);

    const contentDiv = document.querySelector(".content");
    const profileMain = document.querySelector(".profile-main");
    const profileButtons = document.querySelector(".profile-buttons");
    const profileDesc = document.querySelector(".profile-desc");

    expect(contentDiv).toBeInTheDocument();
    expect(profileMain).toBeInTheDocument();
    expect(profileButtons).toBeInTheDocument();
    expect(profileDesc).toBeInTheDocument();
  });

  it("contains key professional information", () => {
    render(<About />);

    const text = screen.getByText(/Ich bin Nico Küchler/);
    expect(text).toHaveTextContent("über 10 Jahren Erfahrung");
    expect(text).toHaveTextContent("React-Webanwendungen");
    expect(text).toHaveTextContent("VR/AR-Projekte");
    expect(text).toHaveTextContent("3D-Konfiguratoren");
    expect(text).toHaveTextContent("Unity-Entwickler");
  });

  it("integrates ProfileCard component", () => {
    render(<About />);

    const profileCard = screen.getByTestId("profile-card");
    expect(profileCard).toBeInTheDocument();
  });
});
