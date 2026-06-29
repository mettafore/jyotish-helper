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

// House (1..12) for a given sign (0..11) when house1Sign sits in house 1.
export function houseOfSign(sign: number, house1Sign: number): number {
  return ((sign - house1Sign + 12) % 12) + 1;
}
