import React, { useState } from "react";

/**
 * ThemeToggle component for switching between light and dark themes
 *
 * Features:
 * - Toggle between light and dark themes
 * - Visual feedback with moon/sun icons
 * - Accessibility support with aria-labels
 * - Direct DOM manipulation for theme switching
 *
 * @returns {JSX.Element} Theme toggle button component
 *
 * @todo Consider using React Context for theme management
 * @todo Add localStorage persistence for theme preference
 * @todo Sync component state with actual DOM theme state on mount
 */
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <i className={isDark ? "fas fa-sun" : "fas fa-moon"}></i>
    </button>
  );
}

export default ThemeToggle;
