import React from "react";
import ProfileCard from "./ProfileCard";

function Projekte() {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Projekte</h1>
        <h3>Ausgewählte Arbeiten & Entwicklungen</h3>

        <div className="project-grid">
          <div className="project-card">
            <h4>Flughafen München - Softwarelösungen</h4>
            <p>
              <strong>Zeitraum:</strong> 2017 - heute
            </p>
            <p>
              <strong>Technologien:</strong> React, Node.js, TypeScript, Figma
            </p>
            <p>
              Konzeption und Entwicklung individueller Softwarelösungen für FMG,
              Tochtergesellschaften und Lufthansa. Schwerpunkt auf
              Webentwicklung, UI/UX Design und Einführung moderner
              Frontend-Tools.
            </p>
          </div>

          <div className="project-card">
            <h4>VR/AR Mixed Reality Projekte</h4>
            <p>
              <strong>Zeitraum:</strong> 2012 - heute
            </p>
            <p>
              <strong>Technologien:</strong> Unity, C#, VR/AR SDKs
            </p>
            <p>
              Entwicklung immersiver VR- und AR-Anwendungen für verschiedene
              Branchen. Von industriellen Trainingssimulatoren bis hin zu
              interaktiven Präsentationslösungen - Unity-zertifizierte
              Entwicklung.
            </p>
          </div>

          <div className="project-card">
            <h4>3D Navigation Prototyp</h4>
            <p>
              <strong>Zeitraum:</strong> 2014 - 2016
            </p>
            <p>
              <strong>Unternehmen:</strong> InfoGate Information Systems
            </p>
            <p>
              <strong>Technologien:</strong> Unity, 3D Modeling, UI/UX Design
            </p>
            <p>
              Entwicklung eines innovativen 3D-Navigationssystems für
              interaktive Informationssysteme. Kombination aus technischer
              Entwicklung und visueller Gestaltung.
            </p>
          </div>

          <div className="project-card">
            <h4>Nico Küchler Mediendesign</h4>
            <p>
              <strong>Zeitraum:</strong> 2012 - heute
            </p>
            <p>
              <strong>Services:</strong> Game Design, Videoproduktion,
              Fotografie
            </p>
            <p>
              Selbstständige Tätigkeit mit Fokus auf 3D-Konfiguratoren, Game
              Design, professionelle Videoproduktion und Fotografie.
              Vollständige Projektbetreuung von der Konzeption bis zur
              Umsetzung.
            </p>
          </div>

          <div className="project-card">
            <h4>Digitalisierung Fachbibliotheken</h4>
            <p>
              <strong>Zeitraum:</strong> 2005 - 2006
            </p>
            <p>
              <strong>Organisation:</strong> NATO E3-A Verband
            </p>
            <p>
              Projektleitung für die Digitalisierung militärischer
              Fachbibliotheken. Frühe Erfahrungen in der digitalen
              Transformation und Informationssystem-Management.
            </p>
          </div>

          <div className="project-card">
            <h4>Web- & Grafikdesign Projekte</h4>
            <p>
              <strong>Zeitraum:</strong> 2014 - heute
            </p>
            <p>
              <strong>Tools:</strong> Adobe Creative Cloud, CAD, Video Editing
            </p>
            <p>
              Vielfältige Projekte im Bereich Produktrenderings, CAD-Pläne,
              Werbevideos und Grafikdesign. Umfassende Expertise in der
              visuellen Kommunikation und Markenentwicklung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projekte;
