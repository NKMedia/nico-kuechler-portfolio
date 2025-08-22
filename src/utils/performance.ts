/**
 * Performance monitoring and analytics utilities
 * Provides functions for measuring and tracking application performance
 */

import type {
  AnalyticsEvent,
  PerformanceConfig,
  DetailedPerformanceReport,
} from "../types";
import { FEATURES } from "../constants";

export interface PerformanceObserverConfig {
  entryTypes: string[];
  buffered?: boolean;
}

export interface TimingMark {
  name: string;
  startTime: number;
  duration?: number;
}

// Local performance metric interface for web vitals
export interface WebVitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  entries: PerformanceEntry[];
}

// Helper function to determine performance rating
const getPerformanceRating = (
  value: number,
  thresholds: { poor: number; needsImprovement: number }
): "good" | "needs-improvement" | "poor" => {
  if (value > thresholds.poor) return "poor";
  if (value > thresholds.needsImprovement) return "needs-improvement";
  return "good";
};

/**
 * Performance measurement utilities
 */
export const measurement = {
  /**
   * Start a performance measurement
   * @param {string} name - Measurement name
   */
  mark: (name: string): void => {
    if ("performance" in globalThis && globalThis.performance.mark) {
      globalThis.performance.mark(`${name}-start`);
    }
  },

  /**
   * End a performance measurement and calculate duration
   * @param {string} name - Measurement name
   * @returns {number} - Duration in milliseconds
   */
  measure: (name: string): number => {
    if ("performance" in globalThis && globalThis.performance.measure) {
      const startMark = `${name}-start`;
      const endMark = `${name}-end`;

      globalThis.performance.mark(endMark);
      globalThis.performance.measure(name, startMark, endMark);

      const measure = globalThis.performance.getEntriesByName(
        name,
        "measure"
      )[0];
      return measure ? measure.duration : 0;
    }
    return 0;
  },

  /**
   * Clear performance marks and measures
   * @param {string} name - Optional specific name to clear
   */
  clear: (name?: string): void => {
    if ("performance" in globalThis) {
      if (name) {
        globalThis.performance.clearMarks(`${name}-start`);
        globalThis.performance.clearMarks(`${name}-end`);
        globalThis.performance.clearMeasures(name);
      } else {
        globalThis.performance.clearMarks();
        globalThis.performance.clearMeasures();
      }
    }
  },

  /**
   * Get all performance entries of a specific type
   * @param {string} type - Entry type to retrieve
   * @returns {PerformanceEntry[]} - Performance entries
   */
  getEntries: (type?: string): PerformanceEntry[] => {
    if ("performance" in globalThis) {
      return type
        ? globalThis.performance.getEntriesByType(type)
        : globalThis.performance.getEntries();
    }
    return [];
  },
};

/**
 * Core Web Vitals measurement
 */
export const webVitals = {
  /**
   * Measure Largest Contentful Paint (LCP)
   * @param {(metric: WebVitalMetric) => void} callback - Callback for metric
   */
  measureLCP: (callback: (metric: WebVitalMetric) => void): void => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };

        if (lastEntry) {
          const value =
            lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
          const rating = getPerformanceRating(value, {
            poor: 4000,
            needsImprovement: 2500,
          });
          callback({
            name: "LCP",
            value,
            rating,
            entries: [lastEntry],
          });
        }
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    }
  },

  /**
   * Measure First Input Delay (FID)
   * @param {(metric: WebVitalMetric) => void} callback - Callback for metric
   */
  measureFID: (callback: (metric: WebVitalMetric) => void): void => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & {
            processingStart?: number;
          };

          if (fidEntry.processingStart) {
            const value = fidEntry.processingStart - entry.startTime;
            const rating = getPerformanceRating(value, {
              poor: 300,
              needsImprovement: 100,
            });
            callback({
              name: "FID",
              value,
              rating,
              entries: [entry],
            });
          }
        });
      });

      observer.observe({ entryTypes: ["first-input"] });
    }
  },

  /**
   * Measure Cumulative Layout Shift (CLS)
   * @param {(metric: WebVitalMetric) => void} callback - Callback for metric
   */
  measureCLS: (callback: (metric: WebVitalMetric) => void): void => {
    if ("PerformanceObserver" in window) {
      let clsValue = 0;
      const clsEntries: PerformanceEntry[] = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as PerformanceEntry & {
            value?: number;
            hadRecentInput?: boolean;
          };

          if (layoutShiftEntry.value && !layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
            clsEntries.push(entry);

            const rating = getPerformanceRating(clsValue, {
              poor: 0.25,
              needsImprovement: 0.1,
            });
            callback({
              name: "CLS",
              value: clsValue,
              rating,
              entries: clsEntries,
            });
          }
        });
      });

      observer.observe({ entryTypes: ["layout-shift"] });
    }
  },
};

