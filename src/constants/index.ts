/**
 * Application constants and configuration
 * Centralized place for all hardcoded values and environment variables
 */

import type {
  AppConfig,
  ContactInfo,
  SocialLinks,
  Features,
  ApiConfig,
  ThemeConfig,
  NavigationItem,
  FormConfig,
  Constants,
} from "../types";

// App Information
export const APP_CONFIG: AppConfig = {
  name: import.meta.env.VITE_APP_NAME || "Nico Küchler Portfolio",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  description:
    "Portfolio website of Nico Küchler - Senior Software Developer & Media Designer",
  author: "Nico Küchler",
  url: "https://nico-kuechler.de",
};

// Contact Information
export const CONTACT_INFO: ContactInfo = {
  email: import.meta.env.VITE_CONTACT_EMAIL || "mail@nico-kuechler.de",
  phone: import.meta.env.VITE_CONTACT_PHONE || "+49 171 816 816 4",
  location:
    import.meta.env.VITE_CONTACT_LOCATION || "Maisach (Gernlinden), Bayern",
  availability: "Freelance-Projekte & Beratung",
};

// Social Media Links
export const SOCIAL_LINKS: SocialLinks = {
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "#",
  github: import.meta.env.VITE_GITHUB_URL || "#",
  xing: import.meta.env.VITE_XING_URL || "#",
};

// Feature Flags
export const FEATURES: Features = {
  contactForm: import.meta.env.VITE_ENABLE_CONTACT_FORM === "true",
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  pwa: import.meta.env.VITE_ENABLE_PWA === "true",
};

// API Configuration
export const API_CONFIG: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "",
  contactEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "/api/contact",
  timeout: 10000, // 10 seconds
};

// Theme Configuration
export const THEME_CONFIG: ThemeConfig = {
  defaultTheme: "light",
  storageKey: "theme",
  transitionDuration: "0.3s",
};

// Navigation Items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { path: "/", label: "ÜBER MICH", icon: "fas fa-user" },
  { path: "/lebenslauf", label: "LEBENSLAUF", icon: "fas fa-file-alt" },
  { path: "/projekte", label: "PROJEKTE", icon: "fas fa-briefcase" },
  { path: "/kontakt", label: "KONTAKT", icon: "fas fa-envelope" },
];

// Form Configuration
export const FORM_CONFIG: FormConfig = {
  maxNameLength: 100,
  maxSubjectLength: 200,
  maxMessageLength: 2000,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  requiredFields: ["name", "email", "subject", "message"],
};

// Error Messages
export const ERROR_MESSAGES = {
  required: "Bitte füllen Sie alle Pflichtfelder aus.",
  invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  nameTooLong: `Name darf maximal ${FORM_CONFIG.maxNameLength} Zeichen lang sein.`,
  subjectTooLong: `Betreff darf maximal ${FORM_CONFIG.maxSubjectLength} Zeichen lang sein.`,
  messageTooLong: `Nachricht darf maximal ${FORM_CONFIG.maxMessageLength} Zeichen lang sein.`,
  submitError:
    "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt.",
  networkError: "Netzwerkfehler. Bitte prüfen Sie Ihre Internetverbindung.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  formSubmit:
    "Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die Nachricht ab.",
  themeChanged: "Theme erfolgreich geändert",
} as const;

// Responsive Breakpoints
export const BREAKPOINTS: Record<string, string> = {
  mobile: "480px",
  tablet: "850px",
  desktop: "1000px",
  largeDesktop: "1400px",
};

// Animation Durations
export const ANIMATIONS: Record<string, string> = {
  fast: "0.2s",
  normal: "0.3s",
  slow: "0.5s",
  fadeIn: "0.6s",
};

// Local Storage Keys
export const STORAGE_KEYS: Record<string, string> = {
  theme: "theme",
  userPreferences: "userPreferences",
  contactFormData: "contactFormData",
};

// Development Configuration
export const DEV_CONFIG: Record<string, boolean> = {
  showErrorDetails: import.meta.env.NODE_ENV === "development",
  enableLogging: import.meta.env.NODE_ENV === "development",
  showPerformanceMetrics: import.meta.env.NODE_ENV === "development",
};

const constants: Constants = {
  APP_CONFIG,
  CONTACT_INFO,
  SOCIAL_LINKS,
  FEATURES,
  API_CONFIG,
  THEME_CONFIG,
  NAVIGATION_ITEMS,
  FORM_CONFIG,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  BREAKPOINTS,
  ANIMATIONS,
  STORAGE_KEYS,
  DEV_CONFIG,
};

export default constants;
