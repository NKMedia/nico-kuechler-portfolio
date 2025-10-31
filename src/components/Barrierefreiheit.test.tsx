import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Barrierefreiheit from "./Barrierefreiheit";

describe("Barrierefreiheit Component", () => {
  it("renders the accessibility declaration with correct layout", () => {
    render(<Barrierefreiheit />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Erklärung zur Barrierefreiheit"
    );

    // Check that it uses the same layout structure as other legal pages
    expect(
      screen.getByText("WCAG 2.1 Level AA Konformität")
    ).toBeInTheDocument();
  });

  it("displays WCAG compliance information", () => {
    render(<Barrierefreiheit />);

    expect(screen.getAllByText(/WCAG 2.1 Level AA/)).toHaveLength(3); // Multiple occurrences
    expect(screen.getByText(/weitgehend konform/)).toBeInTheDocument(); // Single occurrence
  });

  it("lists implemented accessibility measures with proper headings", () => {
    render(<Barrierefreiheit />);

    expect(
      screen.getByRole("heading", { name: "Wahrnehmbarkeit (Perceivable)" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bedienbarkeit (Operable)" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Verständlichkeit (Understandable)" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Robustheit (Robust)" })
    ).toBeInTheDocument();
  });

  it("provides contact information", () => {
    render(<Barrierefreiheit />);

    expect(screen.getAllByText("Nico Küchler")).toHaveLength(2); // ProfileCard + Contact section
    expect(
      screen.getByRole("link", { name: /mail@nico-kuechler.de/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /\+49 171 816 816 4/ })
    ).toBeInTheDocument();
  });

  it("displays evaluation date", () => {
    render(<Barrierefreiheit />);

    expect(screen.getAllByText(/31\. Oktober 2024/)).toHaveLength(3); // Multiple occurrences of date
  });

  it("has proper heading hierarchy", () => {
    render(<Barrierefreiheit />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    const h3Elements = screen.getAllByRole("heading", { level: 3 });

    expect(h1).toBeInTheDocument();
    expect(h2Elements.length).toBeGreaterThan(0);
    expect(h3Elements.length).toBeGreaterThan(0);
  });

  it("contains accessibility feature descriptions", () => {
    render(<Barrierefreiheit />);

    expect(screen.getByText(/Skip-Links/)).toBeInTheDocument();
    expect(screen.getAllByText(/Fokusindikatoren/)).toHaveLength(2); // Multiple occurrences
    expect(screen.getAllByText(/Tastaturnavigation/)).toHaveLength(2); // Multiple occurrences
    expect(screen.getByText(/ARIA-Attribute/)).toBeInTheDocument();
  });

  it("mentions technical implementations", () => {
    render(<Barrierefreiheit />);

    expect(screen.getAllByText(/aria-label/)).toHaveLength(2);
    expect(screen.getByText(/aria-expanded/)).toBeInTheDocument();
    expect(screen.getByText(/aria-current/)).toBeInTheDocument();
  });
});
