import { useState, useEffect } from "react";

/**
 * ThemeToggle component for switching between light and dark themes
 *
 * Features:
 * - Toggle between light and dark themes
 * - Visual feedback with moon/sun icons
 * - Accessibility support with aria-labels
 * - localStorage persistence for theme preference
 * - Automatic sync with DOM state on mount
 *
 * @returns Theme toggle button component
 */
function ThemeToggle(): React.ReactElement {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme from localStorage and sync with DOM state
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);

    if (shouldUseDark) {
      setIsDark(true);
      document.body.classList.add("dark-theme");
    } else {
      setIsDark(false);
      document.body.classList.remove("dark-theme");
    }
  }, []);

  const toggleTheme = (): void => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
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
