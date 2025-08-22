/**
 * Utility functions for common operations throughout the application
 * Centralized place for reusable helper functions
 */

import type {
  ContactFormData,
  ValidationResult,
  MailtoParams,
  ElementDimensions,
  ScrollOptions,
  DeviceType,
  SupportedFeature,
} from "../types";
import { FORM_CONFIG, ERROR_MESSAGES } from "../constants";

/**
 * Form validation utilities
 */
export const validation = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  isValidEmail: (email: string): boolean => {
    return FORM_CONFIG.emailRegex.test(email);
  },

  /**
   * Validate required fields
   * @param {ContactFormData} formData - Form data object
   * @param {string[]} requiredFields - Array of required field names
   * @returns {ValidationResult} - Validation result with isValid and errors
   */
  validateRequired: (
    formData: ContactFormData,
    requiredFields: string[] = FORM_CONFIG.requiredFields
  ): ValidationResult => {
    const errors: string[] = [];
    const missing = requiredFields.filter((field) => {
      const value = formData[field as keyof ContactFormData];
      return !value?.toString().trim();
    });

    if (missing.length > 0) {
      errors.push(ERROR_MESSAGES.required);
    }

    return {
      isValid: errors.length === 0,
      errors,
      missingFields: missing,
    };
  },

  /**
   * Validate field lengths
   * @param {ContactFormData} formData - Form data object
   * @returns {ValidationResult} - Validation result
   */
  validateLengths: (formData: ContactFormData): ValidationResult => {
    const errors: string[] = [];

    if (formData.name && formData.name.length > FORM_CONFIG.maxNameLength) {
      errors.push(ERROR_MESSAGES.nameTooLong);
    }

    if (
      formData.subject &&
      formData.subject.length > FORM_CONFIG.maxSubjectLength
    ) {
      errors.push(ERROR_MESSAGES.subjectTooLong);
    }

    if (
      formData.message &&
      formData.message.length > FORM_CONFIG.maxMessageLength
    ) {
      errors.push(ERROR_MESSAGES.messageTooLong);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Comprehensive form validation
   * @param {ContactFormData} formData - Form data object
   * @returns {ValidationResult} - Complete validation result
   */
  validateForm: (formData: ContactFormData): ValidationResult => {
    const requiredCheck = validation.validateRequired(formData);
    const lengthCheck = validation.validateLengths(formData);
    const emailValid = formData.email
      ? validation.isValidEmail(formData.email)
      : true;

    const errors = [
      ...requiredCheck.errors,
      ...lengthCheck.errors,
      ...(emailValid ? [] : [ERROR_MESSAGES.invalidEmail]),
    ];

    return {
      isValid: errors.length === 0,
      errors,
      details: {
        required: requiredCheck,
        lengths: lengthCheck,
        email: emailValid,
      },
    };
  },
};

/**
 * Local Storage utilities
 */
export const storage = {
  /**
   * Get item from localStorage with error handling
   * @param {string} key - Storage key
   * @param {T} defaultValue - Default value if key doesn't exist
   * @returns {T} - Stored value or default
   */
  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage with error handling
   * @param {string} key - Storage key
   * @param {unknown} value - Value to store
   * @returns {boolean} - Success status
   */
  setItem: (key: string, value: unknown): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Error setting localStorage:", error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} - Success status
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   * @returns {boolean} - Success status
   */
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },
};

/**
 * URL and navigation utilities
 */
export const navigation = {
  /**
   * Get current route path
   * @returns {string} - Current path
   */
  getCurrentPath: (): string => {
    return window.location.pathname;
  },

  /**
   * Check if current path matches route
   * @param {string} route - Route to check
   * @returns {boolean} - Whether routes match
   */
  isCurrentRoute: (route: string): boolean => {
    return navigation.getCurrentPath() === route;
  },

  /**
   * Generate mailto link
   * @param {MailtoParams} params - Email parameters
   * @returns {string} - Mailto URL
   */
  generateMailto: ({ to, subject = "", body = "" }: MailtoParams): string => {
    const params = new URLSearchParams();
    if (subject) params.append("subject", subject);
    if (body) params.append("body", body);

    return `mailto:${to}?${params.toString()}`;
  },

  /**
   * Open external link in new tab
   * @param {string} url - URL to open
   */
  openLinkInNewTab: (url: string): void => {
    window.open(url, "_blank", "noopener,noreferrer");
  },

  /**
   * Navigate to URL in current tab
   * @param {string} url - URL to navigate to
   */
  navigateToUrl: (url: string): void => {
    window.location.href = url;
  },
};

/**
 * DOM utilities
 */
