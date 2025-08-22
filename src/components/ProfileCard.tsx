import nicoPhoto from "../assets/nico_kuechler.jpg";

/**
 * ProfileCard component displaying personal information and contact links
 *
 * Features:
 * - Profile image with alt text for accessibility
 * - Personal information (name, role)
 * - Contact links (email, phone, professional networks)
 * - Responsive design for different screen sizes
 *
 * @returns Profile card component
 */
function ProfileCard(): React.ReactElement {
  return (
    <div className="profile-card">
      <div className="profile-info">
        <img src={nicoPhoto} alt="Nico Küchler" className="profile-img" />
        <h2>Nico Küchler</h2>
        <div className="profile-role">
          SENIOR SOFTWARE DEVELOPER & MEDIA DESIGNER
        </div>
        <hr className="profile-hr" />
        <div className="profile-socials">
          <a
            href="mailto:mail@nico-kuechler.de"
            aria-label="E-Mail"
            title="E-Mail senden"
          >
            <i className="fas fa-envelope" />
          </a>
          <a href="tel:+491718168164" aria-label="Telefon" title="Anrufen">
            <i className="fas fa-phone" />
          </a>
          <a
            href="https://www.linkedin.com/in/nico-kuechler-9337a762/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn Profil"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            href="https://github.com/levoram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub Profil"
          >
            <i className="fab fa-github" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
