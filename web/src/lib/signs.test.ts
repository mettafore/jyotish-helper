import { describe, it, expect } from "vitest";
import { SIGN_WESTERN, SIGN_DEVANAGARI, houseOfSign } from "./signs";

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
