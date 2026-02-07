/**
 * Enhanced Analytics Module for Customer Engagement Tracking
 * Privacy-focused analytics implementation for portfolio website
 */

import type { AnalyticsEvent } from "../types";
import { FEATURES } from "../constants";

export interface EngagementEvent {
  category: "engagement" | "portfolio" | "contact" | "navigation" | "pwa";
  action: string;
  label?: string;
  value?: number;
  customData?: Record<string, string | number | boolean>;
}

export interface ProjectInteraction {
  projectId: string;
  action: "view" | "demo_click" | "code_click" | "detail_view";
  duration?: number;
  scrollDepth?: number;
}

/**
 * Privacy-focused analytics implementation
 */
class PortfolioAnalytics {
  private readonly sessionId: string;
  private readonly sessionStart: number;
  private readonly pageViews: Map<string, number> = new Map();
  private readonly interactions: EngagementEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStart = Date.now();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  private initializeSession(): void {
    if (!FEATURES.analytics) return;

    const sessionInfo = {
      sessionId: this.sessionId,
      timestamp: this.sessionStart,
      userAgent: navigator.userAgent,
      viewportWidth: globalThis.innerWidth,
      viewportHeight: globalThis.innerHeight,
      referrer: document.referrer,
      deviceType: this.getDeviceType(),
    };

    this.trackEvent({
      category: "engagement",
      action: "session_start",
      customData: sessionInfo,
    });
  }

