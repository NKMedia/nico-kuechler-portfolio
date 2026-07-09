# Portfolio-Crosslinks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Projektkarten mit echten externen Belegen (Steam, itch.io, neverknights.de), korrigiertes JSON-LD `sameAs`, erweiterter About-Text.

**Architecture:** Projektdaten wandern aus dem JSX in ein typisiertes Array (`src/constants/projects.ts`); `Projekte.tsx` rendert per `map()`. Externe Links nutzen das bestehende `unifiedAnalytics.trackProjectInteraction`-API (Event `demo_click`) — kein neues Analytics-API. JSON-LD wird statisch in `index.html` korrigiert.

**Tech Stack:** React 19, TypeScript, Vite 8, Vitest + Testing Library, Font Awesome 6 (CDN).

## Global Constraints

- Alle externen Links: `target="_blank" rel="noopener noreferrer"`.
- UI-Sprache Deutsch (Umlaute korrekt), Code/Kommentare Englisch (bestehender Stil: JSDoc-Blöcke auf Englisch).
- Tests laufen mit `npx vitest run <datei>` (jsdom, globals aktiv).
- Tracking darf Navigation nie blockieren (native `<a href>`, Tracking nur im `onClick` nebenläufig).
- Exakte URLs:
  - Steam Ardem: `https://store.steampowered.com/app/2179480/Ardem/`
  - Neverknights: `https://www.neverknights.de/en/`
  - SnakeTris: `https://levoram.itch.io/snaketris-adventure`
  - itch.io-Profil: `https://levoram.itch.io/`
  - LinkedIn: `https://www.linkedin.com/in/nico-kuechler-9337a762/`
  - GitHub: `https://github.com/levoram`
  - Twitch: `https://www.twitch.tv/levoram`

---

### Task 1: Projekt-Datenmodell + datengetriebenes Rendering

**Files:**
- Modify: `src/types/index.ts` (Typen ergänzen, ans Dateiende der Interface-Sektion)
- Create: `src/constants/projects.ts`
- Modify: `src/components/Projekte.tsx` (komplett ersetzen)
- Test: `src/components/Projekte.test.tsx`

**Interfaces:**
- Produces: `Project` / `ProjectLink` / `ProjectMeta` (types), `PROJECTS: Project[]` (constant), von Task 2 konsumiert.

- [ ] **Step 1: Failing Tests schreiben**

In `src/components/Projekte.test.tsx` den Test `"displays project grid with all project cards"` anpassen (6 → 8) und am Ende der äußeren `describe` diese neuen Blöcke ergänzen:

```tsx
  describe("Ardem Project", () => {
    it("displays Ardem card with Steam link", () => {
      render(<Projekte />);

      expect(screen.getByText("Ardem")).toBeInTheDocument();
      const card = screen.getByText("Ardem").closest(".project-card");
      expect(card).toHaveTextContent("Game Art");

      const steamLink = screen.getByRole("link", {
        name: /Auf Steam ansehen/,
      });
      expect(steamLink).toHaveAttribute(
        "href",
        "https://store.steampowered.com/app/2179480/Ardem/"
      );
    });
  });

  describe("Neverknights Project", () => {
    it("displays Neverknights card with website link", () => {
      render(<Projekte />);

      expect(screen.getByText("Neverknights")).toBeInTheDocument();
      const link = screen.getByRole("link", {
        name: /neverknights\.de besuchen/i,
      });
      expect(link).toHaveAttribute("href", "https://www.neverknights.de/en/");
    });
  });

  describe("itch.io Links", () => {
    it("displays SnakeTris and itch.io profile links on Mediendesign card", () => {
      render(<Projekte />);

      const snaketris = screen.getByRole("link", {
        name: /SnakeTris Adventure spielen/,
      });
      expect(snaketris).toHaveAttribute(
        "href",
        "https://levoram.itch.io/snaketris-adventure"
      );

      const profile = screen.getByRole("link", {
        name: /Alle Games auf itch\.io/,
      });
      expect(profile).toHaveAttribute("href", "https://levoram.itch.io/");
    });
  });

  it("all external project links are secure and open in new tab", () => {
    render(<Projekte />);

    const externalLinks = document.querySelectorAll(
      ".project-card a[href^='http']"
    );
    expect(externalLinks.length).toBeGreaterThanOrEqual(4);
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
```