export const dom = {
  /**
   * Scroll to element smoothly
   * @param {string | Element} selector - Element selector or element
   * @param {ScrollOptions} options - Scroll options
   */
  scrollToElement: (
    selector: string | Element,
    options: ScrollOptions = {}
  ): void => {
    const element =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        ...options,
      });
    }
  },

  /**
   * Add CSS class with optional timeout
   * @param {Element | null} element - Target element
   * @param {string} className - Class to add
   * @param {number} timeout - Optional timeout to remove class
   */
  addClass: (element: Element | null, className: string, timeout = 0): void => {
    if (element) {
      element.classList.add(className);

      if (timeout > 0) {
        setTimeout(() => {
          element.classList.remove(className);
        }, timeout);
      }
    }
  },

  /**
   * Toggle CSS class
   * @param {Element | null} element - Target element
   * @param {string} className - Class to toggle
   * @returns {boolean} - Whether class is now present
   */
  toggleClass: (element: Element | null, className: string): boolean => {
    if (element) {
      return element.classList.toggle(className);
    }
    return false;
  },

  /**
   * Get element dimensions
   * @param {Element | null} element - Target element
   * @returns {ElementDimensions | null} - Dimensions object
   */
  getDimensions: (element: Element | null): ElementDimensions | null => {
    if (!element) return null;

    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    };
  },
};

/**
 * Performance utilities
 */
export const performance = {
  /**
   * Debounce function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Whether to call immediately
   * @returns {Function} - Debounced function
   */
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    immediate = false
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} - Throttled function
   */
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return function executedFunction(...args: Parameters<T>) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  },

  /**
   * Measure function execution time
   * @param {Function} func - Function to measure
   * @param {string} label - Label for console output
   * @returns {unknown} - Function result
   */
  measureTime: <T>(func: () => T, label = "Function"): T => {
    const start = globalThis.performance.now();
    const result = func();
    const end = globalThis.performance.now();
    console.log(`${label} execution time: ${(end - start).toFixed(2)}ms`);
    return result;
  },
};

/**
 * Date and time utilities
 */
export const datetime = {
  /**
   * Format date to German locale
   * @param {Date | string} date - Date to format
   * @param {Intl.DateTimeFormatOptions} options - Intl.DateTimeFormat options
   * @returns {string} - Formatted date
   */
  formatDate: (
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {}
  ): string => {
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    }).format(dateObj);
  },

  /**
   * Get relative time string
   * @param {Date | string} date - Date to compare
   * @returns {string} - Relative time string
   */
  getRelativeTime: (date: Date | string): string => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - dateObj.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "vor wenigen Sekunden";
    if (diffInSeconds < 3600)
      return `vor ${Math.floor(diffInSeconds / 60)} Minuten`;
    if (diffInSeconds < 86400)
      return `vor ${Math.floor(diffInSeconds / 3600)} Stunden`;
    if (diffInSeconds < 2592000)
      return `vor ${Math.floor(diffInSeconds / 86400)} Tagen`;

    return datetime.formatDate(dateObj);
  },
};

/**
 * Device and browser detection
 */
export const device = {
  /**
   * Check if device is mobile
   * @returns {boolean} - Whether device is mobile
   */
  isMobile: (): boolean => {
    return (
      window.innerWidth <= 850 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  },

  /**
   * Check if device is tablet
   * @returns {boolean} - Whether device is tablet
   */
  isTablet: (): boolean => {
    return window.innerWidth > 850 && window.innerWidth <= 1000;
  },

  /**
   * Check if device is desktop
   * @returns {boolean} - Whether device is desktop
   */
  isDesktop: (): boolean => {
    return window.innerWidth > 1000;
  },

  /**
   * Get device type
   * @returns {DeviceType} - Device type
   */
  getDeviceType: (): DeviceType => {
    if (device.isMobile()) return "mobile";
    if (device.isTablet()) return "tablet";
    return "desktop";
  },

  /**
   * Check if browser supports feature
   * @param {SupportedFeature} feature - Feature to check
   * @returns {boolean} - Whether feature is supported
   */
  supportsFeature: (feature: SupportedFeature): boolean => {
    switch (feature) {
      case "serviceWorker":
        return "serviceWorker" in navigator;
      case "localStorage":
        return "localStorage" in window;
      case "notifications":
        return "Notification" in window;
      case "geolocation":
        return "geolocation" in navigator;
      default:
        return false;
    }
  },
};

/**
 * Clipboard utilities
 */
export const clipboard = {
  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} - Success status
   */
  copy: async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers (deprecated but necessary for compatibility)
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand("copy"); // eslint-disable-line deprecation/deprecation
        document.body.removeChild(textArea);
        return success;
      }
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      return false;
    }
  },
};

// Export all utilities as default
export default {
  validation,
  storage,
  navigation,
  dom,
  performance,
  datetime,
  device,
  clipboard,
};
