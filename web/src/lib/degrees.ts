// Daily sidereal longitudes (degrees.json). Values are one sample per day at
// 00:00 UTC; everything here is date-granular by design — never surface a
// time of day next to a degree-derived value.

import type { Transition } from "./transits";

export interface DegreesData {
  ayanamsa: string;
  start: string;
  stepDays: number;
  planets: Record<string, number[]>;
}

const DAY_MS = 86400000;

function dayIndex(data: DegreesData, planet: string, d: Date): number {
  const arr = data.planets[planet];
  const i = Math.floor(
    (d.getTime() - new Date(data.start).getTime()) / (data.stepDays * DAY_MS),
  );
  return Math.min(Math.max(i, 0), arr.length - 1);
}

function sampleTimeAt(data: DegreesData, planet: string, d: Date): number {
  const i = dayIndex(data, planet, d);
  return new Date(data.start).getTime() + i * data.stepDays * DAY_MS;
}

export function longitudeAt(data: DegreesData, planet: string, d: Date): number {
  return data.planets[planet][dayIndex(data, planet, d)];
}

// Signed shortest angular step a -> b, so the 360°->0° wrap reads as direct
// motion and 0°->360° as retrograde.
const step = (a: number, b: number) => ((b - a + 540) % 360) - 180;

export function isRetrograde(data: DegreesData, planet: string, d: Date): boolean {
  // The nodes are always retrograde; a permanent marker carries no information.
  if (planet === "rahu" || planet === "ketu") return false;
  const arr = data.planets[planet];
  let i = dayIndex(data, planet, d);
  if (i === arr.length - 1) i -= 1;
  return step(arr[i], arr[i + 1]) < 0;
}

// Combustion orbs (degrees from the Sun), per the project's school:
// 15° generally, 10° for Mercury. Stated in the UI wherever 🔥 is explained.
export const COMBUST_ORB_DEFAULT = 15;
export const COMBUST_ORB_MERCURY = 10;

export function isCombust(data: DegreesData, planet: string, d: Date): boolean {
  if (planet === "sun" || planet === "rahu" || planet === "ketu") return false;
  const sun = data.planets.sun;
  if (!sun || !data.planets[planet]) return false;
  const sep = Math.abs(step(longitudeAt(data, "sun", d), longitudeAt(data, planet, d)));
  const orb = planet === "mercury" ? COMBUST_ORB_MERCURY : COMBUST_ORB_DEFAULT;
  return sep < orb;
}

export function degreeInSign(lon: number): { sign: number; deg: number } {
  const sign = Math.floor((lon % 360) / 30);
  return { sign, deg: Math.round((lon - sign * 30) * 100) / 100 };
}

// Degrees within a sign live in [0, 30). Round to one decimal for display, but
// never let rounding push a near-boundary value up to "30.0°" (an impossible
// coordinate — that's 0° of the next sign). Caps at 29.9°.
export function fmtDeg(deg: number): string {
  return Math.min(Math.round(deg * 10) / 10, 29.9).toFixed(1);
}

// The daily snapshot goes stale the moment a real sign transition happens
// after it. If transitions.json shows a later crossing than the snapshot's
// own timestamp, trust the crossing for the sign; the exact degree isn't
// stored for transitions, so use the boundary value (0° direct entry, ~30°
// retrograde entry, inferred from the prior transition's sign).
export function effectiveSignDegree(
  data: DegreesData,
  transitions: Transition[] | undefined,
  planet: string,
  d: Date,
): { sign: number; deg: number; lon: number } {
  // `deg` is rounded for display; `lon` stays unrounded so finer-grained
  // derivations (nakshatra/pada) can't be pushed across a boundary — or
  // wrapped to 360° — by the rounding.
  // Normalize without the ((x%360)+360)%360 dance: adding 360 to an already
  // in-range value injects float noise (90.11 -> 90.11000000000001).
  let rawLon = longitudeAt(data, planet, d) % 360;
  if (rawLon < 0) rawLon += 360;
  const daily = { ...degreeInSign(rawLon), lon: rawLon };
  if (!transitions || transitions.length === 0) return daily;

  const ms = d.getTime();
  let lo = 0, hi = transitions.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (new Date(transitions[mid].enters).getTime() <= ms) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (ans < 0) return daily;

  const entry = transitions[ans];
  const entryMs = new Date(entry.enters).getTime();
  if (entryMs <= sampleTimeAt(data, planet, d)) return daily;

  const prevSign = ans > 0 ? transitions[ans - 1].sign : undefined;
  const retro = prevSign !== undefined && (entry.sign - prevSign + 12) % 12 === 11;
  const deg = retro ? 29.99 : 0;
  return { sign: entry.sign, deg, lon: entry.sign * 30 + deg };
}
