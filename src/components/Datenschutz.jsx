import React from "react";
import ProfileCard from "./ProfileCard";

/**
 * Datenschutz component for GDPR compliance (German privacy policy)
 *
 * @returns {JSX.Element} Privacy policy page component
 */
function Datenschutz() {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Datenschutzerklärung</h1>
        <h3>Geltungsbereich</h3>

        <div className="cv-section">
          <h4>1. Verantwortlicher</h4>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
            und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie
            sonstiger datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p>
            <strong>Nico Küchler</strong>
            <br />
            Nico Küchler Mediendesign
            <br />
            Wilhelm-Busch-Weg 22
            <br />
            82216 Maisach, Ortsteil Gernlinden
            <br />
            Deutschland
            <br />
            <br />
            <strong>Telefon:</strong> +49 (0)171 8168164
            <br />
            <strong>E-Mail:</strong> mail(at)nico-kuechler.de
          </p>
        </div>

        <div className="cv-section">
          <h4>2. Allgemeine Hinweise zur Datenverarbeitung</h4>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
            Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der
            gesetzlichen Bestimmungen (DSGVO, TKG 2003). In diesen
            Datenschutzinformationen informieren wir Sie über die wichtigsten
            Aspekte der Datenverarbeitung im Rahmen unserer Website.
          </p>
        </div>

        <div className="cv-section">
          <h4>3. Kontakt mit uns</h4>
          <p>
            Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit
            uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der
            Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse)
            <br />
            <strong>Speicherdauer:</strong> Die Daten werden gelöscht, sobald
            sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr
            erforderlich sind.
          </p>
        </div>

        <div className="cv-section">
          <h4>4. Server-Log-Dateien</h4>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch
            Informationen in so genannten Server-Log-Dateien, die Ihr Browser
            automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="cv-certifications">
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
            nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage
            von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein
            berechtigtes Interesse an der technisch fehlerfreien Darstellung und
            der Optimierung seiner Website.
          </p>
        </div>

        <div className="cv-section">
          <h4>5. Cookies</h4>
          <p>
            Diese Website verwendet derzeit keine Cookies zur Speicherung von
            Benutzerdaten. Sollten in Zukunft Cookies eingesetzt werden, werden
            Sie entsprechend informiert und um Ihre Einwilligung gebeten.
          </p>
        </div>

        <div className="cv-section">
          <h4>6. Externe Dienste</h4>
          <p>
            Diese Website nutzt externe Schriftarten (Google Fonts). Diese
            werden von Google bereitgestellt. Beim Aufruf einer Seite lädt Ihr
            Browser die benötigten Schriften in ihren Browsercache, um Texte und
            Schriftarten korrekt anzuzeigen.
          </p>
          <p>
            Weitere Informationen zu Google Fonts finden Sie unter:
            https://developers.google.com/fonts/faq und in der
            Datenschutzerklärung von Google: https://policies.google.com/privacy
          </p>
        </div>

        <div className="cv-section">
          <h4>7. Ihre Rechte</h4>
          <p>Ihnen stehen grundsätzlich die Rechte auf:</p>
          <ul className="cv-certifications">
            <li>
              <strong>Auskunft:</strong> Sie können Auskunft über Ihre von uns
              verarbeiteten personenbezogenen Daten verlangen
            </li>
            <li>
              <strong>Berichtigung:</strong> Sie können die Berichtigung
              unrichtiger oder unvollständiger Daten verlangen
            </li>
            <li>
              <strong>Löschung:</strong> Sie können die Löschung Ihrer
              personenbezogenen Daten verlangen
            </li>
            <li>
              <strong>Einschränkung:</strong> Sie können die Einschränkung der
              Verarbeitung verlangen
            </li>
            <li>
              <strong>Datenübertragbarkeit:</strong> Sie können die Übertragung
              Ihrer Daten verlangen
            </li>
            <li>
              <strong>Widerspruch:</strong> Sie können der Verarbeitung Ihrer
              Daten widersprechen
            </li>
            <li>
              <strong>Beschwerde:</strong> Sie können sich bei einer
              Aufsichtsbehörde beschweren
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>8. Datensicherheit</h4>
          <p>
            Wir verwenden innerhalb des Website-Besuchs das verbreitete
            SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
            höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt
            wird. In der Regel handelt es sich dabei um eine 256 Bit
            Verschlüsselung.
          </p>
        </div>

        <div className="cv-section">
          <h4>9. Aktualität und Änderung dieser Datenschutzerklärung</h4>
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
            August 2025. Durch die Weiterentwicklung unserer Website und
            Angebote darüber oder aufgrund geänderter gesetzlicher
            beziehungsweise behördlicher Vorgaben kann es notwendig werden,
            diese Datenschutzerklärung zu ändern.
          </p>
        </div>

        <div className="cv-section">
          <h4>10. Kontakt</h4>
          <p>
            Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer
            personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder
            Löschung von Daten wenden Sie sich bitte an:
          </p>
          <p>
            <strong>E-Mail:</strong> mail(at)nico-kuechler.de
            <br />
            <strong>Telefon:</strong> +49 (0)171 8168164
          </p>
        </div>
      </div>
    </div>
  );
}

export default Datenschutz;
