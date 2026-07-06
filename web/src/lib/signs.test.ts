import { describe, it, expect } from "vitest";
import {
  GRAHAS, SIGN_WESTERN, SIGN_DEVANAGARI, houseOfSign,
  PLANET_WESTERN, PLANET_DEVANAGARI, dignity,
} from "./signs";

describe("signs", () => {
  it("has 12 names in each script, Aries first", () => {
    expect(SIGN_WESTERN).toHaveLength(12);
    expect(SIGN_DEVANAGARI).toHaveLength(12);
    expect(SIGN_WESTERN[0]).toBe("Aries");
    expect(SIGN_DEVANAGARI[0]).toBe("मेष");
  });
  it("puts house1Sign in house 1", () => {
    expect(houseOfSign(0, 0)).toBe(1); // Aries in house 1 (default)
    expect(houseOfSign(1, 0)).toBe(2); // Taurus -> house 2
    expect(houseOfSign(1, 1)).toBe(1); // Taurus lagna -> Taurus in house 1
    expect(houseOfSign(0, 1)).toBe(12); // Aries -> house 12 when Taurus is lagna
  });
});

describe("planet labels", () => {
  it("has a label for every graha in both scripts", () => {
    for (const g of GRAHAS) {
      expect(PLANET_WESTERN[g]).toBeTruthy();
      expect(PLANET_DEVANAGARI[g]).toBeTruthy();
    }
    expect(PLANET_WESTERN.sun).toBe("Sun");
    expect(PLANET_DEVANAGARI.sun).toBe("सूर्य");
    expect(PLANET_DEVANAGARI.saturn).toBe("शनि");
  });
});

describe("dignity", () => {
  it("marks exaltation signs", () => {
    expect(dignity("sun", 0)).toBe("exalted");      // Sun in Aries
    expect(dignity("moon", 1)).toBe("exalted");     // Moon in Taurus
    expect(dignity("mars", 9)).toBe("exalted");     // Mars in Capricorn
    expect(dignity("saturn", 6)).toBe("exalted");   // Saturn in Libra
  });
  it("marks debilitation signs", () => {
    expect(dignity("sun", 6)).toBe("debilitated");     // Sun in Libra
    expect(dignity("jupiter", 9)).toBe("debilitated"); // Jupiter in Capricorn
    expect(dignity("venus", 5)).toBe("debilitated");   // Venus in Virgo
  });
  it("handles Rahu/Ketu dual signs per school table", () => {
    expect(dignity("rahu", 1)).toBe("exalted");      // Rahu in Taurus
    expect(dignity("rahu", 2)).toBe("exalted");      // Rahu in Gemini
    expect(dignity("rahu", 7)).toBe("debilitated");  // Rahu in Scorpio
    expect(dignity("rahu", 8)).toBe("debilitated");  // Rahu in Sagittarius
    expect(dignity("ketu", 7)).toBe("exalted");      // Ketu in Scorpio
    expect(dignity("ketu", 1)).toBe("debilitated");  // Ketu in Taurus
  });
  it("returns null for neutral placements", () => {
    expect(dignity("sun", 4)).toBeNull();  // Sun in Leo (own, not exalted)
    expect(dignity("moon", 0)).toBeNull();
  });
});
