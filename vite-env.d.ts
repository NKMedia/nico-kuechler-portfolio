/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Custom application environment variables
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_LOCATION: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_XING_URL: string;
  readonly VITE_ENABLE_CONTACT_FORM: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_PWA: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CONTACT_FORM_ENDPOINT: string;
  readonly VITE_GA_TRACKING_ID: string;
  readonly NODE_ENV: string;
}

// Module declarations for static assets
declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.ico" {
  const src: string;
  export default src;
}
