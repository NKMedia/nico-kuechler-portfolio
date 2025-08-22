/**
 * Performance monitoring utilities
 * Tracks and reports performance metrics for the application
 */

import { DEV_CONFIG } from "@constants";

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = DEV_CONFIG.showPerformanceMetrics;

    if (this.isEnabled) {
      this.init();
    }
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    // Monitor navigation timing
    this.trackNavigationTiming();

    // Monitor Core Web Vitals
    this.trackCoreWebVitals();

    // Monitor resource loading
    this.trackResourceTiming();

    // Monitor long tasks
    this.trackLongTasks();

    console.log("🔍 Performance monitoring initialized");
  }

  /**
   * Track navigation timing metrics
   */
  trackNavigationTiming() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType("navigation")[0];

        if (navigation) {
          const metrics = {
            domContentLoaded:
              navigation.domContentLoadedEventEnd -
              navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            ttfb: navigation.responseStart - navigation.requestStart,
            domInteractive:
              navigation.domInteractive - navigation.navigationStart,
            totalPageLoad: navigation.loadEventEnd - navigation.navigationStart,
          };

          this.logMetrics("Navigation Timing", metrics);
          this.sendMetrics("navigation", metrics);
        }
      }, 0);
    });
  }

  /**
   * Track Core Web Vitals (CLS, FID, LCP)
   */
  trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();

    // First Input Delay (FID)
    this.observeFID();

    // Cumulative Layout Shift (CLS)
    this.observeCLS();

    // First Contentful Paint (FCP)
    this.observeFCP();
  }

  /**
   * Observe Largest Contentful Paint
   */
  observeLCP() {
    if ("PerformanceObserver" in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          this.logMetric("LCP (Largest Contentful Paint)", lastEntry.startTime);
          this.sendMetric("lcp", lastEntry.startTime);
        });

        observer.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.set("lcp", observer);
      } catch (error) {
        console.warn("LCP observation not supported:", error);
      }
    }
  }

  /**
   * Observe First Input Delay
   */
  observeFID() {
    if ("PerformanceObserver" in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fid = entry.processingStart - entry.startTime;
            this.logMetric("FID (First Input Delay)", fid);
            this.sendMetric("fid", fid);
          });
        });

        observer.observe({ entryTypes: ["first-input"] });
        this.observers.set("fid", observer);
      } catch (error) {
        console.warn("FID observation not supported:", error);
      }
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  observeCLS() {
    if ("PerformanceObserver" in window) {
      try {
        let clsValue = 0;

        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();

          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });

          this.logMetric("CLS (Cumulative Layout Shift)", clsValue);
          this.sendMetric("cls", clsValue);
        });

        observer.observe({ entryTypes: ["layout-shift"] });
        this.observers.set("cls", observer);
      } catch (error) {
        console.warn("CLS observation not supported:", error);
      }
    }
  }

  /**
   * Observe First Contentful Paint
   */
  observeFCP() {
    if ("PerformanceObserver" in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === "first-contentful-paint") {
              this.logMetric("FCP (First Contentful Paint)", entry.startTime);
              this.sendMetric("fcp", entry.startTime);
            }
          });
        });

        observer.observe({ entryTypes: ["paint"] });
        this.observers.set("fcp", observer);
      } catch (error) {
        console.warn("FCP observation not supported:", error);
      }
    }
  }

  /**
   * Track resource loading performance
   */
  trackResourceTiming() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const resources = performance.getEntriesByType("resource");

        const resourceMetrics = {
          totalResources: resources.length,
          imageCount: resources.filter((r) => r.initiatorType === "img").length,
          scriptCount: resources.filter((r) => r.initiatorType === "script")
            .length,
          cssCount: resources.filter((r) => r.initiatorType === "link").length,
          averageLoadTime:
            resources.reduce((acc, r) => acc + r.duration, 0) /
            resources.length,
        };

        this.logMetrics("Resource Loading", resourceMetrics);
        this.sendMetrics("resources", resourceMetrics);

        // Log slowest resources
        const slowResources = resources
          .filter((r) => r.duration > 100)
          .sort((a, b) => b.duration - a.duration)
          .slice(0, 5);

        if (slowResources.length > 0) {
          console.warn("⚠️ Slow loading resources:", slowResources);
        }
      }, 2000);
    });
  }

  /**
   * Track long tasks that block the main thread
   */
  trackLongTasks() {
    if ("PerformanceObserver" in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();

          entries.forEach((entry) => {
            if (entry.duration > 50) {
              console.warn(
                `⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`
              );
              this.sendMetric("longTask", entry.duration);
            }
          });
        });

        observer.observe({ entryTypes: ["longtask"] });
        this.observers.set("longtask", observer);
      } catch (error) {
        console.warn("Long task observation not supported:", error);
      }
    }
  }

  /**
   * Log individual metric
   */
  logMetric(name, value) {
    if (this.isEnabled) {
      console.log(
        `📊 ${name}: ${
          typeof value === "number" ? value.toFixed(2) + "ms" : value
        }`
      );
    }
  }

  /**
   * Log multiple metrics
   */
  logMetrics(category, metrics) {
    if (this.isEnabled) {
      console.group(`📊 ${category} Metrics`);
      Object.entries(metrics).forEach(([key, value]) => {
        console.log(
          `${key}: ${
            typeof value === "number" ? value.toFixed(2) + "ms" : value
          }`
        );
      });
      console.groupEnd();
    }
  }

  /**
   * Send metric to analytics service (placeholder)
   */
  sendMetric(name, value) {
    this.metrics.set(name, value);

    // In a real application, you would send this to an analytics service
    // Example: analytics.track('performance_metric', { name, value });
  }

  /**
   * Send multiple metrics
   */
  sendMetrics(category, metrics) {
    Object.entries(metrics).forEach(([key, value]) => {
      this.sendMetric(`${category}_${key}`, value);
    });
  }

  /**
   * Get all collected metrics
   */
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Generate performance report
   */
  generateReport() {
    const metrics = this.getMetrics();
    const report = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      connection: this.getConnectionInfo(),
      metrics,
    };

    if (this.isEnabled) {
      console.group("📊 Performance Report");
      console.table(metrics);
      console.log("Full Report:", report);
      console.groupEnd();
    }

    return report;
  }

  /**
   * Get connection information
   */
  getConnectionInfo() {
    if ("connection" in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData,
      };
    }
    return null;
  }

  /**
   * Cleanup observers
   */
  disconnect() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }

  /**
   * Mark custom timing
   */
  mark(name) {
    if ("performance" in window && "mark" in performance) {
      performance.mark(name);
    }
  }

  /**
   * Measure time between marks
   */
  measure(name, startMark, endMark) {
    if ("performance" in window && "measure" in performance) {
      try {
        performance.measure(name, startMark, endMark);
        const entry = performance.getEntriesByName(name)[0];
        this.logMetric(`Custom: ${name}`, entry.duration);
        return entry.duration;
      } catch (error) {
        console.warn("Performance measurement failed:", error);
        return null;
      }
    }
    return null;
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export utility functions
export const markTime = (name) => performanceMonitor.mark(name);
export const measureTime = (name, startMark, endMark) =>
  performanceMonitor.measure(name, startMark, endMark);
export const getPerformanceReport = () => performanceMonitor.generateReport();
export const getMetrics = () => performanceMonitor.getMetrics();

export default performanceMonitor;
