import React from "react";
import ProfileCard from "./ProfileCard";

function Kontakt() {
  return (
    <div className="content">
      <ProfileCard />
      <div className="profile-main">
        <h1>Kontakt</h1>
        <h3>Lassen Sie uns zusammenarbeiten</h3>

        <div className="contact-info">
          <div className="contact-item">
            <h4>
              <i className="fas fa-envelope"></i> E-Mail
            </h4>
            <p>maria.nielsen@email.com</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-phone"></i> Telefon
            </h4>
            <p>+49 (0) 456 7890</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-map-marker-alt"></i> Standort
            </h4>
            <p>Berlin, Deutschland</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fab fa-linkedin"></i> LinkedIn
            </h4>
            <p>linkedin.com/in/maria-nielsen</p>
          </div>
        </div>

        <div className="contact-form">
          <h4>Nachricht senden</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Ihr Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail</label>
              <input
                id="email"
                type="email"
                placeholder="ihre.email@beispiel.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Betreff</label>
              <input
                id="subject"
                type="text"
                placeholder="Betreff Ihrer Nachricht"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Nachricht</label>
              <textarea
                id="message"
                placeholder="Ihre Nachricht..."
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="btn-blue">
              Nachricht senden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
