// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { resolveTheme, readPref, savePref, applyTheme } from "./theme";

describe("resolveTheme", () => {
  it("auto follows the OS", () => {
    expect(resolveTheme("auto", true)).toBe("dark");
    expect(resolveTheme("auto", false)).toBe("light");
  });
  it("explicit picks ignore the OS", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });
});

describe("readPref / savePref", () => {
  beforeEach(() => localStorage.clear());
  it("returns auto when nothing is stored", () => {
    expect(readPref()).toBe("auto");
  });
  it("round-trips a saved pref", () => {
    savePref("dark");
    expect(readPref()).toBe("dark");
  });
  it("falls back to auto for a garbage value", () => {
    localStorage.setItem("theme", "blue");
    expect(readPref()).toBe("auto");
  });
});

describe("applyTheme", () => {
  it("sets data-theme on <html>", () => {
    applyTheme("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
