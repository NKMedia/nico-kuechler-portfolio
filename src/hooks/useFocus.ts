import { useRef, useCallback, MutableRefObject } from "react";

/**
 * Custom hook for managing focus programmatically
 *
 * @template T - The type of the HTML element
 * @returns {[MutableRefObject<T | null>, () => void]} Tuple with ref and focus function
 */
export function useFocus<T extends HTMLElement = HTMLElement>(): [
  MutableRefObject<T | null>,
  () => void
] {
  const elementRef = useRef<T | null>(null);

  const setFocus = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.focus();
    }
  }, []);

  return [elementRef, setFocus];
}

/**
 * Custom hook for managing focus trap within a container
 *
 * @template T - The type of the container element
 * @returns {MutableRefObject<T | null>} Ref for the container element
 */
export function useFocusTrap<
  T extends HTMLElement = HTMLElement
>(): MutableRefObject<T | null> {
  const containerRef = useRef<T | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (e.shiftKey) {
      // Shift + Tab: moving backwards
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else if (document.activeElement === lastElement) {
      // Tab: moving forwards
      e.preventDefault();
      firstElement?.focus();
    }
  }, []);

  // Set up event listener when container is available
  const setRef = useCallback(
    (node: T | null) => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("keydown", handleKeyDown);
      }

      containerRef.current = node;

      if (node) {
        node.addEventListener("keydown", handleKeyDown);
      }
    },
    [handleKeyDown]
  );

  // Create a ref that calls setRef when assigned
  const trapRef = useRef<T | null>(null);

  return {
    get current() {
      return trapRef.current;
    },
    set current(node: T | null) {
      trapRef.current = node;
      setRef(node);
    },
  } as MutableRefObject<T | null>;
}

export default useFocus;
