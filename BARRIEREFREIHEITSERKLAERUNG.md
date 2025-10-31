# Erklärung zur Barrierefreiheit

Diese Erklärung zur Barrierefreiheit gilt für die Website **nico-kuechler.de** von Nico Küchler.

## Bemühungen um Barrierefreiheit

Nico Küchler ist bemüht, seine Website im Einklang mit den **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** barrierefrei zu gestalten. Diese Website wurde entwickelt, um für alle Menschen, einschließlich Menschen mit Behinderungen, zugänglich zu sein.

## Konformitätsstatus

Der Konformitätsstatus dieser Website wird als **weitgehend konform** bewertet. "Weitgehend konform" bedeutet, dass der Inhalt der meisten Anforderungen der WCAG 2.1 Level AA entspricht.

## Implementierte Barrierefreiheitsmaßnahmen

### ✅ Wahrnehmbarkeit (Perceivable)

- **Sprache der Seite:** Die Hauptsprache der Website ist als Deutsch (lang="de") definiert
- **Textkontrast:** Ausreichende Farbkontraste zwischen Text und Hintergrund für beide Themes (Hell/Dunkel)
- **Responsive Design:** Die Website ist für verschiedene Bildschirmgrößen und Geräte optimiert
- **Strukturierte Inhalte:** Semantische HTML-Struktur mit logischer Überschriftenhierarchie (h1-h4)
- **Alternative Texte:** Bilder enthalten beschreibende Alt-Texte wo erforderlich
- **Farbunabhängige Information:** Informationen werden nicht ausschließlich durch Farbe vermittelt

### ✅ Bedienbarkeit (Operable)

- **Tastaturnavigation:** Vollständige Navigation mit der Tastatur möglich
- **Fokusindikatoren:** Sichtbare Fokusindikatoren für alle interaktiven Elemente
- **Skip-Links:** "Zum Hauptinhalt springen" und "Zur Navigation springen" Links implementiert
- **Escape-Funktion:** Mobile Navigation kann mit Escape-Taste geschlossen werden
- **Keine Zeitlimits:** Keine automatischen Zeitlimits oder zeitkritische Inhalte
- **Keine Anfälle:** Keine blinkenden oder flackernden Inhalte

### ✅ Verständlichkeit (Understandable)

- **Klare Sprache:** Verständliche deutsche Sprache ohne unnötige Fachbegriffe
- **Konsistente Navigation:** Einheitliche Navigation auf allen Seiten
- **Formularhilfen:** Klare Beschriftungen und Fehlermeldungen bei Formularen
- **Vorhersagbare Funktionen:** Interaktive Elemente verhalten sich erwartungsgemäß

### ✅ Robustheit (Robust)

- **Semantisches HTML:** Korrekte HTML5-Struktur mit semantischen Elementen
- **ARIA-Attribute:** Verwendung von ARIA-Labels und -Attributen wo angemessen
- **Kompatibilität:** Funktioniert mit verschiedenen Browsern und assistiven Technologien
- **Standards-Konformität:** Valides HTML und CSS

## Spezifische Implementierungen

### Navigation und Struktur

- `<nav>` Elemente mit `aria-label` für bessere Orientierung
- `role="main"` für Hauptinhalt
- Logische Tab-Reihenfolge
- Mobile Hamburger-Menü mit `aria-expanded` und `aria-controls`

### Formulare

- Alle Formularfelder haben Labels
- `aria-invalid` Attribute für Fehlerzustände
- Beschreibende Fehlermeldungen
- Fokusmanagement bei Validierung

### Interaktive Elemente

- Buttons haben beschreibende `aria-label` Attribute
- Theme-Toggle mit kontextuellem Label
- Links mit `aria-current="page"` für aktuelle Seite

### Visuelles Design

- Focus-Indikatoren mit ausreichendem Kontrast
- Mindestschriftgröße von 16px
- Ausreichende Abstände zwischen klickbaren Elementen
- Dark/Light Mode für verschiedene Bedürfnisse

## Bekannte Einschränkungen

### Geringfügige Verbesserungsmöglichkeiten

- **Externe Links:** Nicht alle externen Links sind explizit als solche gekennzeichnet
- **Multimedia:** Keine Video- oder Audioinhalte vorhanden (daher keine Untertitel erforderlich)
- **Formulare:** E-Mail-Versand über mailto-Link (funktionell aber nicht optimal)

## Feedback und Kontakt

Wir sind bestrebt, die Barrierefreiheit unserer Website kontinuierlich zu verbessern. Falls Sie auf Barrieren stoßen oder Verbesserungsvorschläge haben, kontaktieren Sie uns bitte:

**Nico Küchler**
E-Mail: mail@nico-kuechler.de
Telefon: +49 171 816 816 4

## Bewertungsverfahren

Diese Erklärung zur Barrierefreiheit wurde am **31. Oktober 2024** erstellt und basiert auf einer Selbstbewertung gemäß WCAG 2.1 Level AA. Die Bewertung umfasste:

- Manuelle Prüfung mit Tastaturnavigation
- Überprüfung des Quellcodes auf semantische Struktur
- Test der Farbkontraste
- Überprüfung der ARIA-Implementierung
- Test verschiedener Bildschirmgrößen

## Rechtliche Grundlage

Diese Erklärung wurde in Übereinstimmung mit der EU-Richtlinie 2016/2102 und den entsprechenden nationalen Gesetzen zur Barrierefreiheit erstellt.

## Aktualisierung

Diese Erklärung zur Barrierefreiheit wurde zuletzt am **31. Oktober 2024** aktualisiert und wird regelmäßig überprüft und bei Bedarf aktualisiert.

---

_Stand: 31. Oktober 2024_
