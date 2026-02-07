/**
 * Integrated Analytics & Performance Monitoring
 * Connects your existing performance utilities with the new customer engagement analytics
 */

import { analytics as performanceAnalytics } from "./performance";
import { analytics as engagementAnalytics } from "./analytics";

// Re-export analytics modules
export { analytics as engagementAnalytics } from "./analytics";
export { analytics as performanceAnalytics } from "./performance";

/**
 * Unified Analytics Manager
 * Combines performance monitoring with customer engagement tracking
 */
class UnifiedAnalytics {
  private readonly performanceMetrics: Map<string, number> = new Map();

  /**
   * Initialize both performance and engagement analytics
   */
  initialize(): void {
    // Initialize your existing performance monitoring
    if (import.meta.env.DEV) {
      console.warn("🚀 Initializing unified analytics system");
    }

    // Setup performance monitoring with analytics integration
    this.setupPerformanceTracking();

    // Setup Core Web Vitals with engagement correlation
    this.setupWebVitalsTracking();
  }

  /**
   * Enhanced performance tracking that feeds into engagement analytics
   */
  private setupPerformanceTracking(): void {
    // Track page load performance and correlate with engagement
    performanceAnalytics.trackPageView = (path: string, title: string) => {
      // Your existing page view tracking
      performanceAnalytics.trackEvent({
        category: "Navigation",
        action: "page_view",
        label: path,
        value: 1,
        customParameters: { title },
      });

      // Enhanced engagement tracking
      engagementAnalytics.trackPageView(path, title);
    };
  }

  /**
   * Setup Web Vitals tracking with user behavior correlation
   */
  private setupWebVitalsTracking(): void {
    // Track Core Web Vitals and correlate with user engagement
    const trackWebVitalWithEngagement = (metric: {
      name: string;
      value: number;
      rating: string;
    }) => {
      // Store performance metric
      this.performanceMetrics.set(metric.name, metric.value);

      // Analyze performance impact on engagement
      this.analyzePerformanceEngagementCorrelation(metric);
    };

    // Use your existing webVitals implementation
    performanceAnalytics.trackPerformance = trackWebVitalWithEngagement;
  }

  /**
   * Analyze correlation between performance and engagement metrics
   */
  private analyzePerformanceEngagementCorrelation(metric: {
    name: string;
    value: number;
    rating: string;
  }): void {
    const sessionSummary = engagementAnalytics.getSessionSummary();

    // Log performance impact on user behavior in dev mode
    if (metric.rating === "poor" && import.meta.env.DEV) {
      console.warn("Poor performance detected:", {
        metric: metric.name,
        value: metric.value,
        sessionDuration: sessionSummary.duration,
        interactionCount: sessionSummary.interactions,
        bounceRisk: sessionSummary.duration < 10000 ? "high" : "low",
      });
    }
  }

  /**
   * Enhanced project interaction tracking with performance context
   */
  trackProjectInteraction(
    projectId: string,
    action: "view" | "demo_click" | "code_click" | "detail_view",
  ): void {
    engagementAnalytics.trackProjectInteraction({
      projectId,
      action,
    });
  }

  /**
   * Track contact form with performance context
   */
  trackContactFormWithPerformance(
    action: "start" | "field_focus" | "submit" | "success" | "error",
    field?: string,
  ): void {
    engagementAnalytics.trackContactFormEvent(action, field);
  }

