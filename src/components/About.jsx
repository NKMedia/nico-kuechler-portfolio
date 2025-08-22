import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";

/**
 * About component - Landing page displaying personal introduction
 *
 * Features:
 * - Personal introduction and overview
 * - ProfileCard integration for contact information
 * - Call-to-action buttons for navigation
 * - Responsive layout for different screen sizes
 *
 * @returns {JSX.Element} About page component
 */
function About() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Hallo</h1>
        <h3>Wer ich bin &amp; was ich mache</h3>
        <div className="profile-buttons">
          <button className="btn-blue" onClick={() => navigate("/lebenslauf")}>
            LEBENSLAUF
          </button>
          <button className="btn-outline" onClick={() => navigate("/projekte")}>
            PROJEKTE
          </button>
        </div>
        <p className="profile-desc">
          Ich bin Nico Küchler, Senior Software Developer und Media Designer mit
          über 10 Jahren Erfahrung in der Entwicklung innovativer digitaler
          Lösungen. Seit 2022 arbeite ich am Flughafen München, wo ich komplexe
          Softwareprojekte für die Luftfahrtbranche entwickle.
          <br />
          <br />
          Meine Leidenschaft liegt in der Verbindung von technischer Exzellenz
          und kreativem Design. Von React-Webanwendungen über VR/AR-Projekte bis
          hin zu 3D-Konfiguratoren - ich bringe Ihre digitalen Visionen zum
          Leben. Als selbstständiger Mediendesigner und zertifizierter
          Unity-Entwickler biete ich maßgeschneiderte Lösungen für Unternehmen
          jeder Größe.
        </p>
      </div>
    </div>
  );
}

export default About;
