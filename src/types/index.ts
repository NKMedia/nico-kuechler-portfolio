/**
 * Type definitions for the portfolio application
 */

// Common types
export interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  xing: string;
}

export interface Features {
  contactForm: boolean;
  analytics: boolean;
  pwa: boolean;
}

export interface ApiConfig {
  baseUrl: string;
  contactEndpoint: string;
  timeout: number;
}

export interface ThemeConfig {
  defaultTheme: "light" | "dark";
  storageKey: string;
  transitionDuration: string;
}

// Navigation types
export interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

// Form types
export interface FormConfig {
  maxNameLength: number;
  maxSubjectLength: number;
  maxMessageLength: number;
  emailRegex: RegExp;
  requiredFields: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  missingFields?: string[];
  details?: {
    required: ValidationResult;
    lengths: ValidationResult;
    email: boolean;
  };
}

export interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

// Utility types
export interface StorageOptions {
  serialize?: boolean;
  expire?: number;
}

export interface MailtoParams {
  to: string;
  subject?: string;
  body?: string;
}

export interface ElementDimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface ScrollOptions {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
}

// Performance monitoring types
export interface PerformanceMetrics {
  [key: string]: number | string;
}

export interface NavigationTiming {
  domContentLoaded: number;
  loadComplete: number;
  ttfb: number;
  domInteractive: number;
  totalPageLoad: number;
}

export interface ResourceMetrics {
  totalResources: number;
  imageCount: number;
  scriptCount: number;
  cssCount: number;
  averageLoadTime: number;
}

export interface ConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export interface PerformanceReport {
  timestamp: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  connection: ConnectionInfo | null;
  metrics: PerformanceMetrics;
}

// Component prop types
export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// Device types
export type DeviceType = "mobile" | "tablet" | "desktop";

// Theme types
export type ThemeMode = "light" | "dark";

// Feature detection types
export type SupportedFeature =
  | "serviceWorker"
  | "localStorage"
  | "notifications"
  | "geolocation";

// Service Worker types
export interface ServiceWorkerConfig {
  scope?: string;
  updateViaCache?: "imports" | "all" | "none";
}

export interface SyncEvent extends Event {
  tag: string;
  lastChance: boolean;
  waitUntil(promise: Promise<any>): void;
}

// Project/Portfolio specific types
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  period: string;
  organization?: string;
  highlights?: string[];
  images?: string[];
  links?: {
    demo?: string;
    code?: string;
    case_study?: string;
  };
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
  grade?: string;
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "programming" | "design" | "tools" | "soft-skills";
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
}

// Event handler types
export type FormChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
export type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
export type ButtonClickHandler = (
  e: React.MouseEvent<HTMLButtonElement>
) => void;
export type LinkClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => void;

// Custom hook types
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

export interface UseThemeReturn {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export interface UseFormReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
  handleChange: FormChangeHandler;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => FormSubmitHandler;
  reset: () => void;
  setFieldError: (field: keyof T, error: string) => void;
  clearErrors: () => void;
}

// Environment and configuration types
export interface Constants {
  APP_CONFIG: AppConfig;
  CONTACT_INFO: ContactInfo;
  SOCIAL_LINKS: SocialLinks;
  FEATURES: Features;
  API_CONFIG: ApiConfig;
  THEME_CONFIG: ThemeConfig;
  NAVIGATION_ITEMS: NavigationItem[];
  FORM_CONFIG: FormConfig;
  ERROR_MESSAGES: Record<string, string>;
  SUCCESS_MESSAGES: Record<string, string>;
  BREAKPOINTS: Record<string, string>;
  ANIMATIONS: Record<string, string>;
  STORAGE_KEYS: Record<string, string>;
  DEV_CONFIG: Record<string, any>;
}

// Performance and Analytics types
export interface DetailedPerformanceMetrics {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  entries: PerformanceEntry[];
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, string | number>;
}

export interface PerformanceConfig {
  measureWebVitals?: boolean;
  trackResources?: boolean;
  trackLongTasks?: boolean;
}

export interface DetailedPerformanceReport {
  timestamp: string;
  url: string;
  userAgent: string;
  connection: ConnectionInfo | null;
  timing: {
    navigationStart: number;
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number;
    firstContentfulPaint: number;
  };
  resources: number;
  memoryUsage: number;
}
