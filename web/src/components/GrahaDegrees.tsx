import {
  GRAHAS, GRAHA_COLOR, PLANET_WESTERN, PLANET_DEVANAGARI,
  SIGN_WESTERN, SIGN_DEVANAGARI,
} from "../lib/signs";
import {
  isRetrograde, isCombust, effectiveSignDegree, fmtDeg,
  COMBUST_ORB_DEFAULT, COMBUST_ORB_MERCURY, type DegreesData,
} from "../lib/degrees";
import { nextTransitionToday, type Transition } from "../lib/transits";
import { fmtTime } from "../lib/format";

export function GrahaDegrees(
  { data, transitions, date, script }:
  {
    data: DegreesData; transitions: Record<string, Transition[]>; date: Date;
    script: "western" | "devanagari";
  },
) {
  const signs = script === "devanagari" ? SIGN_DEVANAGARI : SIGN_WESTERN;
  const label = script === "devanagari" ? PLANET_DEVANAGARI : PLANET_WESTERN;
  return (
    <div>
      <ul className="degrees">
        {GRAHAS.filter((g) => data.planets[g]).map((g) => {
          const { sign, deg } = effectiveSignDegree(data, transitions[g], g, date);
          const next = nextTransitionToday(transitions[g] ?? [], date);
          return (
            <li key={g}>
              <div className="row">
                <span className="g" style={{ color: GRAHA_COLOR[g] }}>{label[g]}</span>
                <span className="d">{fmtDeg(deg)}°</span>
                <span className="s">{signs[sign]}</span>
                {isCombust(data, g, date) && <span className="r" title="combust">🔥</span>}
                {isRetrograde(data, g, date) && <span className="r" title="retrograde">🌀</span>}
              </div>
              {next && (
                <div className="n">→ {fmtTime(new Date(next.enters))} {signs[next.sign]}</div>
              )}
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
