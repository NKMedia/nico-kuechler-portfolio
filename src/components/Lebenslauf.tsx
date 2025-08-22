import ProfileCard from "./ProfileCard";

/**
 * Lebenslauf component - CV page displaying professional experience and education
 *
 * Features:
 * - Professional experience timeline
 * - Education history
 * - Technical skills overview
 * - Language proficiencies
 * - Additional qualifications
 *
 * @returns CV page component
 */
function Lebenslauf(): React.ReactElement {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Lebenslauf</h1>
        <h3>Meine berufliche Laufbahn</h3>

        <div className="cv-section">
          <h4>Berufserfahrung</h4>

          <div className="cv-item">
            <div className="cv-date">09/2022 - heute</div>
            <div className="cv-details">
              <h5>Referent Senior Software Developer & Designer</h5>
              <p>Flughafen München GmbH - Servicebereich IT</p>
              <p>
                Konzeption und Entwicklung individueller Softwarelösungen für
                FMG, Tochtergesellschaften und Lufthansa. Fachgebiet
                Webentwicklung, UI/UX Design und Beratung. Personelle Steuerung
                externer Entwickler und Einführung moderner Frontend-Tools
                (React, Figma, Storybook).
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">02/2017 - 08/2022</div>
            <div className="cv-details">
              <h5>Referent Software Developer & Designer</h5>
              <p>Flughafen München GmbH - IT Development and Engineering</p>
              <p>
                Konzeption und Entwicklung individueller Softwarelösungen. UI/UX
                Design und Beratung, personelle Steuerung externer Entwickler.
                Ausbildungsbeauftragter seit 04/2019 und Ersthelfer der
                Abteilung.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">03/2016 - 01/2017</div>
            <div className="cv-details">
              <h5>Software Developer (Aushilfe)</h5>
              <p>Flughafen München GmbH - IT-Projekte und Entwicklung</p>
              <p>
                Konzeption und Entwicklung von Softwarelösungen für FMG und
                Partner. Fachgebiete Webentwicklung und Unity, UI/UX Design,
                Unterstützung Datenbank Administration.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">03/2014 - 02/2016</div>
            <div className="cv-details">
              <h5>Werkstudent - Software Developer & Designer</h5>
              <p>InfoGate Information Systems GmbH</p>
              <p>
                Entwicklung von 3D-Navigation Prototypen, Produktrenderings,
                CAD-Pläne, Videoproduktion und Grafikbearbeitung. Entwicklung
                individueller Softwarelösungen.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">03/2012 - heute</div>
            <div className="cv-details">
              <h5>Inhaber - Nico Küchler Mediendesign</h5>
              <p>Selbstständig</p>
              <p>
                VR/AR/Mixed Reality Projekte, Game Design, UI/UX Design und
                Beratung, Videoschnitt, Fotografie, 3D Konfiguratoren.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">10/2002 - 03/2012</div>
            <div className="cv-details">
              <h5>Stabsoffizier & Ausbildungsleiter</h5>
              <p>Deutsche Bundeswehr</p>
              <p>
                Verschiedene Führungspositionen inkl. Stabsoffizier im
                Wehrbereichskommando IV, Ausbildungssteuerung,
                Personalverantwortung für bis zu 46 Mitarbeiter, Auslandseinsatz
                in Afghanistan.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">06/2001 - 09/2002</div>
            <div className="cv-details">
              <h5>Fachkraft für Brief- und Frachtverkehr</h5>
              <p>Deutsche Post AG</p>
              <p>
                Personalführung des Zustellstützpunktes (25 Mitarbeiter),
                Erstellung von Dienstplänen, Bemessung von Zustellbezirken.
              </p>
            </div>
          </div>
        </div>

        <div className="cv-section">
          <h4>Ausbildung</h4>

          <div className="cv-item">
            <div className="cv-date">10/2012 - 04/2016</div>
            <div className="cv-details">
              <h5>Bachelor of Arts - Medien- und Kommunikationsdesign</h5>
              <p>Hochschule Macromedia, München</p>
              <p>
                Schwerpunkt: Games and Animation. Auslandssemester an der
                University of Greenwich, England. Abschlussnote: 1,8
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">10/2008 - 11/2010</div>
            <div className="cv-details">
              <h5>Diplom (FH) Betriebswirtschaftslehre</h5>
              <p>Universität der Bundeswehr, München</p>
              <p>Schwerpunkt: Logistik (nicht abgeschlossen)</p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">07/2007 - 06/2008</div>
            <div className="cv-details">
              <h5>Fachhochschulreife Wirtschaft</h5>
              <p>Bundeswehrfachschule, München</p>
              <p>Abschlussnote: 2,6</p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">08/1998 - 07/2001</div>
            <div className="cv-details">
              <h5>Ausbildung Kaufmann für Bürokommunikation</h5>
              <p>Deutsche Post AG, Oldenburg</p>
              <p>Abschlussnote: 2,0</p>
            </div>
          </div>
        </div>

        <div className="cv-section">
          <h4>Technische Fähigkeiten</h4>
          <ul className="cv-certifications">
            <li>
              <strong>Programmierung:</strong> JavaScript (sehr gut), TypeScript
              (sehr gut), HTML (sehr gut), CSS (gut), C# (gut)
            </li>
            <li>
              <strong>Frameworks & Tools:</strong> React, Node.js, Unity
              (zertifiziert), Storybook, Figma
            </li>
            <li>
              <strong>Design Software:</strong> Adobe Creative Cloud (sehr gut),
              Autodesk Cloud (gut), Balsamiq Mockups
            </li>
            <li>
              <strong>Office & Produktivität:</strong> MS Office (sehr gut)
            </li>
            <li>
              <strong>Spezialisierung:</strong> VR/AR/Mixed Reality, Game
              Design, UI/UX Design, 3D Entwicklung
            </li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Sprachen</h4>
          <ul className="cv-certifications">
            <li>Deutsch - Muttersprache</li>
            <li>Englisch - TOEFL 98 (C1)</li>
            <li>Französisch - Grundkenntnisse</li>
          </ul>
        </div>

        <div className="cv-section">
          <h4>Zusätzliche Qualifikationen</h4>
          <ul className="cv-certifications">
            <li>Ausbildungsbeauftragter (seit 2019)</li>
            <li>Betrieblicher Ersthelfer</li>
            <li>Führungserfahrung (bis zu 46 Mitarbeiter)</li>
            <li>Internationale Projekterfahrung</li>
            <li>Selbstständige Tätigkeit im Mediendesign</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Lebenslauf;
