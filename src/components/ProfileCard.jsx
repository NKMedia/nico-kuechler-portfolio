import React from "react";

function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="profile-info">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Maria Nielsen"
          className="profile-img"
        />
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
  );
}

export default ProfileCard;
