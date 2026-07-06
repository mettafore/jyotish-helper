import { describe, it, expect } from "vitest";
import { longitudeAt, isRetrograde, degreeInSign, type DegreesData } from "./degrees";

const data: DegreesData = {
  ayanamsa: "lahiri",
  start: "2020-01-01T00:00:00Z",
  stepDays: 1,
  planets: {
    sun: [100.0, 101.0, 102.0, 103.0],
    mars: [20.0, 19.5, 19.2, 19.4],          // retro days 0-2, direct day 2->3
    venus: [359.5, 0.2, 0.9, 1.6],           // direct across the 360° wrap
    mercury: [0.4, 359.8, 359.1, 358.4],     // retro across the wrap
    rahu: [45.0, 44.9, 44.8, 44.7],          // nodes: always drifting backward
  },
};

const day = (n: number) => new Date(Date.UTC(2020, 0, 1 + n, 9, 30)); // mid-day times

describe("longitudeAt", () => {
  it("returns the sample for the viewed date, ignoring time of day", () => {
    expect(longitudeAt(data, "sun", day(0))).toBe(100.0);
    expect(longitudeAt(data, "sun", day(2))).toBe(102.0);
  });
  it("clamps outside the window", () => {
    expect(longitudeAt(data, "sun", new Date("2019-06-01T00:00:00Z"))).toBe(100.0);
    expect(longitudeAt(data, "sun", new Date("2021-06-01T00:00:00Z"))).toBe(103.0);
  });
});

describe("isRetrograde", () => {
  it("is false for direct motion", () => {
    expect(isRetrograde(data, "sun", day(1))).toBe(false);
  });
  it("is true while longitude decreases day over day", () => {
    expect(isRetrograde(data, "mars", day(0))).toBe(true);
    expect(isRetrograde(data, "mars", day(1))).toBe(true);
    expect(isRetrograde(data, "mars", day(2))).toBe(false); // turns direct
  });
  it("handles the 360° wrap in both directions", () => {
    expect(isRetrograde(data, "venus", day(0))).toBe(false);   // 359.5 -> 0.2 is direct
    expect(isRetrograde(data, "mercury", day(0))).toBe(true);  // 0.4 -> 359.8 is retro
  });
  it("never marks the always-retrograde nodes", () => {
    expect(isRetrograde(data, "rahu", day(1))).toBe(false);
    expect(isRetrograde(data, "ketu", day(1))).toBe(false);
  });
});

describe("degreeInSign", () => {
  it("splits a longitude into sign index and degree within sign", () => {
    expect(degreeInSign(100.0)).toEqual({ sign: 3, deg: 10.0 }); // 10° Cancer
    expect(degreeInSign(0.5)).toEqual({ sign: 0, deg: 0.5 });
    expect(degreeInSign(359.5)).toEqual({ sign: 11, deg: 29.5 });
  });
});
