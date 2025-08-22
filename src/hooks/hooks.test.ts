import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage, useTheme, useForm } from "./index";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("Custom Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.className = "";
  });

  afterEach(() => {
    document.body.className = "";
  });

  describe("useLocalStorage", () => {
    it("should return initial value when localStorage is empty", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "default")
      );

      expect(result.current.value).toBe("default");
    });

    it("should return stored value from localStorage", () => {
      mockLocalStorage.getItem.mockReturnValue('"stored-value"');

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "default")
      );

      expect(result.current.value).toBe("stored-value");
    });

    it("should handle non-JSON values gracefully", () => {
      mockLocalStorage.getItem.mockReturnValue("plain-string");

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "default")
      );

      expect(result.current.value).toBe("plain-string");
    });

    it("should update value and localStorage when setValue is called", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "default")
      );

      act(() => {
        result.current.setValue("new-value");
      });

      expect(result.current.value).toBe("new-value");
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "test-key",
        '"new-value"'
      );
    });

    it("should remove value when removeValue is called", () => {
      mockLocalStorage.getItem.mockReturnValue('"stored-value"');

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "default")
      );

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.value).toBe("default");
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("test-key");
    });
  });

  describe("useTheme", () => {
    it("should initialize with default theme", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe("light");
    });

    it("should toggle theme", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe("dark");
      expect(document.body.classList.contains("dark-theme")).toBe(true);
    });

    it("should set specific theme", () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme("dark");
      });

      expect(result.current.theme).toBe("dark");
      expect(document.body.classList.contains("dark-theme")).toBe(true);
    });
  });

  describe("useForm", () => {
    interface TestFormData {
      name: string;
      email: string;
      [key: string]: string;
    }

    const initialValues: TestFormData = {
      name: "",
      email: "",
    };

    const mockValidate = (values: TestFormData) => {
      const errors: Record<keyof TestFormData, string> = {
        name: "",
        email: "",
      };

      if (!values.name) errors.name = "Name is required";
      if (!values.email) errors.email = "Email is required";

      return errors;
    };

    it("should initialize with initial values", () => {
      const { result } = renderHook(() => useForm(initialValues));

      expect(result.current.values).toEqual(initialValues);
      expect(result.current.isSubmitting).toBe(false);
    });

    it("should handle input changes", () => {
      const { result } = renderHook(() => useForm(initialValues));

      const mockEvent = {
        target: { name: "name", value: "John Doe", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(mockEvent);
      });

      expect(result.current.values.name).toBe("John Doe");
    });

    it("should validate form", () => {
      const { result } = renderHook(() => useForm(initialValues, mockValidate));

      // The form should be invalid initially because name and email are empty
      expect(result.current.isValid()).toBe(false);
      expect(result.current.hasErrors()).toBe(false); // No errors until validation is run

      // Manually trigger validation by calling isValid() which runs validation
      act(() => {
        const isValid = result.current.isValid();
        expect(isValid).toBe(false);
      });
    });

    it("should reset form", () => {
      const { result } = renderHook(() => useForm(initialValues));

      const mockEvent = {
        target: { name: "name", value: "John Doe", type: "text" },
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleChange(mockEvent);
      });

      expect(result.current.values.name).toBe("John Doe");

      act(() => {
        result.current.reset();
      });

      expect(result.current.values).toEqual(initialValues);
    });

    it("should set field error", () => {
      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.setFieldError("name", "Name is required");
      });

      expect(result.current.getFieldError("name")).toBe("Name is required");
      expect(result.current.hasFieldError("name")).toBe(true);
    });

    it("should clear errors", () => {
      const { result } = renderHook(() => useForm(initialValues));

      act(() => {
        result.current.setFieldError("name", "Name is required");
      });

      expect(result.current.hasFieldError("name")).toBe(true);

      act(() => {
        result.current.clearErrors();
      });

      expect(result.current.hasFieldError("name")).toBe(false);
    });
  });
});
