/**
 * SEO metadata per route — single source of truth for document titles,
 * meta descriptions and canonical URLs. Used at runtime (RouteMeta), at
 * build time (prerendered route HTML) and mirrored by public/sitemap.xml
 * (kept in sync by sitemap.test.ts).
 *
 * Descriptions must only summarize content that is actually on the page.
 */

export const SITE_URL = "https://nico-kuechler.de";

const BASE_TITLE = "Nico Küchler - Senior Software Developer & Media Designer";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  indexable: boolean;
}

export const ROUTES: readonly PageMeta[] = [
  {
    path: "/",
    title: `Über mich | ${BASE_TITLE}`,
    description:
      "Nico Küchler, Senior Software Developer und Media Designer: React-Webanwendungen, VR/AR-Projekte und 3D-Konfiguratoren – zertifizierter Unity-Entwickler.",
    indexable: true,
  },
  {
    path: "/lebenslauf",
    title: `Lebenslauf | ${BASE_TITLE}`,
    description:
      "Lebenslauf von Nico Küchler: Berufserfahrung als Software Developer und Designer, Ausbildung, technische Fähigkeiten, Sprachen und Qualifikationen.",
    indexable: true,
  },
  {
    path: "/projekte",
    title: `Projekte | ${BASE_TITLE}`,
    description:
      "Ausgewählte Arbeiten von Nico Küchler: Softwarelösungen, Game Art für Ardem, die Lernplattform Neverknights sowie VR/AR- und 3D-Projekte.",
    indexable: true,
  },
  {
    path: "/kontakt",
    title: `Kontakt | ${BASE_TITLE}`,
    description:
      "Kontakt zu Nico Küchler für Freelance-Projekte und Beratung – per E-Mail, Telefon oder über das Kontaktformular.",
    indexable: true,
  },
  {
    path: "/impressum",
    title: `Impressum | ${BASE_TITLE}`,
    description:
      "Impressum von Nico Küchler Mediendesign: Angaben gemäß § 5 TMG, Kontaktdaten, Haftungshinweis, Marken und Copyright.",
    indexable: true,
  },
  {
    path: "/datenschutz",
    title: `Datenschutz | ${BASE_TITLE}`,
    description:
      "Datenschutzerklärung von nico-kuechler.de: Verantwortlicher, Server-Log-Dateien, Cookies, Google Analytics 4 und Ihre Rechte.",
    indexable: true,
  },
  {
    path: "/barrierefreiheit",
    title: `Barrierefreiheit | ${BASE_TITLE}`,
    description:
      "Erklärung zur Barrierefreiheit von nico-kuechler.de: Konformitätsstatus nach WCAG 2.1, umgesetzte Maßnahmen und Kontakt für Feedback.",
    indexable: true,
  },
];

const NOT_FOUND_META: Omit<PageMeta, "path"> = {
  title: `404 | ${BASE_TITLE}`,
  description: "Die angeforderte Seite existiert nicht oder wurde verschoben.",
  indexable: false,
};

/**
 * Returns the metadata for a pathname. Trailing slashes are ignored;
 * unknown paths get not-indexable 404 metadata for that path.
 */
export function getRouteMeta(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    ROUTES.find((route) => route.path === path) ?? { ...NOT_FOUND_META, path }
  );
}

/** Absolute canonical URL for a path ("/" keeps its trailing slash). */
export function canonicalUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