/**
 * Analytics and tracking utilities
 */
export const analytics = {
  /**
   * Track a custom event
   * @param {AnalyticsEvent} event - Event to track
   */
  trackEvent: (event: AnalyticsEvent): void => {
    if (!FEATURES.analytics) return;

    // Console logging for development
    if (import.meta.env.DEV) {
      console.log("Analytics Event:", event);
    }

    // Custom analytics implementation could go here
    // For example, sending to Google Analytics, Matomo, etc.
    try {
      // Dispatch custom event for other parts of the app to listen to
      window.dispatchEvent(
        new CustomEvent("analytics-event", {
          detail: event,
        })
      );
    } catch (error) {
      console.error("Failed to track analytics event:", error);
    }
  },

  /**
   * Track page view
   * @param {string} path - Page path
   * @param {string} title - Page title
   */
  trackPageView: (path: string, title: string): void => {
    analytics.trackEvent({
      category: "Navigation",
      action: "page_view",
      label: path,
      value: 1,
      customParameters: { title },
    });
  },

  /**
   * Track user interaction
   * @param {string} element - Element that was interacted with
   * @param {string} action - Type of interaction
   */
  trackInteraction: (element: string, action: string): void => {
    analytics.trackEvent({
      category: "Interaction",
      action,
      label: element,
      value: 1,
    });
  },

  /**
   * Track performance metric
   * @param {WebVitalMetric} metric - Performance metric to track
   */
  trackPerformance: (metric: WebVitalMetric): void => {
    analytics.trackEvent({
      category: "Performance",
      action: metric.name,
      label: metric.rating,
      value: Math.round(metric.value),
    });
  },
};

/**
 * Application performance monitoring
 */
export const monitoring = {
  /**
   * Initialize performance monitoring
   * @param {PerformanceConfig} config - Configuration options
   */
  initialize: (config: PerformanceConfig = {}): void => {
    if (!FEATURES.analytics) return;

    console.log("Initializing performance monitoring...");

    // Measure navigation timing
    measurement.mark("app-initialization");

    // Set up Core Web Vitals monitoring
    if (config.measureWebVitals !== false) {
      webVitals.measureLCP(analytics.trackPerformance);
      webVitals.measureFID(analytics.trackPerformance);
      webVitals.measureCLS(analytics.trackPerformance);
    }

    // Track resource loading performance
    if (config.trackResources !== false) {
      monitoring.trackResourcePerformance();
    }

    // Monitor long tasks
    if (config.trackLongTasks !== false) {
      monitoring.trackLongTasks();
    }
  },

  /**
   * Track resource loading performance
   */
  trackResourcePerformance: (): void => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const resourceEntry = entry as PerformanceResourceTiming;

          // Track slow resources (>1s)
          if (resourceEntry.duration > 1000) {
            analytics.trackEvent({
              category: "Performance",
              action: "slow_resource",
              label: resourceEntry.name,
              value: Math.round(resourceEntry.duration),
            });
          }
        });
      });

      observer.observe({ entryTypes: ["resource"] });
    }
  },

  /**
   * Track long tasks that block the main thread
   */
  trackLongTasks: (): void => {
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          analytics.trackEvent({
            category: "Performance",
            action: "long_task",
            label: "main_thread_blocked",
            value: Math.round(entry.duration),
          });
        });
      });

      try {
        observer.observe({ entryTypes: ["longtask"] });
      } catch (error) {
        // longtask is not supported in all browsers
        console.warn("Long task monitoring not supported:", error);
      }
    }
  },

  /**
   * Generate performance report
   * @returns Detailed performance report
   */
  generateReport: (): Partial<DetailedPerformanceReport> => {
    return {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection:
        (
          navigator as Navigator & {
            connection?: { effectiveType?: string };
          }
        ).connection || null,
      resources: globalThis.performance.getEntriesByType("resource").length,
      memoryUsage: (globalThis.performance as any).memory?.usedJSHeapSize || 0,
    };
  },
};

/**
 * Initialize all performance monitoring
 * @param {PerformanceConfig} config - Configuration options
 */
export const initializePerformanceMonitoring = (
  config: PerformanceConfig = {}
): void => {
  monitoring.initialize(config);

  // Mark app as fully initialized
  document.addEventListener("DOMContentLoaded", () => {
    const duration = measurement.measure("app-initialization");
    const rating = getPerformanceRating(duration, {
      poor: 3000,
      needsImprovement: 1500,
    });
    analytics.trackPerformance({
      name: "App Initialization",
      value: duration,
      rating,
      entries: [],
    });
  });
};

// Export performance utilities as default
export default {
  measurement,
  webVitals,
  analytics,
  monitoring,
  initializePerformanceMonitoring,
};
