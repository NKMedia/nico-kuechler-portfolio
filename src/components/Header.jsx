import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-left">
        <span className="dot" />
        <span className="name">Maria Nielsen</span>
        <span className="role">/ PROJEKTMANAGERIN</span>
      </div>
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
    </header>
  );
}

export default Header;
