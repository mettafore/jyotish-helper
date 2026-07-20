import { describe, it, expect } from "vitest";
import {
  longitudeAt, isRetrograde, isCombust, degreeInSign, effectiveSignDegree, fmtDeg,
  type DegreesData,
} from "./degrees";
import type { Transition } from "./transits";

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

describe("isCombust", () => {
  // Orbs per school: 15° from the Sun generally, 10° for Mercury.
  const d: DegreesData = {
    ayanamsa: "lahiri",
    start: "2020-01-01T00:00:00Z",
    stepDays: 1,
    planets: {
      sun: [100.0, 359.0],
      mercury: [109.0, 111.0], // 9° away (combust), then 112° away on day 1
      venus: [114.0, 10.0],    // 14° away (combust); day 1: 11° across the wrap
      mars: [116.0, 200.0],    // 16° away (not combust)
      jupiter: [86.0, 200.0],  // 14° on the other side (combust)
      rahu: [101.0, 101.0],    // nodes never combust
    },
  };
  const day0 = new Date("2020-01-01T12:00:00Z");
  const day1 = new Date("2020-01-02T12:00:00Z");

  it("uses 15° generally and 10° for Mercury", () => {
    expect(isCombust(d, "mercury", day0)).toBe(true);   // 9 < 10
    expect(isCombust(d, "venus", day0)).toBe(true);     // 14 < 15
    expect(isCombust(d, "mars", day0)).toBe(false);     // 16 > 15
    expect(isCombust(d, "jupiter", day0)).toBe(true);   // 14 < 15, behind the Sun
  });
  it("measures separation across the 360° wrap", () => {
    expect(isCombust(d, "venus", day1)).toBe(true);     // 359° vs 10° = 11° apart
  });
  it("never marks the Sun or the nodes", () => {
    expect(isCombust(d, "sun", day0)).toBe(false);
    expect(isCombust(d, "rahu", day0)).toBe(false);
    expect(isCombust(d, "ketu", day0)).toBe(false);
  });
});

describe("degreeInSign", () => {
  it("splits a longitude into sign index and degree within sign", () => {
    expect(degreeInSign(100.0)).toEqual({ sign: 3, deg: 10.0 }); // 10° Cancer
    expect(degreeInSign(0.5)).toEqual({ sign: 0, deg: 0.5 });
    expect(degreeInSign(359.5)).toEqual({ sign: 11, deg: 29.5 });
  });
});

describe("fmtDeg", () => {
  it("rounds to one decimal for normal values", () => {
    expect(fmtDeg(20.68)).toBe("20.7");
    expect(fmtDeg(0)).toBe("0.0");
  });
  it("never rounds up out of the sign — degrees are [0,30)", () => {
    expect(fmtDeg(29.99)).toBe("29.9"); // fabricated retrograde-entry value
    expect(fmtDeg(29.96)).toBe("29.9"); // real near-boundary daily sample
    expect(fmtDeg(30.0)).toBe("29.9");  // degreeInSign can already yield 30.0
  });
  it("handles near-boundary rounding just below the clamp", () => {
    expect(fmtDeg(29.94)).toBe("29.9");
    expect(fmtDeg(29.85)).toBe("29.9"); // rounds up but stays in-sign
  });
});

