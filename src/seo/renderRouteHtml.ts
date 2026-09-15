import { canonicalUrl, type PageMeta } from "./routes";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const metaPattern = (key: "name" | "property", value: string): RegExp =>
  new RegExp(`<meta\\s+${key}="${value}"\\s+content="[^"]*"\\s*/?>`);

/**
 * Renders the SEO head tags (title, description, robots, canonical,
 * Open Graph, Twitter) of index.html for one route.
 *
 * Throws if a tag is missing, so a changed index.html fails the build
 * instead of silently shipping pages with the home page's meta.
 */
export function renderRouteHtml(html: string, meta: PageMeta): string {
  const url = escapeHtml(canonicalUrl(meta.path));
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const robots = meta.indexable ? "index, follow" : "noindex, follow";

  const tags: Array<[name: string, pattern: RegExp, replacement: string]> = [
    ["title", /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`],
    [
      "description",
      metaPattern("name", "description"),
      `<meta name="description" content="${description}" />`,
    ],
    [
      "robots",
      metaPattern("name", "robots"),
      `<meta name="robots" content="${robots}" />`,
    ],
    [
      "canonical",
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${url}" />`,
    ],
    [
      "og:url",
      metaPattern("property", "og:url"),
      `<meta property="og:url" content="${url}" />`,
    ],
    [
      "og:title",
      metaPattern("property", "og:title"),
      `<meta property="og:title" content="${title}" />`,
    ],
    [
      "og:description",
      metaPattern("property", "og:description"),
      `<meta property="og:description" content="${description}" />`,
    ],
    [
      "twitter:url",
      metaPattern("name", "twitter:url"),
      `<meta name="twitter:url" content="${url}" />`,
    ],
    [
      "twitter:title",
      metaPattern("name", "twitter:title"),
      `<meta name="twitter:title" content="${title}" />`,
    ],
    [
      "twitter:description",
      metaPattern("name", "twitter:description"),
      `<meta name="twitter:description" content="${description}" />`,
    ],
  ];

  return tags.reduce((output, [name, pattern, replacement]) => {
    if (!pattern.test(output)) {
      throw new Error(`renderRouteHtml: ${name} tag not found in index.html`);
    }
    return output.replace(pattern, () => replacement);
  }, html);
}