  /**
   * Get device type for analytics
   */
  private getDeviceType(): "mobile" | "tablet" | "desktop" {
    const width = globalThis.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  /**
   * Get connection type if available
   */
  private getConnectionType(): string {
    const connection = (
      navigator as Navigator & { connection?: { effectiveType: string } }
    ).connection;
    return connection?.effectiveType || "unknown";
  }

  /**
   * Calculate overall performance rating
   */
  private getOverallPerformanceRating(): "good" | "needs-improvement" | "poor" {
    const lcp = this.performanceMetrics.get("LCP") || 0;
    const cls = this.performanceMetrics.get("CLS") || 0;

    if (lcp > 4000 || cls > 0.25) return "poor";
    if (lcp > 2500 || cls > 0.1) return "needs-improvement";
    return "good";
  }

  /**
   * Calculate LCP score
   */
  private calculateLcpScore(lcp: number): number {
    if (lcp < 2500) return 100;
    if (lcp < 4000) return 50;
    return 0;
  }

  /**
   * Calculate CLS score
   */
  private calculateClsScore(cls: number): number {
    if (cls < 0.1) return 100;
    if (cls < 0.25) return 50;
    return 0;
  }

  /**
   * Generate comprehensive analytics report
   */
  generateReport(): {
    performance: Record<string, number>;
    engagement: ReturnType<typeof engagementAnalytics.getSessionSummary>;
    correlations: {
      performanceEngagementScore: number;
      recommendations: string[];
    };
  } {
    const engagementSummary = engagementAnalytics.getSessionSummary();
    const performanceData = Object.fromEntries(this.performanceMetrics);

    // Calculate performance-engagement correlation score
    const performanceScore = this.calculatePerformanceScore();
    const engagementScore = this.calculateEngagementScore(engagementSummary);
    const correlationScore = (performanceScore + engagementScore) / 2;

    const recommendations = this.generateRecommendations(
      performanceScore,
      engagementScore,
    );

    return {
      performance: performanceData,
      engagement: engagementSummary,
      correlations: {
        performanceEngagementScore: correlationScore,
        recommendations,
      },
    };
  }

  /**
   * Calculate performance score (0-100)
   */
  private calculatePerformanceScore(): number {
    const lcp = this.performanceMetrics.get("LCP") || 0;
    const cls = this.performanceMetrics.get("CLS") || 0;

    const lcpScore = this.calculateLcpScore(lcp);
    const clsScore = this.calculateClsScore(cls);

    return (lcpScore + clsScore) / 2;
  }

  /**
   * Calculate engagement score (0-100)
   */
  private calculateEngagementScore(
    summary: ReturnType<typeof engagementAnalytics.getSessionSummary>,
  ): number {
    let score = 0;

    // Duration score (max 30 points)
    if (summary.duration > 120000)
      score += 30; // 2+ minutes
    else if (summary.duration > 60000)
      score += 20; // 1+ minute
    else if (summary.duration > 30000) score += 10; // 30+ seconds

    // Interaction score (max 40 points)
    if (summary.interactions > 10) score += 40;
    else if (summary.interactions > 5) score += 25;
    else if (summary.interactions > 2) score += 15;

    // Page depth score (max 30 points)
    if (summary.uniquePages > 5) score += 30;
    else if (summary.uniquePages > 3) score += 20;
    else if (summary.uniquePages > 1) score += 10;

    return score;
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    performanceScore: number,
    engagementScore: number,
  ): string[] {
    const recommendations: string[] = [];

    if (performanceScore < 50) {
      recommendations.push(
        "Improve page load performance to increase user engagement",
        "Optimize images and reduce bundle size",
      );
    }

    if (engagementScore < 40) {
      recommendations.push(
        "Add more interactive elements to increase engagement",
        "Improve content discoverability",
      );
    }

    if (performanceScore > 80 && engagementScore < 50) {
      recommendations.push(
        "Performance is good, focus on content and UX improvements",
      );
    }

    if (performanceScore < 50 && engagementScore > 70) {
      recommendations.push(
        "Users are engaged despite poor performance - fix performance for even better results",
      );
    }

    return recommendations;
  }

  /**
   * Get current device and connection info
   */
  getDeviceInfo(): { deviceType: string; connectionType: string } {
    return {
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType(),
    };
  }

  /**
   * Get performance rating
   */
  getPerformanceRating(): string {
    return this.getOverallPerformanceRating();
  }
}

// Export unified analytics instance
export const unifiedAnalytics = new UnifiedAnalytics();

// Initialize on module load
unifiedAnalytics.initialize();

export default unifiedAnalytics;
