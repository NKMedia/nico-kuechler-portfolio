import ProfileCard from "./ProfileCard";

/**
 * Datenschutz component for GDPR compliance (German privacy policy)
 *
 * @returns Privacy policy page component
 */
function Datenschutz(): React.ReactElement {
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
            Diese Website verwendet Cookies für die Webanalyse mit Google
            Analytics 4. Diese Cookies werden nur gesetzt, wenn Sie dem über
            unseren Cookie-Banner aktiv zugestimmt haben. Sie können Ihre
            Einwilligung jederzeit widerrufen, indem Sie die Cookies in Ihrem
            Browser löschen.
          </p>
          <p>
            <strong>Verwendete Cookies:</strong>
          </p>
          <ul className="cv-certifications">
            <li>
              <strong>_ga:</strong> Unterscheidung von Nutzern (2 Jahre)
            </li>
            <li>
              <strong>_ga_*:</strong> Speicherung des Sitzungsstatus (2 Jahre)
            </li>
          </ul>
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
          <h4>7. Google Analytics 4</h4>
          <p>
            Diese Website benutzt Google Analytics 4, einen Webanalysedienst der
            Google Ireland Limited ("Google"), Gordon House, Barrow Street,
            Dublin 4, Irland. Google Analytics 4 verwendet Cookies, die auf
            Ihrem Computer gespeichert werden und die eine Analyse der Benutzung
            der Website durch Sie ermöglichen.
          </p>
          <p>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
            (Einwilligung). Die Verarbeitung erfolgt nur nach Ihrer
            ausdrücklichen Einwilligung über unseren Cookie-Banner.
          </p>
          <p>
            <strong>IP-Anonymisierung:</strong> Wir haben auf dieser Website die
            IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google
            innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen
            Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum
            vor der Übermittlung in die USA gekürzt.
          </p>
          <p>
            <strong>Verarbeitete Daten:</strong>
          </p>
          <ul className="cv-certifications">
            <li>Anonymisierte IP-Adresse</li>
            <li>Besuchte Seiten und Verweildauer</li>
            <li>Verwendeter Browser und Gerät</li>
            <li>Herkunft des Besuches (Referrer)</li>
            <li>Interaktionen mit der Website</li>
          </ul>
          <p>
            <strong>Widerspruchsrecht:</strong> Sie können die Speicherung der
            Cookies durch eine entsprechende Einstellung Ihrer Browser-Software
            verhindern oder Ihre Einwilligung im Cookie-Banner widerrufen.
            Alternativ können Sie ein Browser-Plugin zur Deaktivierung von
            Google Analytics installieren:
            <br />
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://tools.google.com/dlpage/gaoptout
            </a>
          </p>
          <p>
            Weitere Informationen zum Datenschutz bei Google:
            <br />
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </a>
          </p>
        </div>

        <div className="cv-section">
          <h4>8. Ihre Rechte</h4>
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
          <h4>9. Datensicherheit</h4>
          <p>
            Wir verwenden innerhalb des Website-Besuchs das verbreitete
            SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils
            höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt
            wird. In der Regel handelt es sich dabei um eine 256 Bit
            Verschlüsselung.
          </p>
        </div>

        <div className="cv-section">
          <h4>10. Aktualität und Änderung dieser Datenschutzerklärung</h4>
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
            Februar 2026. Durch die Weiterentwicklung unserer Website und
            Angebote darüber oder aufgrund geänderter gesetzlicher
            beziehungsweise behördlicher Vorgaben kann es notwendig werden,
            diese Datenschutzerklärung zu ändern.
          </p>
        </div>

        <div className="cv-section">
          <h4>11. Kontakt</h4>
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
