import { describe, it, expect } from "vitest";
import { nakshatraOf, NAKSHATRA_WESTERN, NAKSHATRA_DEVANAGARI } from "./nakshatra";

describe("nakshatraOf", () => {
  it("starts at Ashwini pada 1 for 0°", () => {
    expect(nakshatraOf(0)).toEqual({ index: 0, pada: 1 });
  });

  it("splits the 13°20′ boundary between Ashwini and Bharani", () => {
    expect(nakshatraOf(13.33)).toEqual({ index: 0, pada: 4 });
    expect(nakshatraOf(13.34)).toEqual({ index: 1, pada: 1 });
  });

  it("lands exact pada boundaries in the upper pada (multiply-first math)", () => {
    // 110° = 33 × 3°20′ exactly; naive division would floor to 32.999…
    expect(nakshatraOf(110)).toEqual({ index: 8, pada: 2 });
  });

  it("matches a known position: 323.5026° = Purva Bhadrapada pada 2", () => {
    expect(nakshatraOf(323.5026)).toEqual({ index: 24, pada: 2 });
    expect(NAKSHATRA_WESTERN[24]).toBe("P. Bhadrapada");
  });

  it("ends at Revati pada 4 and wraps 360° back to Ashwini", () => {
    expect(nakshatraOf(359.99)).toEqual({ index: 26, pada: 4 });
    expect(nakshatraOf(360)).toEqual({ index: 0, pada: 1 });
  });

  it("has 27 names in both scripts", () => {
    expect(NAKSHATRA_WESTERN).toHaveLength(27);
    expect(NAKSHATRA_DEVANAGARI).toHaveLength(27);
    expect(NAKSHATRA_WESTERN[2]).toBe("Krittika");
    expect(NAKSHATRA_DEVANAGARI[2]).toBe("कृत्तिका");
  });
});
