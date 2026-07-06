export const GRAHAS = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];

export const GRAHA_COLOR: Record<string, string> = {
  sun: "var(--gr-su)", moon: "var(--gr-mo)", mars: "var(--gr-ma)", mercury: "var(--gr-me)",
  jupiter: "var(--gr-ju)", venus: "var(--gr-ve)", saturn: "var(--gr-sa)",
  rahu: "var(--gr-ra)", ketu: "var(--gr-ke)",
};

export const SIGN_WESTERN = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

export const SIGN_DEVANAGARI = [
  "मेष", "वृष", "मिथुन", "कर्क", "सिंह", "कन्या",
  "तुला", "वृश्चिक", "धनु", "मकर", "कुम्भ", "मीन",
];

export const PLANET_WESTERN: Record<string, string> = {
  sun: "Sun", moon: "Moon", mars: "Mars", mercury: "Merc", jupiter: "Jup",
  venus: "Ven", saturn: "Sat", rahu: "Rahu", ketu: "Ketu",
};

export const PLANET_DEVANAGARI: Record<string, string> = {
  sun: "सूर्य", moon: "चन्द्र", mars: "मंगल", mercury: "बुध", jupiter: "गुरु",
  venus: "शुक्र", saturn: "शनि", rahu: "राहु", ketu: "केतु",
};

// Exaltation/debilitation signs (0-11) per graha. Rahu/Ketu span two signs
// (school convention: Rahu Taurus/Gemini ↔ Scorpio/Sagittarius; Ketu mirrored).
const EXALTATION: Record<string, number[]> = {
  sun: [0], moon: [1], mars: [9], mercury: [5], jupiter: [3],
  venus: [11], saturn: [6], rahu: [1, 2], ketu: [7, 8],
};
const DEBILITATION: Record<string, number[]> = {
  sun: [6], moon: [7], mars: [3], mercury: [11], jupiter: [9],
  venus: [5], saturn: [0], rahu: [7, 8], ketu: [1, 2],
};

export function dignity(graha: string, sign: number): "exalted" | "debilitated" | null {
  if (EXALTATION[graha]?.includes(sign)) return "exalted";
  if (DEBILITATION[graha]?.includes(sign)) return "debilitated";
  return null;
}

// House (1..12) for a given sign (0..11) when house1Sign sits in house 1.
export function houseOfSign(sign: number, house1Sign: number): number {
  return ((sign - house1Sign + 12) % 12) + 1;
}
