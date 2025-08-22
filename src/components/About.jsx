import React from "react";
import ProfileCard from "./ProfileCard";

/**
 * About component - Landing page displaying personal introduction
 *
 * Features:
 * - Personal introduction and overview
 * - ProfileCard integration for contact information
 * - Call-to-action buttons for navigation
 * - Responsive layout for different screen sizes
 *
 * @returns {JSX.Element} About page component
 *
 * @todo Connect navigation buttons to actual routing
 * @todo Replace placeholder text with real content
 */
function About() {
  return (
    <div className="content">
      <ProfileCard />
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
