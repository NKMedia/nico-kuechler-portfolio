import { Link } from "react-router-dom";

/**
 * Footer component with legal links and contact information
 *
 * @returns Footer component
 */
function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      <div className="footer-left">
        <Link to="/impressum" className="footer-link">
          Impressum
        </Link>
        <Link to="/datenschutz" className="footer-link">
          Datenschutz
        </Link>
        <div className="footer-copyright">
          © 2025 Nico Küchler Mediendesign.
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-contact">
          <div>
            <b>Telefon</b>
            <br />
            +49 (0)171 8168164
          </div>
          <div>
            <b>E-Mail</b>
            <br />
            mail@nico-kuechler.de
          </div>
          <div>
            <b>Socials</b>
            <br />
            <a
              href="mailto:mail@nico-kuechler.de"
              aria-label="E-Mail"
              title="E-Mail senden"
            >
              <i className="fas fa-envelope" />
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
    </footer>
  );
}

export default Footer;
