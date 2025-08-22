import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound component - 404 error page for unmatched routes
 *
 * Features:
 * - User-friendly 404 error message
 * - Navigation back to home page
 * - Consistent styling with the rest of the site
 * - Helpful suggestions for users
 *
 * @returns {JSX.Element} 404 error page component
 */
function NotFound() {
  return (
    <div className="content">
      <div
        className="profile-main"
        style={{ textAlign: "center", padding: "4rem 2rem" }}
      >
        <div
          style={{ fontSize: "6rem", color: "#2563eb", marginBottom: "1rem" }}
        >
          404
        </div>
        <h1>Seite nicht gefunden</h1>
        <h3 style={{ marginBottom: "2rem", color: "#666" }}>
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </h3>

        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            Möglicherweise haben Sie sich in der URL vertippt oder die Seite
            wurde entfernt.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" className="btn-blue">
              <i className="fas fa-home"></i> Zur Startseite
            </Link>
            <Link to="/lebenslauf" className="btn-outline">
              <i className="fas fa-user"></i> Lebenslauf
            </Link>
            <Link to="/projekte" className="btn-outline">
              <i className="fas fa-briefcase"></i> Projekte
            </Link>
            <Link to="/kontakt" className="btn-outline">
              <i className="fas fa-envelope"></i> Kontakt
            </Link>
          </div>
        </div>

        <div
          style={{
            background: "rgba(37, 99, 235, 0.1)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            borderRadius: "12px",
            padding: "1.5rem",
            margin: "2rem auto",
            maxWidth: "500px",
          }}
        >
          <h4 style={{ marginBottom: "1rem", color: "#2563eb" }}>
            <i className="fas fa-lightbulb"></i> Suchen Sie etwas Bestimmtes?
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              textAlign: "left",
              lineHeight: "1.8",
            }}
          >
            <li>
              <strong>Über mich:</strong> Informationen zu meiner Person und
              Arbeitsweise
            </li>
            <li>
              <strong>Lebenslauf:</strong> Beruflicher Werdegang und
              Qualifikationen
            </li>
            <li>
              <strong>Projekte:</strong> Portfolio meiner aktuellen und
              vergangenen Arbeiten
            </li>
            <li>
              <strong>Kontakt:</strong> Kontaktformular und Verfügbarkeit für
              neue Projekte
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
