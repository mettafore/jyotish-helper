import { houseOfSign, dignity, GRAHA_COLOR } from "../lib/signs";

const ABBR: Record<string, string> = {
  sun: "Su", moon: "Mo", mars: "Ma", mercury: "Me", jupiter: "Ju",
  venus: "Ve", saturn: "Sa", rahu: "Ra", ketu: "Ke",
};
const ABBR_DEVA: Record<string, string> = {
  sun: "सू", moon: "चं", mars: "मं", mercury: "बु", jupiter: "गु",
  venus: "शु", saturn: "श", rahu: "रा", ketu: "के",
};
const DEVA_NUM = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const toDeva = (n: number) => String(n).split("").map((d) => DEVA_NUM[+d]).join("");
// House centroids (x,y) at viewBox 400 — from jyotish-design-standards.
const CENTROID: Record<number, [number, number]> = {
  1: [200, 105], 2: [118, 40], 3: [58, 118], 4: [100, 206], 5: [58, 296], 6: [118, 366],
  7: [200, 312], 8: [284, 366], 9: [356, 300], 10: [304, 206], 11: [320, 118], 12: [284, 40],
};
// Where to print the faint sign number for each house cell.
const SNUM: Record<number, [number, number]> = {
  1: [200, 56], 2: [118, 38], 3: [44, 94], 4: [58, 198], 5: [44, 310], 6: [118, 366],
  7: [200, 348], 8: [284, 366], 9: [356, 310], 10: [346, 198], 11: [356, 94], 12: [284, 38],
};

export function NorthIndianChart(
  { positions, house1Sign, script = "western", retro = {}, combust = {} }:
  {
    positions: Record<string, number>;
    house1Sign: number;
    script?: "western" | "devanagari";
    retro?: Record<string, boolean>;
    combust?: Record<string, boolean>;
  },
) {
  const abbr = script === "devanagari" ? ABBR_DEVA : ABBR;
  const num = (n: number) => (script === "devanagari" ? toDeva(n) : String(n));
  // Group grahas by house so multiple in one cell stack horizontally.
  const byHouse: Record<number, string[]> = {};
  for (const [planet, sign] of Object.entries(positions)) {
    const h = houseOfSign(sign, house1Sign);
    (byHouse[h] ??= []).push(planet);
  }
  // Sign sitting in each house (0..11) given the chosen house-1 sign.
  const signInHouse = (h: number) => ((house1Sign + h - 1) % 12) + 1;

  return (
    <svg className="chart" viewBox="0 0 400 400" style={{ width: "100%", display: "block" }}>
      <rect x="2" y="2" width="396" height="396" rx="6" fill="rgba(255,252,244,.4)"
            stroke="var(--gold)" strokeWidth="1.5" />
      <line x1="2" y1="2" x2="398" y2="398" stroke="var(--gold)" strokeWidth="1.1" opacity=".7" />
      <line x1="398" y1="2" x2="2" y2="398" stroke="var(--gold)" strokeWidth="1.1" opacity=".7" />
      <polygon points="200,2 398,200 200,398 2,200" fill="none"
               stroke="var(--gold)" strokeWidth="1.1" opacity=".7" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => {
        const [sx, sy] = SNUM[h];
        return (
          <text key={`s${h}`} x={sx} y={sy} textAnchor="middle"
                fill="var(--faint)" fontSize={9} fontWeight={600}
                fontFamily="Inter, sans-serif">
            {num(signInHouse(h))}
          </text>
        );
      })}
      {Object.entries(byHouse).map(([h, planets]) => {
        const [cx, cy] = CENTROID[Number(h)];
        return (
          <text key={h} x={cx} y={cy} textAnchor="middle"
                fontFamily="Sora, sans-serif" fontWeight={600} fontSize={15}>
            {planets.map((p, i) => {
              const d = dignity(p, positions[p]);
              const mark = (d === "exalted" ? "⬆" : d === "debilitated" ? "⬇" : "")
                + (combust[p] ? "🔥" : "") + (retro[p] ? "🌀" : "");
              return (
                <tspan key={p} fill={GRAHA_COLOR[p]} dx={i ? 6 : 0}>
                  {abbr[p]}{mark && <tspan fontSize={10}>{mark}</tspan>}
                </tspan>
              );
            })}
          </text>
        );
      })}
    </svg>
  );
}
