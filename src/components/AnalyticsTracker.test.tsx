import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AnalyticsTracker from "./AnalyticsTracker";

type GtagWindow = typeof globalThis & { gtag?: ReturnType<typeof vi.fn> };

describe("AnalyticsTracker", () => {
  const gtagMock = vi.fn();

  beforeEach(() => {
    (globalThis as GtagWindow).gtag = gtagMock;
  });

  afterEach(() => {
    delete (globalThis as GtagWindow).gtag;
    gtagMock.mockReset();
  });

  it("renders nothing", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <AnalyticsTracker />
      </MemoryRouter>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("sends a page_view event to gtag", () => {
    render(
      <MemoryRouter initialEntries={["/projekte"]}>
        <AnalyticsTracker />
      </MemoryRouter>,
    );
    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({
        page_path: "/projekte",
        page_title: expect.stringContaining("Projekte"),
      }),
    );
  });

  it("uses a 404 page title for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/gibt-es-nicht"]}>
        <AnalyticsTracker />
      </MemoryRouter>,
    );
    expect(gtagMock).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({ page_title: expect.stringContaining("404") }),
    );
  });

  it("does not throw when gtag is not available", () => {
    delete (globalThis as GtagWindow).gtag;
    expect(() =>
      render(
        <MemoryRouter initialEntries={["/"]}>
          <AnalyticsTracker />
        </MemoryRouter>,
      ),
    ).not.toThrow();
  });
});
