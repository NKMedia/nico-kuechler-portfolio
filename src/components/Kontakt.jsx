import React, { useState } from "react";
import ProfileCard from "./ProfileCard";

/**
 * Kontakt component - Contact page with form and contact information
 *
 * Features:
 * - Contact information display
 * - Functional contact form with validation
 * - Form submission via mailto or external service
 * - Loading states and user feedback
 *
 * @returns {JSX.Element} Contact page component
 */
function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  /**
   * Handle input field changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any previous status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  /**
   * Validate form data
   * @returns {boolean} - Whether form is valid
   */
  const validateForm = () => {
    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Bitte füllen Sie alle Pflichtfelder aus.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        type: "error",
        message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      });
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create mailto link as fallback
      const mailtoLink = `mailto:mail@nico-kuechler.de?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nE-Mail: ${formData.email}\n\nNachricht:\n${formData.message}`
      )}`;

      // For now, use mailto. In production, you would typically send to a backend service
      window.location.href = mailtoLink;

      // Simulate success state
      setTimeout(() => {
        setSubmitStatus({
          type: "success",
          message:
            "Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die Nachricht ab.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt.",
      });
      setIsSubmitting(false);
    }
  };

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
            <p>mail@nico-kuechler.de</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-phone"></i> Telefon
            </h4>
            <p>+49 171 816 816 4</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-map-marker-alt"></i> Standort
            </h4>
            <p>Maisach (Gernlinden), Bayern</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-briefcase"></i> Verfügbarkeit
            </h4>
            <p>Freelance-Projekte & Beratung</p>
          </div>
        </div>

        <div className="contact-form">
          <h4>Nachricht senden</h4>

          {submitStatus && (
            <div className={`status-message ${submitStatus.type}`}>
              <i
                className={`fas ${
                  submitStatus.type === "success"
                    ? "fa-check-circle"
                    : "fa-exclamation-triangle"
                }`}
              ></i>
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ihr Name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ihre.email@beispiel.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Betreff *</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Betreff Ihrer Nachricht"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Nachricht *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-blue" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Wird gesendet...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i> Nachricht senden
                </>
              )}
            </button>
          </form>
          <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "1rem" }}>
            * Pflichtfelder. Die Nachricht wird über Ihr
            Standard-E-Mail-Programm gesendet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
