import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <button type="button" className="footer-link">
          Impressum
        </button>
        <button type="button" className="footer-link">
          Datenschutz
        </button>
        <button type="button" className="footer-link">
          AGB
        </button>
        <div className="footer-copyright">© 2035 Nico Küchler.</div>
      </div>
      <div className="footer-right">
        <div className="footer-contact">
          <div>
            <b>Telefon</b>
            <br />
            +49 (0) 456 7890
          </div>
          <div>
            <b>E-Mail</b>
            <br />
            info@website.com
          </div>
          <div>
            <b>Socials</b>
            <br />
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
    </footer>
  );
}

export default Footer;
