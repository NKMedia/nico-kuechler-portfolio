import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  disconnect(): void {
    // Mock implementation - no actual functionality needed for tests
  }
  observe(_target: Element): void {
    // Mock implementation - no actual functionality needed for tests
  }
  unobserve(_target: Element): void {
    // Mock implementation - no actual functionality needed for tests
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = Object.freeze([0]);
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  disconnect(): void {
    // Mock implementation - no actual functionality needed for tests
  }
  observe(_target: Element, _options?: ResizeObserverOptions): void {
    // Mock implementation - no actual functionality needed for tests
  }
  unobserve(_target: Element): void {
    // Mock implementation - no actual functionality needed for tests
  }
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock localStorage with proper typing
interface MockStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  [key: string]: unknown;
}

const localStorageMock: MockStorage = {
  getItem: (key: string): string | null => {
    const item = localStorageMock[key];
    return typeof item === "string" ? item : null;
  },
  setItem: (key: string, value: string): void => {
    localStorageMock[key] = value.toString();
  },
  removeItem: (key: string): void => {
    delete localStorageMock[key];
  },
  clear: (): void => {
    Object.keys(localStorageMock).forEach((key) => {
      if (
        key !== "getItem" &&
        key !== "setItem" &&
        key !== "removeItem" &&
        key !== "clear"
      ) {
        delete localStorageMock[key];
      }
    });
  },
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]): void => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is deprecated")
    ) {
      return;
    }
    originalConsoleError(...args);
  };
});

// Clean up after each test case
afterEach(() => {
  cleanup();
  localStorage.clear();
});

afterAll(() => {
  console.error = originalConsoleError;
});
