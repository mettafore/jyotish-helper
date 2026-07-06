import {
  GRAHAS, GRAHA_COLOR, PLANET_WESTERN, PLANET_DEVANAGARI,
  SIGN_WESTERN, SIGN_DEVANAGARI,
} from "../lib/signs";
import {
  longitudeAt, isRetrograde, isCombust, degreeInSign,
  COMBUST_ORB_DEFAULT, COMBUST_ORB_MERCURY, type DegreesData,
} from "../lib/degrees";

export function GrahaDegrees(
  { data, date, script }:
  { data: DegreesData; date: Date; script: "western" | "devanagari" },
) {
  const signs = script === "devanagari" ? SIGN_DEVANAGARI : SIGN_WESTERN;
  const label = script === "devanagari" ? PLANET_DEVANAGARI : PLANET_WESTERN;
  return (
    <div>
      <ul className="degrees">
        {GRAHAS.filter((g) => data.planets[g]).map((g) => {
          const { sign, deg } = degreeInSign(longitudeAt(data, g, date));
          return (
            <li key={g}>
              <span className="g" style={{ color: GRAHA_COLOR[g] }}>{label[g]}</span>
              <span className="d">{deg.toFixed(1)}°</span>
              <span className="s">{signs[sign]}</span>
              {isCombust(data, g, date) && <span className="r" title="combust">🔥</span>}
              {isRetrograde(data, g, date) && <span className="r" title="retrograde">🌀</span>}
            </li>
          );
        })}
      </ul>
      <p className="assume">
        ⬆ exalted · ⬇ debilitated · 🌀 retrograde ·
        🔥 combust within {COMBUST_ORB_DEFAULT}° of the Sun (Mercury {COMBUST_ORB_MERCURY}°)
        — daily positions
      </p>
    </div>
  );
}
