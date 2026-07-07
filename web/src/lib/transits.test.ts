import { describe, it, expect } from "vitest";
import {
  signAt, transitionsInRange, nextTransitionToday, type TransitData, type Transition,
} from "./transits";

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

describe("nextTransitionToday", () => {
  // Local-time construction throughout, so this is stable under any test-runner TZ.
  it("returns the upcoming transition when it falls on the same local day", () => {
    const now = new Date(2024, 5, 15, 5, 0); // June 15, 5:00am local
    const laterToday = new Date(2024, 5, 15, 22, 30); // June 15, 10:30pm local
    const list: Transition[] = [
      { sign: 1, enters: new Date(2024, 5, 1, 0, 0).toISOString() },
      { sign: 2, enters: laterToday.toISOString() },
    ];
    expect(nextTransitionToday(list, now)).toEqual({ sign: 2, enters: laterToday.toISOString() });
  });

  it("returns undefined when the next transition is tomorrow or later", () => {
    const now = new Date(2024, 5, 15, 22, 0);
    const tomorrow = new Date(2024, 5, 16, 1, 0);
    const list: Transition[] = [
      { sign: 1, enters: new Date(2024, 5, 1, 0, 0).toISOString() },
      { sign: 2, enters: tomorrow.toISOString() },
    ];
    expect(nextTransitionToday(list, now)).toBeUndefined();
  });

  it("returns undefined when there is no future transition at all", () => {
    const now = new Date(2024, 5, 15, 12, 0);
    const list: Transition[] = [
      { sign: 1, enters: new Date(2024, 5, 1, 0, 0).toISOString() },
    ];
    expect(nextTransitionToday(list, now)).toBeUndefined();
  });

  it("returns undefined for an empty list", () => {
    expect(nextTransitionToday([], new Date(2024, 5, 15, 12, 0))).toBeUndefined();
  });

  it("treats a transition exactly at t as already happened, not upcoming", () => {
    const now = new Date(2024, 5, 15, 12, 0);
    const later = new Date(2024, 5, 15, 18, 0);
    const list: Transition[] = [
      { sign: 1, enters: now.toISOString() },
      { sign: 2, enters: later.toISOString() },
    ];
    // An entry at exactly t is current state (signAt territory); the preview
    // must skip it and surface the next strictly-future one.
    expect(nextTransitionToday(list, now)).toEqual({ sign: 2, enters: later.toISOString() });
  });

  it("ignores a transition earlier the same day that has already passed", () => {
    const now = new Date(2024, 5, 15, 12, 0);
    const list: Transition[] = [
      { sign: 1, enters: new Date(2024, 5, 15, 3, 0).toISOString() }, // past, today
      { sign: 2, enters: new Date(2024, 5, 16, 1, 0).toISOString() }, // tomorrow
    ];
    expect(nextTransitionToday(list, now)).toBeUndefined();
  });

  it("picks the next upcoming transition of the day, not the last", () => {
    const now = new Date(2024, 5, 15, 5, 0);
    const first = new Date(2024, 5, 15, 10, 0);
    const second = new Date(2024, 5, 15, 20, 0);
    const list: Transition[] = [
      { sign: 1, enters: first.toISOString() },
      { sign: 2, enters: second.toISOString() },
    ];
    expect(nextTransitionToday(list, now)).toEqual({ sign: 1, enters: first.toISOString() });
  });

  it("includes 23:59:59 local but excludes 00:00:00 the next day", () => {
    const now = new Date(2024, 5, 15, 12, 0);
    const endOfDay = new Date(2024, 5, 15, 23, 59, 59);
    expect(nextTransitionToday([{ sign: 1, enters: endOfDay.toISOString() }], now))
      .toEqual({ sign: 1, enters: endOfDay.toISOString() });
    const midnight = new Date(2024, 5, 16, 0, 0, 0);
    expect(nextTransitionToday([{ sign: 1, enters: midnight.toISOString() }], now))
      .toBeUndefined();
  });
});
