# Design: Portfolio-Crosslinks & Projekt-Belege

**Datum:** 2026-07-09
**Status:** Vom Nutzer freigegeben (Chat-Session)

## Ziel

Das Portfolio (nico-kuechler.de) verlinkt aktuell keine realen, öffentlich prüfbaren
Projekte. Die Games-Identität (Neverknights, levoram, Ardem) fehlt vollständig.
Dieses Feature macht sichtbar, was bereits existiert: echte Projektseiten als Belege,
plus SEO-Vernetzung der digitalen Identitäten.

## Umfang

### A. Datenmodell für Projekte

- Neue Datei `src/constants/projects.ts`: typisiertes Array `PROJECTS`.
- Typ `Project` (in `src/types/index.ts`): `title`, `zeitraum`, `technologien?`,
  `unternehmen?`, `services?`, `beschreibung`, `links?: ProjectLink[]`.
- Typ `ProjectLink`: `label`, `url`, `icon?` (Font-Awesome-Klasse).
- `Projekte.tsx` rendert nur noch per `map()` über `PROJECTS` — kein hartkodiertes
  Karten-JSX mehr.

### B. Projektkarten (Inhalt)

Neue Karten:

| Karte | Links | Kern |
|---|---|---|
| **Ardem** | Steam: `https://store.steampowered.com/app/2179480/Ardem/` | Game-Art-/Design-Beitrag zum Open-World-Survival-RPG (Early Access 2026) |
| **Neverknights** | `https://www.neverknights.de/en/` | Eigene Game-Art-Lernplattform: Pixel Art, Color Theory, Fundamentals (B.A. Games & Animation) |

Erweiterte Karte:

- **Nico Küchler Mediendesign / Game Design** erhält zwei Links:
  - „SnakeTris Adventure spielen" → `https://levoram.itch.io/snaketris-adventure`
  - „Alle Games auf itch.io" → `https://levoram.itch.io/`

Unverändert: Flughafen München, VR/AR, 3D Navigation, NATO-Digitalisierung,
Web- & Grafikdesign (keine öffentlichen Belege verfügbar).

Link-Darstellung: Button-/Link-Zeile am Kartenende, `target="_blank"`,
`rel="noopener noreferrer"`, externes Icon (↗ bzw. Font-Awesome-Brand-Icon).

### C. Outbound-Tracking

Klicks auf externe Projekt-Links feuern ein GA4-Event über das bestehende
`unifiedAnalytics`-Setup (Event z. B. `outbound_click` mit `link_url`, `link_label`).
Kein neues Consent-Handling nötig — läuft über den vorhandenen Cookie-Consent-Gate.

### D. Identitäts-Vernetzung (SEO)

- JSON-LD `Person`-Schema in `index.html` (statisch, kein JS nötig):
  - `name`: Nico Küchler, `jobTitle`, `url`: https://nico-kuechler.de
  - `sameAs`: LinkedIn (`https://www.linkedin.com/in/nico-kuechler-9337a762/`),
    GitHub (`https://github.com/levoram`), itch.io (`https://levoram.itch.io/`),
    Neverknights (`https://www.neverknights.de/`),
    Twitch (`https://www.twitch.tv/levoram`)
- GitHub-Icon neben LinkedIn in `ProfileCard.tsx` und `Footer.tsx`.
- Beide Komponenten nutzen dafür die `SOCIAL_LINKS`-Konstante (bisher toter Code)
  statt hartkodierter URLs. Die echten URLs werden Code-Defaults in
  `constants/index.ts` (bisher nur in lokaler `.env` → fehlten im CI-Build).
  Xing bleibt draußen.

### E. About-Text

Ein Absatz-Zusatz in `About.tsx`: B.A. Games & Animation erwähnen + Satz zu
Neverknights mit externem Inline-Link; interner Link zur Projekte-Seite.

## Nicht im Umfang

- Backlink von neverknights.de zurück (anderes Repo, Folgeschritt).
- Xing-Verlinkung.
- Twitch als Projektkarte (nur `sameAs`).
- Weitere itch.io-Games (aktuell nur SnakeTris relevant).

## Fehlerbehandlung

Rein statische Inhalte — keine Laufzeitfehlerquellen. Tracking-Aufruf defensiv
(Fehler im Analytics dürfen den Link-Klick nie blockieren; Navigation via
nativem `<a href>`, Tracking nur nebenläufig).

## Testing

- `Projekte.test.tsx`: Karten rendern aus `PROJECTS`; externe Links haben
  `target="_blank"` und `rel="noopener noreferrer"`; Ardem-/Neverknights-Karte
  vorhanden.
- `About.test.tsx`: Neverknights-Link vorhanden.
- `Footer.test.tsx` / ProfileCard: GitHub-Link vorhanden.
- JSON-LD: Script-Tag in `index.html` valide (Build-Smoke + manuelle Prüfung
  mit Google Rich-Results-Test nach Deploy).
