import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="dot" />
        <span className="name">Maria Nielsen</span>
        <span className="role">/ PROJEKTMANAGERIN</span>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            ÜBER MICH
          </Link>
          <Link
            to="/lebenslauf"
            className={location.pathname === "/lebenslauf" ? "active" : ""}
          >
            LEBENSLAUF
          </Link>
          <Link
            to="/projekte"
            className={location.pathname === "/projekte" ? "active" : ""}
          >
            PROJEKTE
          </Link>
          <Link
            to="/kontakt"
            className={location.pathname === "/kontakt" ? "active" : ""}
          >
            KONTAKT
          </Link>
        </nav>
        <ThemeToggle />
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={closeMenu}
        >
          ÜBER MICH
        </Link>
        <Link
          to="/lebenslauf"
          className={location.pathname === "/lebenslauf" ? "active" : ""}
          onClick={closeMenu}
        >
          LEBENSLAUF
        </Link>
        <Link
          to="/projekte"
          className={location.pathname === "/projekte" ? "active" : ""}
          onClick={closeMenu}
        >
          PROJEKTE
        </Link>
        <Link
          to="/kontakt"
          className={location.pathname === "/kontakt" ? "active" : ""}
          onClick={closeMenu}
        >
          KONTAKT
        </Link>
      </nav>
    </header>
  );
}

export default Header;
