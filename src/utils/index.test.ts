import { describe, it, expect, vi, beforeEach } from "vitest";
import { validation, storage, dom } from "./index";

describe("Validation Utils", () => {
  describe("isValidEmail", () => {
    it("validates correct email addresses", () => {
      expect(validation.isValidEmail("test@example.com")).toBe(true);
      expect(validation.isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(validation.isValidEmail("user+tag@example.org")).toBe(true);
    });

    it("rejects invalid email addresses", () => {
      expect(validation.isValidEmail("invalid")).toBe(false);
      expect(validation.isValidEmail("test@")).toBe(false);
      expect(validation.isValidEmail("@example.com")).toBe(false);
      expect(validation.isValidEmail("")).toBe(false);
    });
  });

  describe("validateForm", () => {
    it("validates complete form data", () => {
      const validForm = {
        name: "John Doe",
        email: "john@example.com",
        subject: "Test Subject",
        message: "Test message content",
      };

      const result = validation.validateForm(validForm);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("detects missing required fields", () => {
      const incompleteForm = {
        name: "",
        email: "john@example.com",
        subject: "Test Subject",
        message: "Test message content",
      };

      const result = validation.validateForm(incompleteForm);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("detects invalid email", () => {
      const invalidEmailForm = {
        name: "John Doe",
        email: "invalid-email",
        subject: "Test Subject",
        message: "Test message content",
      };

      const result = validation.validateForm(invalidEmailForm);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((error) => error.includes("E-Mail"))).toBe(
        true
      );
    });
  });
});

describe("Storage Utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("setItem", () => {
    it("stores string values", () => {
      expect(storage.setItem("test", "value")).toBe(true);
      expect(localStorage.getItem("test")).toBe('"value"'); // JSON.stringify wraps strings in quotes
    });

    it("handles storage errors gracefully", () => {
      // Mock localStorage to throw an error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      expect(storage.setItem("test", "value")).toBe(false);

      localStorage.setItem = originalSetItem;
    });
  });

  describe("getItem", () => {
    it("retrieves stored values", () => {
      localStorage.setItem("test", '"value"'); // Manually set JSON-stringified value
      expect(storage.getItem("test", "default")).toBe("value");
    });

    it("returns default value for non-existent keys", () => {
      expect(storage.getItem("nonexistent", "default")).toBe("default");
    });
  });
});

describe("DOM Utils", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("addClass", () => {
    it("adds class to element", () => {
      const element = document.createElement("div");
      document.body.appendChild(element);

      dom.addClass(element, "test-class");
      expect(element.classList.contains("test-class")).toBe(true);
    });

    it("handles null element gracefully", () => {
      expect(() => dom.addClass(null, "test-class")).not.toThrow();
    });
  });

  describe("getDimensions", () => {
    it("returns element dimensions", () => {
      const element = document.createElement("div");
      element.style.width = "100px";
      element.style.height = "50px";
      document.body.appendChild(element);

      // Mock getBoundingClientRect
      element.getBoundingClientRect = vi.fn().mockReturnValue({
        width: 100,
        height: 50,
        top: 0,
        left: 0,
        bottom: 50,
        right: 100,
      });

      const dimensions = dom.getDimensions(element);
      expect(dimensions).toEqual({
        width: 100,
        height: 50,
        top: 0,
        left: 0,
        bottom: 50,
        right: 100,
      });
    });

    it("returns null for null element", () => {
      expect(dom.getDimensions(null)).toBe(null);
    });
  });
});
