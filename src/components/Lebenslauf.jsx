import React from "react";

function Lebenslauf() {
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
        <h1>Lebenslauf</h1>
        <h3>Meine berufliche Laufbahn</h3>

        <div className="cv-section">
          <h4>Berufserfahrung</h4>
          <div className="cv-item">
            <div className="cv-date">2020 - heute</div>
            <div className="cv-details">
              <h5>Senior Projektmanagerin</h5>
              <p>TechCorp GmbH, Berlin</p>
              <p>
                Leitung von agilen Softwareentwicklungsprojekten mit Teams von
                8-15 Entwicklern. Verantwortlich für Budget-Management und
                Stakeholder-Kommunikation.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">2018 - 2020</div>
            <div className="cv-details">
              <h5>Projektmanagerin</h5>
              <p>Digital Solutions AG, Hamburg</p>
              <p>
                Koordination von Web-Development-Projekten. Einführung von
                Scrum-Methoden und Optimierung der Projektabläufe.
              </p>
            </div>
          </div>

          <div className="cv-item">
            <div className="cv-date">2016 - 2018</div>
            <div className="cv-details">
              <h5>Junior Projektkoordinatorin</h5>
              <p>StartUp Innovation GmbH, München</p>
              <p>
                Unterstützung bei der Planung und Durchführung von IT-Projekten.
                Erste Erfahrungen im agilen Projektmanagement.
              </p>
            </div>
          </div>
        </div>

        <div className="cv-section">
          <h4>Ausbildung</h4>
          <div className="cv-item">
            <div className="cv-date">2013 - 2016</div>
            <div className="cv-details">
              <h5>Bachelor of Science Wirtschaftsinformatik</h5>
              <p>Technische Universität München</p>
              <p>Schwerpunkt: Projektmanagement und Software Engineering</p>
            </div>
          </div>
        </div>

        <div className="cv-section">
          <h4>Zertifizierungen</h4>
          <ul className="cv-certifications">
            <li>Certified ScrumMaster (CSM)</li>
            <li>Project Management Professional (PMP)</li>
            <li>Agile Project Management (APM)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Lebenslauf;
