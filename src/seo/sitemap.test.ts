import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { ROUTES, canonicalUrl } from "./routes";

const read = (relativePath: string): string =>
  readFileSync(new URL(relativePath, import.meta.url), "utf8");

describe("sitemap.xml and robots.txt", () => {
  it("lists exactly the indexable pages in the sitemap", () => {
    const sitemap = read("../../public/sitemap.xml");
    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

    expect(locs.sort()).toEqual(
      ROUTES.map((route) => canonicalUrl(route.path)).sort(),
    );
  });

  it("allows crawling and points robots.txt at the sitemap", () => {
    const robots = read("../../public/robots.txt");

    expect(robots).toMatch(/^User-agent: \*$/m);
    expect(robots).not.toMatch(/^Disallow: \/\s*$/m);
    expect(robots).toMatch(
      /^Sitemap: https:\/\/nico-kuechler\.de\/sitemap\.xml$/m,
    );
  });

  it("keeps the SEO route list in sync with the routes in App.tsx", () => {
    const app = read("../App.tsx");
    const appPaths = [...app.matchAll(/path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((path) => path !== "*");

    expect(appPaths.sort()).toEqual(ROUTES.map((route) => route.path).sort());
  });
});
