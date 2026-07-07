// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";

// Minimal matchMedia mock with a manual dispatch() to simulate an OS flip.
function mockMatchMedia(dark: boolean) {
  const listeners = new Set<() => void>();
  const mql = {
    matches: dark,
    media: "(prefers-color-scheme: dark)",
    addEventListener: (_: string, cb: () => void) => listeners.add(cb),
    removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    dispatch() {
      listeners.forEach((cb) => cb());
    },
  };
  vi.stubGlobal("matchMedia", () => mql);
  return mql;
}

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to auto and resolves from the OS", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTheme());
    expect(result.current.pref).toBe("auto");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("setPref locks the theme and persists it", () => {
    mockMatchMedia(true); // OS is dark, but we lock light
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setPref("light"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("follows the OS live while on auto", () => {
    const mql = mockMatchMedia(false);
    renderHook(() => useTheme());
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    act(() => {
      mql.matches = true;
      mql.dispatch();
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("stops following the OS once a pref is locked", () => {
    const mql = mockMatchMedia(false);
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setPref("light"));
    act(() => {
      mql.matches = true;
      mql.dispatch();
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
