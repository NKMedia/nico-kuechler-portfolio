import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { getRouteMeta } from "./routes";
import { renderRouteHtml } from "./renderRouteHtml";

// Pass a plain variable: Vite rewrites `new URL(<string or template literal>,
// import.meta.url)` into an asset URL, which readFileSync cannot open.
const fromRoot = (file: string): URL => {
  const relativePath = "../../" + file;
  return new URL(relativePath, import.meta.url);
};

// Use the real index.html so the replacements are tested against the
// actual markup (multi-line tags, attribute order).
const INDEX_HTML = readFileSync(fromRoot("index.html"), "utf8");

function attr(html: string, selector: RegExp): string | undefined {
  return html.match(selector)?.[1];
}

describe("renderRouteHtml", () => {
  const meta = getRouteMeta("/lebenslauf");
  const html = renderRouteHtml(INDEX_HTML, meta);

  it("sets the page title", () => {
    expect(html).toMatch(/<title>Lebenslauf \| Nico Küchler/);
    expect(html.match(/<title>/g)).toHaveLength(1);
  });

  it("sets the meta description", () => {
    expect(attr(html, /<meta\s+name="description"\s+content="([^"]*)"/)).toBe(
      meta.description,
    );
  });

  it("points canonical, og:url and twitter:url at the page itself", () => {
    const url = "https://nico-kuechler.de/lebenslauf";

    expect(attr(html, /<link\s+rel="canonical"\s+href="([^"]*)"/)).toBe(url);
    expect(attr(html, /<meta\s+property="og:url"\s+content="([^"]*)"/)).toBe(
      url,
    );
    expect(attr(html, /<meta\s+name="twitter:url"\s+content="([^"]*)"/)).toBe(
      url,
    );
  });

  it("sets Open Graph and Twitter title and description", () => {
    expect(
      attr(html, /<meta\s+property="og:description"\s+content="([^"]*)"/),
    ).toBe(meta.description);
    expect(
      attr(html, /<meta\s+name="twitter:description"\s+content="([^"]*)"/),
    ).toBe(meta.description);
    expect(
      attr(html, /<meta\s+property="og:title"\s+content="([^"]*)"/),
    ).toContain("Lebenslauf");
    expect(
      attr(html, /<meta\s+name="twitter:title"\s+content="([^"]*)"/),
    ).toContain("Lebenslauf");
  });

  it("escapes HTML special characters in values", () => {
    // Titles contain "Developer & Media Designer"
    expect(html).toMatch(/<title>[^<]*&amp;[^<]*<\/title>/);
    expect(html).not.toMatch(/<title>[^<]*& [^<]*<\/title>/);
  });

  it("keeps index, follow for indexable pages", () => {
    expect(attr(html, /<meta\s+name="robots"\s+content="([^"]*)"/)).toBe(
      "index, follow",
    );
  });

  it("sets noindex for pages that must not be indexed", () => {
    const notFound = renderRouteHtml(INDEX_HTML, getRouteMeta("/nope"));
    expect(attr(notFound, /<meta\s+name="robots"\s+content="([^"]*)"/)).toBe(
      "noindex, follow",
    );
  });

  it("leaves structured data and the app entry untouched", () => {
    expect(html).toContain('"@type": "Person"');
    expect(html).toContain('src="/src/main.tsx"');
  });

  it("throws when a required tag is missing instead of shipping stale meta", () => {
    const broken = INDEX_HTML.replace(/<link\s+rel="canonical"[^>]*>/, "");
    expect(() => renderRouteHtml(broken, meta)).toThrow(/canonical/);
  });
});
