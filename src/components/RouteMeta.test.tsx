import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Link } from "react-router-dom";
import RouteMeta from "./RouteMeta";
import { getRouteMeta } from "../seo/routes";

const content = (selector: string): string | null | undefined =>
  document.head.querySelector(selector)?.getAttribute("content");

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <RouteMeta />
      <Link to="/kontakt">Kontakt</Link>
    </MemoryRouter>,
  );
}

describe("RouteMeta", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("renders nothing", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <RouteMeta />
      </MemoryRouter>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("sets title, description and canonical URL for the current page", () => {
    renderAt("/lebenslauf");
    const meta = getRouteMeta("/lebenslauf");

    expect(document.title).toBe(meta.title);
    expect(content('meta[name="description"]')).toBe(meta.description);
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://nico-kuechler.de/lebenslauf");
  });

  it("updates Open Graph and Twitter tags for the current page", () => {
    renderAt("/projekte");
    const meta = getRouteMeta("/projekte");

    expect(content('meta[property="og:url"]')).toBe(
      "https://nico-kuechler.de/projekte",
    );
    expect(content('meta[property="og:title"]')).toBe(meta.title);
    expect(content('meta[property="og:description"]')).toBe(meta.description);
    expect(content('meta[name="twitter:url"]')).toBe(
      "https://nico-kuechler.de/projekte",
    );
    expect(content('meta[name="twitter:title"]')).toBe(meta.title);
    expect(content('meta[name="twitter:description"]')).toBe(meta.description);
  });

  it("marks unknown pages as noindex", () => {
    renderAt("/gibt-es-nicht");

    expect(document.title).toContain("404");
    expect(content('meta[name="robots"]')).toBe("noindex, follow");
  });

  it("restores index, follow after navigating from an unknown to a real page", () => {
    renderAt("/gibt-es-nicht");
    fireEvent.click(screen.getByRole("link", { name: "Kontakt" }));

    expect(document.title).toBe(getRouteMeta("/kontakt").title);
    expect(content('meta[name="robots"]')).toBe("index, follow");
    expect(document.head.querySelectorAll('meta[name="robots"]')).toHaveLength(
      1,
    );
  });
});