  private getDeviceType(): "mobile" | "tablet" | "desktop" {
    const width = globalThis.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  /**
   * Track page views with engagement metrics
   */
  trackPageView(path: string, title: string): void {
    if (!FEATURES.analytics) return;

    const viewCount = (this.pageViews.get(path) || 0) + 1;
    this.pageViews.set(path, viewCount);

    this.trackEvent({
      category: "navigation",
      action: "page_view",
      label: path,
      customData: {
        title,
        viewCount,
        sessionTime: Date.now() - this.sessionStart,
      },
    });

    // Track time spent on previous page
    this.trackTimeOnPage();
  }

  private trackTimeOnPage(): void {
    // Implementation for tracking time spent on each page
    const currentTime = Date.now();
    const timeOnPage = currentTime - this.sessionStart;

    if (timeOnPage > 5000) {
      // Only track if user spent more than 5 seconds
      this.trackEvent({
        category: "engagement",
        action: "time_on_page",
        value: Math.round(timeOnPage / 1000),
      });
    }
  }

  /**
   * Track project portfolio interactions
   */
  trackProjectInteraction(interaction: ProjectInteraction): void {
    if (!FEATURES.analytics) return;

    const eventData: EngagementEvent = {
      category: "portfolio",
      action: interaction.action,
      label: interaction.projectId,
      customData: {
        scrollDepth: interaction.scrollDepth ?? 0,
        projectId: interaction.projectId,
      },
    };

    if (interaction.duration !== undefined) {
      eventData.value = interaction.duration;
    }

    this.trackEvent(eventData);
  }

  /**
   * Track contact form engagement
   */
  trackContactFormEvent(
    action: "start" | "field_focus" | "submit" | "success" | "error",
    field?: string,
  ): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "contact",
      action: `form_${action}`,
      label: field ?? "unknown",
      customData: {
        formStep: action,
        field: field ?? "unknown",
        sessionTime: Date.now() - this.sessionStart,
      },
    });
  }

  /**
   * Track scroll depth for engagement measurement
   */
  trackScrollDepth(percentage: number, page: string): void {
    if (!FEATURES.analytics) return;

    // Only track significant scroll milestones
    const milestones = [25, 50, 75, 90, 100];
    if (milestones.includes(percentage)) {
      this.trackEvent({
        category: "engagement",
        action: "scroll_depth",
        label: page,
        value: percentage,
      });
    }
  }

  /**
   * Track external link clicks
   */
  trackExternalLink(url: string, context: string): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "engagement",
      action: "external_link_click",
      label: url,
      customData: {
        context,
        destination: new URL(url).hostname,
      },
    });
  }

  /**
   * Track social media interactions
   */
  trackSocialInteraction(platform: string, action: "click" | "share"): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "engagement",
      action: `social_${action}`,
      label: platform,
    });
  }

  /**
   * Track theme changes for UX insights
   */
  trackThemeChange(newTheme: "light" | "dark"): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "engagement",
      action: "theme_change",
      label: newTheme,
      customData: {
        deviceType: this.getDeviceType(),
        timeOfDay: new Date().getHours(),
      },
    });
  }

  /**
   * Track language/localization changes
   */
  trackLanguageChange(language: string): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "engagement",
      action: "language_change",
      label: language,
    });
  }

  /**
   * Track download events (CV, portfolio documents)
   */
  trackDownload(fileName: string, fileType: string): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "engagement",
      action: "download",
      label: fileName,
      customData: {
        fileType,
        source: globalThis.location.pathname,
      },
    });
  }

  /**
   * Track search/filter usage in projects
   */
  trackProjectFilter(filterType: string, filterValue: string): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "portfolio",
      action: "filter_use",
      label: `${filterType}:${filterValue}`,
    });
  }

  /**
   * Track user journey/funnel steps
   */
  trackUserJourney(
    step: string,
    funnel: "hire_me" | "view_work" | "contact",
  ): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "engagement",
      action: "user_journey",
      label: `${funnel}:${step}`,
      customData: {
        funnel,
        step,
        sessionTime: Date.now() - this.sessionStart,
      },
    });
  }

  /**
   * Track PWA installation funnel
   */
  trackPWAInstall(
    action:
      | "prompt_shown"
      | "install_click"
      | "install_success"
      | "install_dismissed",
  ): void {
    if (!FEATURES.analytics) return;

    this.trackEvent({
      category: "pwa",
      action: `install_${action}`,
      customData: {
        deviceType: this.getDeviceType(),
        standalone: globalThis.matchMedia("(display-mode: standalone)").matches,
      },
    });
  }

  /**
   * Core event tracking method
   */
  private trackEvent(event: EngagementEvent): void {
    if (!FEATURES.analytics) return;

    const baseAnalyticsEvent = {
      category: event.category,
      action: event.action,
      customParameters: {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        path: globalThis.location.pathname,
        ...event.customData,
      },
    };

    // Build analytics event with proper optional properties
    let analyticsEvent: AnalyticsEvent = baseAnalyticsEvent;

    if (event.label) {
      analyticsEvent = { ...analyticsEvent, label: event.label };
    }

    if (event.value) {
      analyticsEvent = { ...analyticsEvent, value: event.value };
    }

    // Store for local analysis
    this.interactions.push(event);

    // Send to analytics service
    this.sendToAnalyticsService(analyticsEvent);

    // Development logging
    if (import.meta.env.DEV) {
      console.warn("🎯 Analytics Event:", event);
      console.warn("Full Analytics Event:", analyticsEvent);
    }
  }

  /**
   * Send events to your chosen analytics service
   */
  private sendToAnalyticsService(event: AnalyticsEvent): void {
    // Google Analytics 4 (Primary)
    const gtagFunction = (
      globalThis as unknown as {
        gtag?: (
          type: string,
          event: string,
          params: Record<string, unknown>,
        ) => void;
      }
    ).gtag;
    if (gtagFunction) {
      gtagFunction("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customParameters,
      });
    }

    // Matomo (Alternative)
    const matomoQueue = (globalThis as unknown as { _paq?: unknown[][] })._paq;
    if (matomoQueue) {
      matomoQueue.push([
        "trackEvent",
        event.category,
        event.action,
        event.label,
        event.value,
      ]);
    }
  }

  /**
   * Get engagement summary for this session
   */
  getSessionSummary(): {
    sessionId: string;
    duration: number;
    pageViews: number;
    interactions: number;
    uniquePages: number;
  } {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.sessionStart,
      pageViews: Array.from(this.pageViews.values()).reduce(
        (sum, count) => sum + count,
        0,
      ),
      interactions: this.interactions.length,
      uniquePages: this.pageViews.size,
    };
  }
}

// Global analytics instance
export const analytics = new PortfolioAnalytics();

export default analytics;
