import React from "react";
import ProfileCard from "./ProfileCard";

/**
 * Impressum component for legal information (German legal requirement)
 *
 * @returns {JSX.Element} Impressum page component
 */
function Impressum() {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Impressum</h1>
        <h3>Angaben gemäß § 5 TMG</h3>

        <div className="cv-section">
          <h4>Verantwortlich</h4>
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
          </p>
        </div>

        <div className="cv-section">
          <h4>Kontakt</h4>
          <p>
            <strong>Telefon:</strong> +49 (0)171 8168164
            <br />
            <strong>E-Mail:</strong> mail(at)nico-kuechler.de
          </p>
        </div>

        <div className="cv-section">
          <h4>Umsatzsteuer-Identifikationsnummer</h4>
          <p>DE283872860</p>
        </div>

        <div className="cv-section">
          <h4>Wirtschafts-Identifikationsnummer</h4>
          <p>145/154/51278</p>
        </div>

        <div className="cv-section">
          <h4>Haftungshinweis</h4>
          <p>
            Die Informationen auf unseren Internetseiten werden mit großer
            Sorgfalt erstellt. Nico Küchler Mediendesign übernimmt jedoch keine
            Gewähr für deren Vollständigkeit oder Eignung für bestimmte
            Verwendungszwecke. Die Nutzung der auf den Internetseiten zur
            Verfügung gestellten Inhalte erfolgt auf alleinige Gefahr des
            Nutzers.
          </p>
          <p>
            Etwaige Schadensersatzansprüche des Nutzers gegen Nico Küchler
            Mediendesign, gleich aus welchem Rechtsgrund, sind auf folgende
            Fälle beschränkt: schuldhafte Verletzung vertraglicher
            Hauptpflichten, die schuldhafte Verletzung von Leben, Körper und
            Gesundheit, und die vorsätzliche oder grob fahrlässige Verletzung
            sonstiger Pflichten durch Nico Küchler Mediendesign.
          </p>
          <p>
            Nico Küchler Mediendesign distanziert sich hiermit ausdrücklich von
            Inhalten aller verknüpften Seiten, die von unserer Homepage
            erreichbar sind. Dies gilt für alle innerhalb des eigenen
            Internetangebotes gesetzten Links und Verweise, sowie für
            Fremdeinträge in Gästebüchern, Diskussionsforen und Mailinglisten.
            Für illegale, fehlerhafte oder unvollständige Inhalte und
            insbesondere für Schäden, die aus der Nutzung oder Nichtnutzung
            solcherart dargebotener Informationen entstehen, haftet allein der
            Anbieter der Seite, auf welche verwiesen wurde, nicht Nico Küchler
            Mediendesign als diejenige, die über Links auf die jeweilige
            Veröffentlichung lediglich verweist.
          </p>
        </div>

        <div className="cv-section">
          <h4>Marken</h4>
          <p>
            Das Logo sowie der Name von Nico Küchler Mediendesign sind
            eingetragene Marken. Dritten ist die Nutzung und Verwendung
            sämtlicher Marken, Logos, Fotos, oder sonstigem geistigen Eigentum
            der Nico Küchler Mediendesign untersagt. Alle weiter erwähnten
            Marken sind für ihre jeweiligen Inhaber geschützt.
          </p>
        </div>

        <div className="cv-section">
          <h4>Copyright</h4>
          <p>
            Alle Rechte vorbehalten. Nachdruck, Aufnahme in Online-Dienste und
            Internet und Vervielfältigung auf Datenträger wie CD-ROM, DVD-ROM
            etc. sind nur nach vorheriger schriftlicher Zustimmung von Nico
            Küchler Mediendesign erlaubt. Die auf den Internetseiten der Nico
            Küchler Mediendesign enthaltenen Inhalte sind urheberrechtlich
            geschützt.
          </p>
        </div>

        <div className="cv-section">
          <h4>Download</h4>
          <p>
            Der Download von Dateien erfolgt auf eigene Gefahr. Die Nico Küchler
            Mediendesign haftet nicht für Schäden, die aus Installation oder
            durch das Herunterladen von Software und Dateien entstehen können,
            soweit dies gesetzlich zulässig ist. Trotz aktueller Virenprüfung
            ist eine Haftung für Schäden und Beeinträchtigungen durch
            Computerviren im Rahmen der gesetzlichen Regelungen ausgeschlossen.
          </p>
        </div>

        <div className="cv-section">
          <h4>Zustimmung</h4>
          <p>
            Wenn Sie Daten über sich selbst eingeben, gestatten Sie uns damit
            die Speicherung und Nutzung im Sinne des Bundesdatenschutzgesetzes.
            Diese Informationen sind personenbezogen und werden
            selbstverständlich vertraulich firmenintern verwendet. Ein
            Widerspruch gegen die Speicherung Ihrer Daten und eine damit
            verbundene Löschung Ihrer personenbezogenen Daten bei uns ist
            jederzeit möglich. Weitere Information hierzu finden Sie auf der
            Seite über den Datenschutz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Impressum;
