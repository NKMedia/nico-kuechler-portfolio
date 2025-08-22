import React from "react";
import ProfileCard from "./ProfileCard";

function Projekte() {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Projekte</h1>
        <h3>Meine erfolgreichen Projekte</h3>

        <div className="project-grid">
          <div className="project-card">
            <h4>E-Commerce Platform</h4>
            <p>
              <strong>Zeitraum:</strong> 2023 - 2024
            </p>
            <p>
              <strong>Team:</strong> 12 Entwickler, 3 Designer
            </p>
            <p>
              <strong>Technologien:</strong> React, Node.js, MongoDB
            </p>
            <p>
              Entwicklung einer skalierbaren E-Commerce-Plattform für ein
              mittelständisches Unternehmen mit über 50.000 Produkten.
            </p>
          </div>

          <div className="project-card">
            <h4>Mobile Banking App</h4>
            <p>
              <strong>Zeitraum:</strong> 2022 - 2023
            </p>
            <p>
              <strong>Team:</strong> 8 Entwickler, 2 UX Designer
            </p>
            <p>
              <strong>Technologien:</strong> React Native, Firebase
            </p>
            <p>
              Projektleitung für die Entwicklung einer sicheren Banking-App mit
              biometrischer Authentifizierung.
            </p>
          </div>

          <div className="project-card">
            <h4>CRM System</h4>
            <p>
              <strong>Zeitraum:</strong> 2021 - 2022
            </p>
            <p>
              <strong>Team:</strong> 6 Entwickler
            </p>
            <p>
              <strong>Technologien:</strong> Vue.js, Laravel, MySQL
            </p>
            <p>
              Implementation eines maßgeschneiderten CRM-Systems zur Optimierung
              der Kundenbeziehungen.
            </p>
          </div>

          <div className="project-card">
            <h4>IoT Dashboard</h4>
            <p>
              <strong>Zeitraum:</strong> 2020 - 2021
            </p>
            <p>
              <strong>Team:</strong> 5 Entwickler, 1 Data Scientist
            </p>
            <p>
              <strong>Technologien:</strong> Angular, Python, InfluxDB
            </p>
            <p>
              Entwicklung eines Real-time Dashboards zur Überwachung von
              IoT-Geräten in der Industrie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projekte;
