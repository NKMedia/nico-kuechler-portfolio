import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "./routes";
import { writeRouteHtmlFiles } from "./prerender";

// Pass a plain variable: Vite rewrites `new URL(<string or template literal>,
// import.meta.url)` into an asset URL, which fileURLToPath cannot convert.
const fromRoot = (file: string): URL => {
  const relativePath = "../../" + file;
  return new URL(relativePath, import.meta.url);
};

const INDEX_HTML_PATH = fileURLToPath(fromRoot("index.html"));

function canonicalOf(file: string): string | undefined {
  return readFileSync(file, "utf8").match(
    /<link\s+rel="canonical"\s+href="([^"]*)"/,
  )?.[1];
}

describe("writeRouteHtmlFiles", () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(join(tmpdir(), "seo-prerender-"));
    copyFileSync(INDEX_HTML_PATH, join(outDir, "index.html"));
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
  });

  it("writes one HTML file per sub page with its own canonical URL", () => {
    writeRouteHtmlFiles(outDir);

    for (const route of ROUTES.filter((r) => r.path !== "/")) {
      const file = join(outDir, `${route.path.slice(1)}.html`);
      expect(existsSync(file)).toBe(true);
      expect(canonicalOf(file)).toBe(`https://nico-kuechler.de${route.path}`);
    }
  });

  it("renders the home page meta into index.html", () => {
    writeRouteHtmlFiles(outDir);

    expect(canonicalOf(join(outDir, "index.html"))).toBe(
      "https://nico-kuechler.de/",
    );
    expect(readFileSync(join(outDir, "index.html"), "utf8")).toMatch(
      /<title>Über mich \|/,
    );
  });

  it("returns the written files", () => {
    const written = writeRouteHtmlFiles(outDir);
    expect(written).toHaveLength(ROUTES.length);
  });
});
