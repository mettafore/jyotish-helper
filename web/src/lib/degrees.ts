// Daily sidereal longitudes (degrees.json). Values are one sample per day at
// 00:00 UTC; everything here is date-granular by design — never surface a
// time of day next to a degree-derived value.

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
