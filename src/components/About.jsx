import React from "react";

function About() {
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
        <h1>Hallo</h1>
        <h3>Wer ich bin &amp; was ich mache</h3>
        <div className="profile-buttons">
          <button className="btn-blue">LEBENSLAUF</button>
          <button className="btn-outline">PROJEKTE</button>
        </div>
        <p className="profile-desc">
          Ich bin ein Textabschnitt. Klicken Sie hier, um einen Text
          hinzuzufügen und mich zu bearbeiten. Klicken Sie auf „Text bearbeiten"
          oder doppelklicken Sie, um loszulegen.
          <br />
          <br />
          Dies ist der ideale Ort, um einen langen Text über Ihr Unternehmen zu
          schreiben.
        </p>
      </div>
    </div>
  );
}

export default About;
