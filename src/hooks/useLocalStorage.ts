import { useState, useEffect, useCallback } from "react";
import type { UseLocalStorageReturn } from "../types";

/**
 * Custom hook for managing localStorage with React state synchronization
 *
 * @template T - The type of the stored value
 * @param {string} key - The localStorage key
 * @param {T} initialValue - The initial value to use if no stored value exists
 * @returns {UseLocalStorageReturn<T>} Object with value, setValue, and removeValue functions
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      // Try to parse as JSON first, if that fails, use the value directly (for backward compatibility)
      try {
        return JSON.parse(item);
      } catch {
        // If it's not valid JSON, return the string value directly
        return item as T;
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(
            `Error parsing localStorage value for key "${key}":`,
            error
          );
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }

    return undefined;
  }, [key]);

  return {
    value: storedValue,
    setValue,
    removeValue,
  };
}

export default useLocalStorage;
