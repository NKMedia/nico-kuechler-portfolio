import { useState } from "react";
import ProfileCard from "./ProfileCard";
import { validation, navigation } from "../utils";
import { useForm } from "../hooks";
import { CONTACT_INFO, SUCCESS_MESSAGES } from "../constants";
import { ContactFormData, SubmitStatus } from "../types";

/**
 * Kontakt component - Contact page with form and contact information
 *
 * Features:
 * - Contact information display
 * - Functional contact form with validation
 * - Form submission via mailto or external service
 * - Loading states and user feedback
 *
 * @returns Contact page component
 */
function Kontakt(): React.ReactElement {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  // Form validation function
  const validateContactForm = (formData: ContactFormData) => {
    const validationResult = validation.validateForm(formData);
    const errors: Record<keyof ContactFormData, string> = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!validationResult.isValid) {
      for (const error of validationResult.errors) {
        if (error.includes("Name")) errors.name = error;
        else if (error.includes("E-Mail")) errors.email = error;
        else if (error.includes("Betreff")) errors.subject = error;
        else if (error.includes("Nachricht")) errors.message = error;
      }
    }

    return errors;
  };

  // Use form hook
  const form = useForm<ContactFormData>(
    {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validateContactForm
  );

  /**
   * Handle form submission
   */
  const handleFormSubmit = async (formData: ContactFormData): Promise<void> => {
    setSubmitStatus(null);

    try {
      // Create mailto link as fallback
      const mailtoLink = navigation.generateMailto({
        to: CONTACT_INFO.email,
        subject: formData.subject,
        body: `Name: ${formData.name}\nE-Mail: ${formData.email}\n\nNachricht:\n${formData.message}`,
      });

      // For now, use mailto. In production, you would typically send to a backend service
      navigation.navigateToUrl(mailtoLink);

      // Simulate success state
      setTimeout(() => {
        setSubmitStatus({
          type: "success",
          message: SUCCESS_MESSAGES.formSubmit,
        });
        form.reset();
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt.",
      });
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
            <p>{CONTACT_INFO.email}</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-phone"></i> Telefon
            </h4>
            <p>{CONTACT_INFO.phone}</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-map-marker-alt"></i> Standort
            </h4>
            <p>{CONTACT_INFO.location}</p>
          </div>

          <div className="contact-item">
            <h4>
              <i className="fas fa-briefcase"></i> Verfügbarkeit
            </h4>
            <p>{CONTACT_INFO.availability}</p>
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

          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ihr Name"
                value={form.values.name}
                onChange={form.handleChange}
                disabled={form.isSubmitting}
                required
                aria-describedby={
                  form.hasFieldError("name") ? "name-error" : undefined
                }
                aria-invalid={form.hasFieldError("name")}
              />
              {form.hasFieldError("name") && (
                <div id="name-error" className="field-error" role="alert">
                  {form.getFieldError("name")}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Mail *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ihre.email@beispiel.com"
                value={form.values.email}
                onChange={form.handleChange}
                disabled={form.isSubmitting}
                required
                aria-describedby={
                  form.hasFieldError("email") ? "email-error" : undefined
                }
                aria-invalid={form.hasFieldError("email")}
              />
              {form.hasFieldError("email") && (
                <div id="email-error" className="field-error" role="alert">
                  {form.getFieldError("email")}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="subject">Betreff *</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Betreff Ihrer Nachricht"
                value={form.values.subject}
                onChange={form.handleChange}
                disabled={form.isSubmitting}
                required
                aria-describedby={
                  form.hasFieldError("subject") ? "subject-error" : undefined
                }
                aria-invalid={form.hasFieldError("subject")}
              />
              {form.hasFieldError("subject") && (
                <div id="subject-error" className="field-error" role="alert">
                  {form.getFieldError("subject")}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="message">Nachricht *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                rows={5}
                value={form.values.message}
                onChange={form.handleChange}
                disabled={form.isSubmitting}
                required
                aria-describedby={
                  form.hasFieldError("message") ? "message-error" : undefined
                }
                aria-invalid={form.hasFieldError("message")}
              />
              {form.hasFieldError("message") && (
                <div id="message-error" className="field-error" role="alert">
                  {form.getFieldError("message")}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn-blue"
              disabled={form.isSubmitting}
            >
              {form.isSubmitting ? (
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
