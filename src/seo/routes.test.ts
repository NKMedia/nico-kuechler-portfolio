import { describe, it, expect } from "vitest";
import { ROUTES, SITE_URL, canonicalUrl, getRouteMeta } from "./routes";

describe("SEO routes", () => {
  it("lists every page exactly once", () => {
    const paths = ROUTES.map((route) => route.path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/lebenslauf",
        "/projekte",
        "/kontakt",
        "/impressum",
        "/datenschutz",
        "/barrierefreiheit",
      ]),
    );
  });

  it("gives every page a unique title", () => {
    const titles = ROUTES.map((route) => route.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("gives every page a unique description of search-result length", () => {
    const descriptions = ROUTES.map((route) => route.description);
    expect(new Set(descriptions).size).toBe(descriptions.length);

    for (const description of descriptions) {
      expect(description.length).toBeGreaterThanOrEqual(50);
      expect(description.length).toBeLessThanOrEqual(160);
    }
  });

  it("resolves known paths, with or without trailing slash", () => {
    expect(getRouteMeta("/projekte").path).toBe("/projekte");
    expect(getRouteMeta("/projekte/").path).toBe("/projekte");
    expect(getRouteMeta("/").path).toBe("/");
  });

  it("marks unknown paths as not indexable 404", () => {
    const meta = getRouteMeta("/gibt-es-nicht");

    expect(meta.indexable).toBe(false);
    expect(meta.title).toContain("404");
  });

  it("marks all known pages as indexable", () => {
    for (const route of ROUTES) {
      expect(getRouteMeta(route.path).indexable).toBe(true);
    }
  });

  it("builds canonical URLs without trailing slash except for the home page", () => {
    expect(SITE_URL).toBe("https://nico-kuechler.de");
    expect(canonicalUrl("/")).toBe("https://nico-kuechler.de/");
    expect(canonicalUrl("/lebenslauf")).toBe(
      "https://nico-kuechler.de/lebenslauf",
    );
  });
});
