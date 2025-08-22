import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { UseThemeReturn, ThemeMode } from "../types";
import { THEME_CONFIG } from "../constants";

/**
 * Custom hook for managing theme state and persistence
 *
 * Features:
 * - Automatic system preference detection
 * - localStorage persistence
 * - DOM class management
 * - Theme transition animations
 *
 * @returns {UseThemeReturn} Object with current theme, toggle function, and setter
 */
export function useTheme(): UseThemeReturn {
  // Use localStorage hook for persistence
  const { value: theme, setValue: setThemeValue } = useLocalStorage<ThemeMode>(
    THEME_CONFIG.storageKey,
    THEME_CONFIG.defaultTheme
  );

  // Apply theme to DOM
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    const body = document.body;

    // Remove existing theme classes
    body.classList.remove("light-theme", "dark-theme");

    // Add new theme class
    body.classList.add(`${newTheme}-theme`);

    // Set CSS custom property for transitions
    body.style.setProperty(
      "--theme-transition-duration",
      THEME_CONFIG.transitionDuration
    );
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no explicit theme is saved in localStorage
      const savedTheme = window.localStorage?.getItem(THEME_CONFIG.storageKey);
      if (!savedTheme) {
        const newTheme: ThemeMode = e.matches ? "dark" : "light";
        setThemeValue(newTheme);
      }
    };

    // Use the newer addEventListener if available, otherwise fallback to addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers and test environments
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener?.(handleChange);
    }

    return undefined;
  }, [setThemeValue]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setThemeValue(newTheme);
  }, [theme, setThemeValue]);

  // Set specific theme
  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeValue(newTheme);
    },
    [setThemeValue]
  );

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}

export default useTheme;
