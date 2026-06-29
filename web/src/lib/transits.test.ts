import { describe, it, expect } from "vitest";
import { signAt, transitionsInRange, type TransitData } from "./transits";

const data: TransitData = {
  ayanamsa: "lahiri",
  range: { start: "2024-01-01T00:00:00Z", end: "2025-01-01T00:00:00Z" },
  planets: {
    saturn: [
      { sign: 10, enters: "2023-01-17T00:00:00Z" },
      { sign: 11, enters: "2025-03-29T00:00:00Z" },
    ],
    mars: [
      { sign: 8, enters: "2023-12-01T00:00:00Z" },
      { sign: 9, enters: "2024-02-04T00:00:00Z" },
      { sign: 10, enters: "2024-03-15T00:00:00Z" },
    ],
  },
};

describe("signAt", () => {
  it("returns the sign active at t", () => {
    expect(signAt(data.planets.saturn, new Date("2024-06-01T00:00:00Z"))).toBe(10);
    expect(signAt(data.planets.mars, new Date("2024-02-20T00:00:00Z"))).toBe(9);
  });
  it("returns first sign when t precedes all entries", () => {
    expect(signAt(data.planets.mars, new Date("2020-01-01T00:00:00Z"))).toBe(8);
  });
});

describe("transitionsInRange", () => {
  it("returns sorted ingress events, skipping seeds, filtered by planet", () => {
    const out = transitionsInRange(
      data, ["mars"],
      new Date("2024-01-01T00:00:00Z"), new Date("2024-12-31T00:00:00Z"),
    );
    expect(out.map((e) => e.sign)).toEqual([9, 10]); // seed (8) skipped
    expect(out.every((e) => e.planet === "mars")).toBe(true);
  });
});
