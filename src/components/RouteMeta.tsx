import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalUrl, getRouteMeta } from "../seo/routes";

/**
 * Sets an attribute on a head element, creating the element if it is missing.
 */
function upsertHeadElement(
  selector: string,
  create: () => HTMLElement,
  attribute: string,
  value: string,
): void {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setMeta(key: "name" | "property", keyValue: string, value: string) {
  upsertHeadElement(
    `meta[${key}="${keyValue}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute(key, keyValue);
      return meta;
    },
    "content",
    value,
  );
}

/**
 * Keeps the SEO head tags in sync with the current route during client-side
 * navigation: title, description, robots, canonical, Open Graph and Twitter.
 * The initial values come from the prerendered route HTML (see src/seo).
 *
 * Must be rendered inside the Router.
 *
 * @returns null - renders nothing
 */
function RouteMeta(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const url = canonicalUrl(meta.path);

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta(
      "name",
      "robots",
      meta.indexable ? "index, follow" : "noindex, follow",
    );
    upsertHeadElement(
      'link[rel="canonical"]',
      () => {
        const link = document.createElement("link");
        link.rel = "canonical";
        return link;
      },
      "href",
      url,
    );
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
  }, [pathname]);

  return null;
}

export default RouteMeta;
