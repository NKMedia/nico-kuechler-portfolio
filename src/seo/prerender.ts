import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROUTES } from "./routes";
import { renderRouteHtml } from "./renderRouteHtml";

/**
 * Writes one static HTML file per route into the build output, so crawlers
 * and link previews that don't run JavaScript see the right meta tags.
 *
 * "/" is rendered into index.html, "/lebenslauf" into lebenslauf.html —
 * served for /lebenslauf by the rewrite rule in public/.htaccess.
 *
 * @returns the written file paths
 */
export function writeRouteHtmlFiles(outDir: string): string[] {
  const indexPath = join(outDir, "index.html");
  const template = readFileSync(indexPath, "utf8");

  return ROUTES.map((route) => {
    const file =
      route.path === "/"
        ? indexPath
        : join(outDir, `${route.path.slice(1)}.html`);
    writeFileSync(file, renderRouteHtml(template, route));
    return file;
  });
}
