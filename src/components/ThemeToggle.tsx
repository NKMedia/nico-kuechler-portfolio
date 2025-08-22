import { useTheme } from "../hooks";

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
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="theme-toggle"
    >
      <i className={isDark ? "fas fa-sun" : "fas fa-moon"}></i>
    </button>
  );
}

export default ThemeToggle;
