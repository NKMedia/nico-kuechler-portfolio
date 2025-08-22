import React from "react";

function Projekte() {
  return (
    <div className="content">
      <div className="profile-card">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Maria Nielsen"
          className="profile-img"
        />
        <div className="profile-info">
          <h2>Maria Nielsen</h2>
          <div className="profile-role">PROJEKTMANAGERIN</div>
          <hr className="profile-hr" />
          <div className="profile-socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
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
