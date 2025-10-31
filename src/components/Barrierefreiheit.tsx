import ProfileCard from "./ProfileCard";

/**
 * Barrierefreiheit component - Accessibility declaration page
 *
 * Features:
 * - Comprehensive accessibility statement according to WCAG 2.1 AA
 * - Information about implemented accessibility features
 * - Contact information for accessibility feedback
 * - Compliance status and evaluation methodology
 *
 * @returns Accessibility declaration page component
 */
function Barrierefreiheit(): React.ReactElement {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Erklärung zur Barrierefreiheit</h1>
        <h3>WCAG 2.1 Level AA Konformität</h3>

        <div className="cv-section">
          <p>
            Diese Erklärung zur Barrierefreiheit gilt für die Website{" "}
            <strong>nico-kuechler.de</strong> von Nico Küchler.
          </p>
        </div>

        <div className="cv-section">
          <h4>Bemühungen um Barrierefreiheit</h4>
          <p>
            Nico Küchler ist bemüht, seine Website im Einklang mit den{" "}
            <strong>
              Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
            </strong>{" "}
            barrierefrei zu gestalten. Diese Website wurde entwickelt, um für
            alle Menschen, einschließlich Menschen mit Behinderungen, zugänglich
            zu sein.
          </p>
        </div>

        <div className="cv-section">
          <h4>Konformitätsstatus</h4>
          <p>
            Der Konformitätsstatus dieser Website wird als{" "}
            <strong>weitgehend konform</strong> bewertet. "Weitgehend konform"
            bedeutet, dass der Inhalt der meisten Anforderungen der WCAG 2.1
            Level AA entspricht.
          </p>
        </div>

        <div className="cv-section">
          <h4>Wahrnehmbarkeit (Perceivable)</h4>
          <ul>
            <li>
              <strong>Sprache der Seite:</strong> Die Hauptsprache der Website
              ist als Deutsch (lang="de") definiert
            </li>
            <li>
              <strong>Textkontrast:</strong> Ausreichende Farbkontraste zwischen
              Text und Hintergrund für beide Themes (Hell/Dunkel)
            </li>
            <li>
              <strong>Responsive Design:</strong> Die Website ist für
              verschiedene Bildschirmgrößen und Geräte optimiert
            </li>
            <li>
              <strong>Strukturierte Inhalte:</strong> Semantische HTML-Struktur
              mit logischer Überschriftenhierarchie (h1-h4)
            </li>
            <li>
              <strong>Alternative Texte:</strong> Bilder enthalten beschreibende
              Alt-Texte wo erforderlich
            </li>
            <li>
              <strong>Farbunabhängige Information:</strong> Informationen werden
              nicht ausschließlich durch Farbe vermittelt
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Bedienbarkeit (Operable)</h4>
          <ul>
            <li>
              <strong>Tastaturnavigation:</strong> Vollständige Navigation mit
              der Tastatur möglich
            </li>
            <li>
              <strong>Fokusindikatoren:</strong> Sichtbare Fokusindikatoren für
              alle interaktiven Elemente
            </li>
            <li>
              <strong>Skip-Links:</strong> "Zum Hauptinhalt springen" und "Zur
              Navigation springen" Links implementiert
            </li>
            <li>
              <strong>Escape-Funktion:</strong> Mobile Navigation kann mit
              Escape-Taste geschlossen werden
            </li>
            <li>
              <strong>Keine Zeitlimits:</strong> Keine automatischen Zeitlimits
              oder zeitkritische Inhalte
            </li>
            <li>
              <strong>Keine Anfälle:</strong> Keine blinkenden oder flackernden
              Inhalte
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Verständlichkeit (Understandable)</h4>
          <ul>
            <li>
              <strong>Klare Sprache:</strong> Verständliche deutsche Sprache
              ohne unnötige Fachbegriffe
            </li>
            <li>
              <strong>Konsistente Navigation:</strong> Einheitliche Navigation
              auf allen Seiten
            </li>
            <li>
              <strong>Formularhilfen:</strong> Klare Beschriftungen und
              Fehlermeldungen bei Formularen
            </li>
            <li>
              <strong>Vorhersagbare Funktionen:</strong> Interaktive Elemente
              verhalten sich erwartungsgemäß
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Robustheit (Robust)</h4>
          <ul>
            <li>
              <strong>Semantisches HTML:</strong> Korrekte HTML5-Struktur mit
              semantischen Elementen
            </li>
            <li>
              <strong>ARIA-Attribute:</strong> Verwendung von ARIA-Labels und
              -Attributen wo angemessen
            </li>
            <li>
              <strong>Kompatibilität:</strong> Funktioniert mit verschiedenen
              Browsern und assistiven Technologien
            </li>
            <li>
              <strong>Standards-Konformität:</strong> Valides HTML und CSS
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Technische Implementierungen</h4>
          <p>
            <strong>Navigation und Struktur:</strong> nav-Elemente mit
            aria-label für bessere Orientierung, logische Tab-Reihenfolge,
            Mobile Hamburger-Menü mit aria-expanded und aria-controls.
          </p>
          <p>
            <strong>Formulare:</strong> Alle Formularfelder haben Labels,
            aria-invalid Attribute für Fehlerzustände, beschreibende
            Fehlermeldungen, Fokusmanagement bei Validierung.
          </p>
          <p>
            <strong>Interaktive Elemente:</strong> Buttons haben beschreibende
            aria-label Attribute, Theme-Toggle mit kontextuellem Label, Links
            mit aria-current="page" für aktuelle Seite.
          </p>
        </div>

        <div className="cv-section">
          <h4>Feedback und Kontakt</h4>
          <p>
            Wir sind bestrebt, die Barrierefreiheit unserer Website
            kontinuierlich zu verbessern. Falls Sie auf Barrieren stoßen oder
            Verbesserungsvorschläge haben, kontaktieren Sie uns bitte:
          </p>
          <p>
            <strong>Nico Küchler</strong>
            <br />
            E-Mail:{" "}
            <a href="mailto:mail@nico-kuechler.de">mail@nico-kuechler.de</a>
            <br />
            Telefon: <a href="tel:+4917181681684">+49 171 816 816 4</a>
          </p>
        </div>

        <div className="cv-section">
          <h4>Bewertungsverfahren</h4>
          <p>
            Diese Erklärung zur Barrierefreiheit wurde am{" "}
            <strong>31. Oktober 2024</strong> erstellt und basiert auf einer
            Selbstbewertung gemäß WCAG 2.1 Level AA. Die Bewertung umfasste:
          </p>
          <ul>
            <li>Manuelle Prüfung mit Tastaturnavigation</li>
            <li>Überprüfung des Quellcodes auf semantische Struktur</li>
            <li>Test der Farbkontraste</li>
            <li>Überprüfung der ARIA-Implementierung</li>
            <li>Test verschiedener Bildschirmgrößen</li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Rechtliche Grundlage</h4>
          <p>
            Diese Erklärung wurde in Übereinstimmung mit der EU-Richtlinie
            2016/2102 und den entsprechenden nationalen Gesetzen zur
            Barrierefreiheit erstellt.
          </p>
        </div>

        <div className="cv-section">
          <h4>Aktualisierung</h4>
          <p>
            Diese Erklärung zur Barrierefreiheit wurde zuletzt am{" "}
            <strong>31. Oktober 2024</strong> aktualisiert und wird regelmäßig
            überprüft und bei Bedarf aktualisiert.
          </p>
          <hr />
          <p>
            <em>Stand: 31. Oktober 2024</em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Barrierefreiheit;
