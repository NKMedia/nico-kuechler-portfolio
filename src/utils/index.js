/**
 * Utility functions for common operations throughout the application
 * Centralized place for reusable helper functions
 */

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
  isValidEmail: (email) => {
    return FORM_CONFIG.emailRegex.test(email);
  },

  /**
   * Validate required fields
   * @param {Object} formData - Form data object
   * @param {Array} requiredFields - Array of required field names
   * @returns {Object} - Validation result with isValid and errors
   */
  validateRequired: (formData, requiredFields = FORM_CONFIG.requiredFields) => {
    const errors = [];
    const missing = requiredFields.filter((field) => !formData[field]?.trim());

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
   * @param {Object} formData - Form data object
   * @returns {Object} - Validation result
   */
  validateLengths: (formData) => {
    const errors = [];

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
   * @param {Object} formData - Form data object
   * @returns {Object} - Complete validation result
   */
  validateForm: (formData) => {
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
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} - Stored value or default
   */
  getItem: (key, defaultValue = null) => {
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
   * @param {*} value - Value to store
   * @returns {boolean} - Success status
   */
  setItem: (key, value) => {
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
  removeItem: (key) => {
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
  clear: () => {
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
  getCurrentPath: () => {
    return window.location.pathname;
  },

  /**
   * Check if current path matches route
   * @param {string} route - Route to check
   * @returns {boolean} - Whether routes match
   */
  isCurrentRoute: (route) => {
    return navigation.getCurrentPath() === route;
  },

  /**
   * Generate mailto link
   * @param {Object} params - Email parameters
   * @returns {string} - Mailto URL
   */
  generateMailto: ({ to, subject = "", body = "" }) => {
    const params = new URLSearchParams();
    if (subject) params.append("subject", subject);
    if (body) params.append("body", body);

    return `mailto:${to}?${params.toString()}`;
  },

  /**
   * Open external link in new tab
   * @param {string} url - URL to open
   */
  openLinkInNewTab: (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  },

  /**
   * Navigate to URL in current tab
   * @param {string} url - URL to navigate to
   */
  navigateToUrl: (url) => {
    window.location.href = url;
  },
};

/**
 * DOM utilities
 */
export const dom = {
  /**
   * Scroll to element smoothly
   * @param {string|Element} selector - Element selector or element
   * @param {Object} options - Scroll options
   */
  scrollToElement: (selector, options = {}) => {
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
   * @param {Element} element - Target element
   * @param {string} className - Class to add
   * @param {number} timeout - Optional timeout to remove class
   */
  addClass: (element, className, timeout = 0) => {
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
   * @param {Element} element - Target element
   * @param {string} className - Class to toggle
   * @returns {boolean} - Whether class is now present
   */
  toggleClass: (element, className) => {
    if (element) {
      return element.classList.toggle(className);
    }
    return false;
  },

  /**
   * Get element dimensions
   * @param {Element} element - Target element
   * @returns {Object} - Dimensions object
   */
  getDimensions: (element) => {
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
  debounce: (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
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
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
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
   * @returns {*} - Function result
   */
  measureTime: (func, label = "Function") => {
    const start = performance.now();
    const result = func();
    const end = performance.now();
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
   * @param {Date|string} date - Date to format
   * @param {Object} options - Intl.DateTimeFormat options
   * @returns {string} - Formatted date
   */
  formatDate: (date, options = {}) => {
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
   * @param {Date|string} date - Date to compare
   * @returns {string} - Relative time string
   */
  getRelativeTime: (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

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
  isMobile: () => {
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
  isTablet: () => {
    return window.innerWidth > 850 && window.innerWidth <= 1000;
  },

  /**
   * Check if device is desktop
   * @returns {boolean} - Whether device is desktop
   */
  isDesktop: () => {
    return window.innerWidth > 1000;
  },

  /**
   * Get device type
   * @returns {string} - Device type
   */
  getDeviceType: () => {
    if (device.isMobile()) return "mobile";
    if (device.isTablet()) return "tablet";
    return "desktop";
  },

  /**
   * Check if browser supports feature
   * @param {string} feature - Feature to check
   * @returns {boolean} - Whether feature is supported
   */
  supportsFeature: (feature) => {
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
  copy: async (text) => {
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
