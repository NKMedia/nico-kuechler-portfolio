/**
 * Analytics Integration Examples
 * How to implement customer engagement tracking in your portfolio components
 */

import React, { useEffect, useRef } from "react";
import { analytics } from "../utils/analytics";

/**
 * Example: Enhanced Project Card with Engagement Tracking
 */
export const ProjectCardWithAnalytics: React.FC<{
  project: {
    id: string;
    title: string;
    description: string;
    demoUrl?: string;
    codeUrl?: string;
  };
}> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const viewStartTime = useRef<number | undefined>(undefined);
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Track project view when component mounts
    if (!hasTrackedView.current) {
      analytics.trackProjectInteraction({
        projectId: project.id,
        action: "view",
      });
      viewStartTime.current = Date.now();
      hasTrackedView.current = true;
    }

    // Intersection Observer for scroll depth tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            analytics.trackProjectInteraction({
              projectId: project.id,
              action: "detail_view",
              scrollDepth: Math.round(entry.intersectionRatio * 100),
            });
          }
        });
      },
      { threshold: [0.5, 0.75, 1] },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();

      // Track time spent viewing project on unmount
      if (viewStartTime.current) {
        const viewDuration = Date.now() - viewStartTime.current;
        if (viewDuration > 2000) {
          // Only track if viewed for more than 2 seconds
          analytics.trackProjectInteraction({
            projectId: project.id,
            action: "view",
            duration: viewDuration,
          });
        }
      }
    };
  }, [project.id]);

  const handleDemoClick = () => {
    analytics.trackProjectInteraction({
      projectId: project.id,
      action: "demo_click",
    });

    // Track user journey step
    analytics.trackUserJourney("demo_access", "view_work");
  };

  const handleCodeClick = () => {
    analytics.trackProjectInteraction({
      projectId: project.id,
      action: "code_click",
    });

    analytics.trackExternalLink(project.codeUrl!, "project_code");
  };

  return (
    <div ref={cardRef} className="project-card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {project.demoUrl && <button onClick={handleDemoClick}>View Demo</button>}

      {project.codeUrl && (
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCodeClick}
        >
          View Code
        </a>
      )}
    </div>
  );
};

/**
 * Example: Contact Form with Engagement Tracking
 */
export const ContactFormWithAnalytics: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const hasStartedForm = useRef(false);

  useEffect(() => {
    // Track form start when component mounts
    analytics.trackContactFormEvent("start");
    analytics.trackUserJourney("form_view", "contact");
  }, []);

  const handleFieldFocus = (fieldName: string) => {
    if (!hasStartedForm.current) {
      analytics.trackUserJourney("first_interaction", "contact");
      hasStartedForm.current = true;
    }
    analytics.trackContactFormEvent("field_focus", fieldName);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    analytics.trackContactFormEvent("submit");
    analytics.trackUserJourney("form_submit", "contact");

    try {
      // Your form submission logic here
      const response = await submitForm(formData);

      if (response.success) {
        analytics.trackContactFormEvent("success");
        analytics.trackUserJourney("form_success", "hire_me");
      } else {
        analytics.trackContactFormEvent("error");
      }
    } catch {
      analytics.trackContactFormEvent("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleInputChange}
        onFocus={() => handleFieldFocus("name")}
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleInputChange}
        onFocus={() => handleFieldFocus("email")}
      />
      <input
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleInputChange}
        onFocus={() => handleFieldFocus("subject")}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleInputChange}
        onFocus={() => handleFieldFocus("message")}
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

/**
 * Example: Navigation with Page View Tracking
 */
export const NavigationWithAnalytics: React.FC = () => {
  useEffect(() => {
    // Track page view on route change
    const handleRouteChange = () => {
      analytics.trackPageView(globalThis.location.pathname, document.title);
    };

    // Track initial page view
    handleRouteChange();

    // Listen for route changes (adapt to your routing solution)
    globalThis.addEventListener("popstate", handleRouteChange);

    return () => {
      globalThis.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return null; // This would be your navigation component
};

/**
 * Example: Scroll Depth Tracking Hook
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useScrollDepthTracking = (pageName: string) => {
  useEffect(() => {
    let maxScrollDepth = 0;
    const milestones = [25, 50, 75, 90, 100];
    const trackedMilestones = new Set<number>();

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage;

        // Track milestone achievements
        milestones.forEach((milestone) => {
          if (
            scrollPercentage >= milestone &&
            !trackedMilestones.has(milestone)
          ) {
            analytics.trackScrollDepth(milestone, pageName);
            trackedMilestones.add(milestone);
          }
        });
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 1000);
    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [pageName]);
};

/**
 * Example: Social Media Links with Tracking
 */
export const SocialLinksWithAnalytics: React.FC<{
  links: { platform: string; url: string }[];
}> = ({ links }) => {
  const handleSocialClick = (platform: string, url: string) => {
    analytics.trackSocialInteraction(platform, "click");
    analytics.trackExternalLink(url, "social_media");
  };

  return (
    <div className="social-links">
      {links.map(({ platform, url }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick(platform, url)}
        >
          {platform}
        </a>
      ))}
    </div>
  );
};

/**
 * Example: Download Tracking for CV/Portfolio
 */
export const DownloadButton: React.FC<{
  fileName: string;
  fileUrl: string;
  fileType: string;
}> = ({ fileName, fileUrl, fileType }) => {
  const handleDownload = () => {
    analytics.trackDownload(fileName, fileType);
    analytics.trackUserJourney("cv_download", "hire_me");
  };

  return (
    <a href={fileUrl} download={fileName} onClick={handleDownload}>
      Download {fileName}
    </a>
  );
};

// Utility function for throttling
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(
        () => {
          func(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime),
      );
    }
  };
}

// Mock function for form submission
async function submitForm(
  _data: Record<string, unknown>,
): Promise<{ success: boolean }> {
  // Your actual form submission logic
  return { success: true };
}