- [ ] **Step 2: Tests laufen lassen — müssen fehlschlagen**

Run: `npx vitest run src/components/Projekte.test.tsx`
Expected: FAIL (8 statt 6 Karten; „Ardem" nicht gefunden).

- [ ] **Step 3: Typen ergänzen**

In `src/types/index.ts` nach den bestehenden Interface-Definitionen (vor der `Constants`-Sektion) einfügen:

```ts
// Project portfolio types
export interface ProjectLink {
  label: string;
  url: string;
  icon: string; // Font Awesome class, e.g. "fab fa-steam"
}

export interface ProjectMeta {
  label: string; // e.g. "Zeitraum", "Technologien", "Unternehmen"
  value: string;
}

export interface Project {
  id: string;
  title: string;
  meta: ProjectMeta[];
  description: string;
  links?: ProjectLink[];
}
```

- [ ] **Step 4: `src/constants/projects.ts` anlegen**

```ts
/**
 * Portfolio project data
 * Single source of truth for the Projekte page — add new projects here.
 */

import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "fmg",
    title: "Flughafen München - Softwarelösungen",
    meta: [
      { label: "Zeitraum", value: "2017 - heute" },
      { label: "Technologien", value: "React, Node.js, TypeScript, Figma" },
    ],
    description:
      "Konzeption und Entwicklung individueller Softwarelösungen für FMG, Tochtergesellschaften und Lufthansa. Schwerpunkt auf Webentwicklung, UI/UX Design und Einführung moderner Frontend-Tools.",
  },
  {
    id: "ardem",
    title: "Ardem",
    meta: [
      { label: "Release", value: "Early Access 2026 (Steam)" },
      { label: "Beitrag", value: "Game Art & Design" },
    ],
    description:
      "Mitwirkung an Game Art und Design für Ardem, ein Open-World-Survival-RPG mit 64 km² handgefertigter Spielwelt. Von Environment-Details bis zu visueller Gestaltung — mein kreativer Beitrag zu einem kommerziellen Steam-Titel.",
    links: [
      {
        label: "Auf Steam ansehen",
        url: "https://store.steampowered.com/app/2179480/Ardem/",
        icon: "fab fa-steam",
      },
    ],
  },
  {
    id: "neverknights",
    title: "Neverknights",
    meta: [
      { label: "Typ", value: "Eigene Lernplattform" },
      { label: "Themen", value: "Pixel Art, Color Theory, Game Art" },
    ],
    description:
      "Meine Tutorial-Plattform für Game Art: Pixel-Art-Grundlagen, Farbtheorie und Fundamentals — aufgebaut auf einem B.A. in Games & Animation. Mit kuratierter Fachbibliothek und Galerie eigener Environment-Arbeiten.",
    links: [
      {
        label: "neverknights.de besuchen",
        url: "https://www.neverknights.de/en/",
        icon: "fas fa-graduation-cap",
      },
    ],
  },
  {
    id: "vrar",
    title: "VR/AR Mixed Reality Projekte",
    meta: [
      { label: "Zeitraum", value: "2012 - heute" },
      { label: "Technologien", value: "Unity, C#, VR/AR SDKs" },
    ],
    description:
      "Entwicklung immersiver VR- und AR-Anwendungen für verschiedene Branchen. Von industriellen Trainingssimulatoren bis hin zu interaktiven Präsentationslösungen - Unity-zertifizierte Entwicklung.",
  },
  {
    id: "infogate",
    title: "3D Navigation Prototyp",
    meta: [
      { label: "Zeitraum", value: "2014 - 2016" },
      { label: "Unternehmen", value: "InfoGate Information Systems" },
      { label: "Technologien", value: "Unity, 3D Modeling, UI/UX Design" },
    ],
    description:
      "Entwicklung eines innovativen 3D-Navigationssystems für interaktive Informationssysteme. Kombination aus technischer Entwicklung und visueller Gestaltung.",
  },
  {
    id: "mediendesign",
    title: "Nico Küchler Mediendesign",
    meta: [
      { label: "Zeitraum", value: "2012 - heute" },
      { label: "Services", value: "Game Design, Videoproduktion, Fotografie" },
    ],
    description:
      "Selbstständige Tätigkeit mit Fokus auf 3D-Konfiguratoren, Game Design, professionelle Videoproduktion und Fotografie. Vollständige Projektbetreuung von der Konzeption bis zur Umsetzung.",
    links: [
      {
        label: "SnakeTris Adventure spielen",
        url: "https://levoram.itch.io/snaketris-adventure",
        icon: "fab fa-itch-io",
      },
      {
        label: "Alle Games auf itch.io",
        url: "https://levoram.itch.io/",
        icon: "fab fa-itch-io",
      },
    ],
  },
  {
    id: "nato",
    title: "Digitalisierung Fachbibliotheken",
    meta: [
      { label: "Zeitraum", value: "2005 - 2006" },
      { label: "Organisation", value: "NATO E3-A Verband" },
    ],
    description:
      "Projektleitung für die Digitalisierung militärischer Fachbibliotheken. Frühe Erfahrungen in der digitalen Transformation und Informationssystem-Management.",
  },
  {
    id: "webdesign",
    title: "Web- & Grafikdesign Projekte",
    meta: [
      { label: "Zeitraum", value: "2014 - heute" },
      { label: "Tools", value: "Adobe Creative Cloud, CAD, Video Editing" },
    ],
    description:
      "Vielfältige Projekte im Bereich Produktrenderings, CAD-Pläne, Werbevideos und Grafikdesign. Umfassende Expertise in der visuellen Kommunikation und Markenentwicklung.",
  },
];

export default PROJECTS;
```

- [ ] **Step 5: `Projekte.tsx` auf datengetriebenes Rendering umstellen**

Komplett ersetzen durch:

```tsx
import ProfileCard from "./ProfileCard";
import { PROJECTS } from "../constants/projects";

/**
 * Projekte component - Portfolio page displaying selected projects and work
 *
 * Features:
 * - Project cards rendered from PROJECTS data (src/constants/projects.ts)
 * - External proof links (Steam, itch.io, neverknights.de) per project
 * - Technology stacks and timeframes
 * - Responsive grid layout
 *
 * @returns Portfolio projects page component
 */
function Projekte(): React.ReactElement {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Projekte</h1>
        <h3>Ausgewählte Arbeiten & Entwicklungen</h3>

        <div className="project-grid">
          {PROJECTS.map((project) => (
            <div className="project-card" key={project.id}>
              <h4>{project.title}</h4>
              {project.meta.map((m) => (
                <p key={m.label}>
                  <strong>{m.label}:</strong> {m.value}
                </p>
              ))}
              <p>{project.description}</p>
              {project.links && (
                <p className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className={link.icon} aria-hidden="true" />{" "}
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projekte;
```

Hinweis: Bestehende Tests prüfen Texte wie `2017 - heute` als eigenen Textknoten via `getByText("2017 - heute")` — das funktioniert, weil `{m.value}` ein eigener Textknoten bleibt. Falls ein Alt-Test an `<strong>Zeitraum:</strong> `-Formatierung hängt und rot wird: Test an die neue Struktur anpassen, nicht die Struktur an den Test.

- [ ] **Step 6: Styles für `.project-links` ergänzen**

In `src/App.css` bei den anderen `.project-card`-Regeln (per Suche nach `.project-card` finden) anfügen:

```css
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  text-decoration: none;
  color: #2563eb;
}

.project-link:hover,
.project-link:focus-visible {
  text-decoration: underline;
}
```

Falls `.project-card` kein Flex-Layout hat, zusätzlich `display: flex; flex-direction: column;` auf `.project-card` prüfen/ergänzen, damit `margin-top: auto` die Link-Zeile nach unten schiebt (visuell prüfen, nicht blind einfügen).

- [ ] **Step 7: Tests laufen lassen — müssen grün sein**

Run: `npx vitest run src/components/Projekte.test.tsx`
Expected: PASS (alle, inkl. Bestandstests).

- [ ] **Step 8: Commit**

```bash
git add src/types/index.ts src/constants/projects.ts src/components/Projekte.tsx src/components/Projekte.test.tsx src/App.css
git commit -m "feat(projekte): data-driven project cards with external proof links"
```

---

### Task 2: Outbound-Click-Tracking

**Files:**
- Modify: `src/components/Projekte.tsx` (onClick am Link)
- Test: `src/components/Projekte.test.tsx`

**Interfaces:**
- Consumes: `unifiedAnalytics.trackProjectInteraction(projectId: string, action: "view" | "demo_click" | "code_click" | "detail_view")` aus `src/utils/unifiedAnalytics.ts` (existiert bereits).

- [ ] **Step 1: Failing Test schreiben**

Am Anfang von `Projekte.test.tsx` (nach den bestehenden Mocks) ergänzen:

```tsx
// Mock unified analytics
vi.mock("../utils/unifiedAnalytics", () => ({
  unifiedAnalytics: { trackProjectInteraction: vi.fn() },
  default: { trackProjectInteraction: vi.fn() },
}));
```

Und als neuen Test (Import oben ergänzen: `import userEvent from "@testing-library/user-event";` sowie `import { unifiedAnalytics } from "../utils/unifiedAnalytics";`):

```tsx
  it("tracks outbound clicks on project links", async () => {
    const user = userEvent.setup();
    render(<Projekte />);

    const steamLink = screen.getByRole("link", { name: /Auf Steam ansehen/ });
    // jsdom cannot navigate; prevent the error noise
    steamLink.addEventListener("click", (e) => e.preventDefault());
    await user.click(steamLink);

    expect(unifiedAnalytics.trackProjectInteraction).toHaveBeenCalledWith(
      "ardem",
      "demo_click"
    );
  });
```

- [ ] **Step 2: Test laufen lassen — muss fehlschlagen**

Run: `npx vitest run src/components/Projekte.test.tsx`
Expected: FAIL (`trackProjectInteraction` nicht aufgerufen).

- [ ] **Step 3: Implementierung**

In `Projekte.tsx` Import ergänzen und Link-Element erweitern:

```tsx
import { unifiedAnalytics } from "../utils/unifiedAnalytics";
```

Das `<a>`-Element in der Links-Schleife bekommt:

```tsx
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={() =>
                        unifiedAnalytics.trackProjectInteraction(
                          project.id,
                          "demo_click"
                        )
                      }
                    >
```

- [ ] **Step 4: Tests laufen lassen — grün**

Run: `npx vitest run src/components/Projekte.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projekte.tsx src/components/Projekte.test.tsx
git commit -m "feat(analytics): track outbound clicks on project links"
```

---

### Task 3: JSON-LD korrigieren & erweitern (index.html)

**Files:**
- Modify: `index.html:106-139` (Structured-Data-Block), `index.html:144` (Entry-Script)

**Interfaces:** keine (statisches HTML).

- [ ] **Step 1: JSON-LD-Block ersetzen**

Im bestehenden `<script type="application/ld+json">` drei Fixes:

1. Tippfehler `"@addressLocality"` → `"addressLocality"`.
2. `"knowsAbout"` ergänzen um `"Game Art"`, `"Pixel Art"`, `"Game Design"`.
3. `"sameAs"` ersetzen durch (alte URLs sind falsch — `linkedin.com/in/nico-kuechler` und `github.com/nico-kuechler` existieren so nicht):

```json
        "sameAs": [
          "https://www.linkedin.com/in/nico-kuechler-9337a762/",
          "https://github.com/levoram",
          "https://levoram.itch.io/",
          "https://www.neverknights.de/",
          "https://www.twitch.tv/levoram"
        ]
```

- [ ] **Step 2: Entry-Script-Referenz fixen**

`index.html:144`: `/src/main.jsx` → `/src/main.tsx`.

- [ ] **Step 3: Build-Smoke-Test**

Run: `npm run build`
Expected: Build erfolgreich; `grep -c "levoram" dist/index.html` → mindestens 3 Treffer.

- [ ] **Step 4: JSON validieren**

Run: `python3 -c "import json,re,pathlib; m=re.search(r'<script type=\"application/ld\+json\">(.*?)</script>', pathlib.Path('index.html').read_text(), re.S); json.loads(m.group(1)); print('JSON-LD valid')"`
Expected: `JSON-LD valid`

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "fix(seo): correct JSON-LD sameAs profiles, add itch.io/neverknights/twitch identities"
```

---

### Task 4: About-Text erweitern

**Files:**
- Modify: `src/components/About.tsx`
- Test: `src/components/About.test.tsx`

**Interfaces:** keine neuen.

- [ ] **Step 1: Failing Test schreiben**

In `About.test.tsx` ergänzen:

```tsx
  it("mentions game art background and links to Neverknights", () => {
    render(<About />);

    const text = document.querySelector(".profile-desc");
    expect(text).toHaveTextContent("Games & Animation");

    const nkLink = screen.getByRole("link", { name: /Neverknights/ });
    expect(nkLink).toHaveAttribute("href", "https://www.neverknights.de/en/");
    expect(nkLink).toHaveAttribute("target", "_blank");
    expect(nkLink).toHaveAttribute("rel", "noopener noreferrer");
  });
```

- [ ] **Step 2: Test laufen lassen — muss fehlschlagen**

Run: `npx vitest run src/components/About.test.tsx`
Expected: FAIL („Games & Animation" nicht gefunden).

- [ ] **Step 3: Implementierung**

In `About.tsx` innerhalb `<p className="profile-desc">` nach dem letzten Satz (`… für Unternehmen jeder Größe.`) ergänzen:

```tsx
          <br />
          <br />
          Mit meinem B.A. in Games &amp; Animation verbinde ich Software und
          Game Art: Auf{" "}
          <a
            href="https://www.neverknights.de/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Neverknights
          </a>{" "}
          teile ich Tutorials zu Pixel Art und Farbtheorie — und meine Games
          und Design-Beiträge finden Sie auf der{" "}
          <a href="/projekte">Projektseite</a>.
```

Hinweis: Der interne Link nutzt bewusst `<a href="/projekte">` statt `useNavigate`, weil der Test-Mock `useNavigate` bereits belegt; ein `<Link>` aus react-router-dom ist aber die bessere Wahl, wenn `test-utils` einen Router bereitstellt — prüfen: wenn `render` aus `../test/test-utils` einen `MemoryRouter` wrappt, `<Link to="/projekte">` verwenden.

- [ ] **Step 4: Tests laufen lassen — grün**

Run: `npx vitest run src/components/About.test.tsx`
Expected: PASS (alle Bestandstests weiterhin grün).

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/About.test.tsx
git commit -m "feat(about): mention games & animation background, link Neverknights"
```

---

### Task 5: Gesamtverifikation & Auslieferung

**Files:** keine neuen.

- [ ] **Step 1: Volle Testsuite + Lint + Build**

Run: `npx vitest run && npm run lint && npm run build`
Expected: alles grün, Build erfolgreich.

- [ ] **Step 2: Visuelle Prüfung**

Run: `npm run preview` (Port 4173), Seite `/projekte` im Browser prüfen: 8 Karten, Link-Zeilen sichtbar, Icons geladen, Dark Mode ok.

- [ ] **Step 3: Branch pushen & Draft-PR**

```bash
git push -u origin worktree-feature-crosslinks
gh pr create --draft --title "feat: Projekt-Crosslinks & echte Belege (Steam, itch.io, Neverknights)" --body "..."
```