describe("effectiveSignDegree", () => {
  // Repro: Mercury retrograde-recrosses into Gemini at 05:16 UTC on day 1,
  // hours after the day-1 daily snapshot (taken at 00:00 UTC, still 90.11°
  // Cancer). Anyone viewing after the crossing should see Gemini, not the
  // stale Cancer snapshot.
  const mercuryData: DegreesData = {
    ayanamsa: "lahiri",
    start: "2020-01-01T00:00:00Z",
    stepDays: 1,
    planets: { mercury: [91.0, 90.11] },
  };
  const transitions: Transition[] = [
    { sign: 3, enters: "2019-12-15T00:00:00Z" }, // entered Cancer (direct), weeks earlier
    { sign: 2, enters: "2020-01-02T05:16:24Z" }, // retrograde re-entry into Gemini
  ];

  it("prefers a transition that happened after the daily snapshot", () => {
    const viewing = new Date("2020-01-02T10:00:00Z"); // after the 05:16 crossing
    expect(effectiveSignDegree(mercuryData, transitions, "mercury", viewing))
      .toEqual({ sign: 2, deg: 29.99, lon: 89.99 }); // raw retrograde-entry value; fmtDeg clamps
                                         // the *display* so it never rounds to "30.0°"
  });

  it("falls back to the daily snapshot when no transition beats it", () => {
    const viewing = new Date("2020-01-02T02:00:00Z"); // before the 05:16 crossing
    expect(effectiveSignDegree(mercuryData, transitions, "mercury", viewing))
      .toEqual({ ...degreeInSign(90.11), lon: 90.11 }); // sign 3 (Cancer), deg 0.11
  });

  it("uses degree 0 for a direct-motion transition", () => {
    const directTransitions: Transition[] = [
      { sign: 2, enters: "2019-12-15T00:00:00Z" },
      { sign: 3, enters: "2020-01-02T05:16:24Z" }, // direct entry into Cancer
    ];
    const viewing = new Date("2020-01-02T10:00:00Z");
    expect(effectiveSignDegree(mercuryData, directTransitions, "mercury", viewing))
      .toEqual({ sign: 3, deg: 0, lon: 90 });
  });

  it("falls back to the daily snapshot when transitions are absent", () => {
    const viewing = new Date("2020-01-02T10:00:00Z");
    expect(effectiveSignDegree(mercuryData, undefined, "mercury", viewing))
      .toEqual({ ...degreeInSign(90.11), lon: 90.11 });
  });

  it("falls back to the daily snapshot for an empty transitions array", () => {
    const viewing = new Date("2020-01-02T10:00:00Z");
    expect(effectiveSignDegree(mercuryData, [], "mercury", viewing))
      .toEqual({ ...degreeInSign(90.11), lon: 90.11 });
  });

  it("falls back to the daily snapshot when viewing before the first transition", () => {
    const viewing = new Date("2019-12-01T00:00:00Z"); // before any listed entry
    // dayIndex clamps to day 0 (91.0° = 1° Cancer)
    expect(effectiveSignDegree(mercuryData, transitions, "mercury", viewing))
      .toEqual({ ...degreeInSign(91.0), lon: 91.0 });
  });

  it("keeps the daily snapshot when the transition is exactly at the snapshot time", () => {
    const atSnapshot: Transition[] = [
      { sign: 2, enters: "2020-01-02T00:00:00Z" }, // == day-1 sample time
    ];
    const viewing = new Date("2020-01-02T10:00:00Z");
    // The snapshot already reflects a crossing at/before its own timestamp.
    expect(effectiveSignDegree(mercuryData, atSnapshot, "mercury", viewing))
      .toEqual({ ...degreeInSign(90.11), lon: 90.11 });
  });

  it("applies a transition occurring exactly at the viewed instant", () => {
    const viewing = new Date("2020-01-02T05:16:24Z"); // == the crossing time
    expect(effectiveSignDegree(mercuryData, transitions, "mercury", viewing))
      .toEqual({ sign: 2, deg: 29.99, lon: 89.99 });
  });

  it("uses the latest crossing when multiple happen between snapshot and viewed time", () => {
    const recrossings: Transition[] = [
      { sign: 3, enters: "2019-12-15T00:00:00Z" }, // Cancer, direct
      { sign: 2, enters: "2020-01-02T03:00:00Z" }, // retro back into Gemini
      { sign: 3, enters: "2020-01-02T08:00:00Z" }, // direct into Cancer again
    ];
    const viewing = new Date("2020-01-02T10:00:00Z");
    expect(effectiveSignDegree(mercuryData, recrossings, "mercury", viewing))
      .toEqual({ sign: 3, deg: 0, lon: 90 });
  });

  it("treats a lone first transition (no prior entry) as a direct entry at 0°", () => {
    const lone: Transition[] = [{ sign: 2, enters: "2020-01-02T05:00:00Z" }];
    const viewing = new Date("2020-01-02T10:00:00Z");
    expect(effectiveSignDegree(mercuryData, lone, "mercury", viewing))
      .toEqual({ sign: 2, deg: 0, lon: 60 });
  });
});
