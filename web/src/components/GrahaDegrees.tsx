import { useState } from "react";
import {
  GRAHAS, GRAHA_COLOR, PLANET_WESTERN, PLANET_DEVANAGARI,
  SIGN_WESTERN, SIGN_DEVANAGARI,
} from "../lib/signs";
import {
  isRetrograde, isCombust, effectiveSignDegree, fmtDeg,
  COMBUST_ORB_DEFAULT, COMBUST_ORB_MERCURY, type DegreesData,
} from "../lib/degrees";
import { nakshatraOf, NAKSHATRA_WESTERN, NAKSHATRA_DEVANAGARI } from "../lib/nakshatra";
import { nextTransitionToday, type Transition } from "../lib/transits";
import { fmtTime } from "../lib/format";

type View = "rasi" | "nakshatra";
const VIEW_KEY = "jyotish.degreesView";

function loadView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === "nakshatra" ? "nakshatra" : "rasi";
  } catch {
    return "rasi";
  }
}

export function GrahaDegrees(
  { data, transitions, date, script }:
  {
    data: DegreesData; transitions: Record<string, Transition[]>; date: Date;
    script: "western" | "devanagari";
  },
) {
  const [view, setView] = useState<View>(loadView);
  const pick = (v: View) => {
    setView(v);
    try { localStorage.setItem(VIEW_KEY, v); } catch { /* private mode */ }
  };

  const signs = script === "devanagari" ? SIGN_DEVANAGARI : SIGN_WESTERN;
  const label = script === "devanagari" ? PLANET_DEVANAGARI : PLANET_WESTERN;
  const naks = script === "devanagari" ? NAKSHATRA_DEVANAGARI : NAKSHATRA_WESTERN;
  return (
    <div>
      <div className="deghead">
        <label>Graha degrees · daily</label>
        <div className="seg seg-sm">
          <button type="button" className={view === "rasi" ? "on" : ""}
                  aria-pressed={view === "rasi"}
                  onClick={() => pick("rasi")}>Rāśi °</button>
          <button type="button" className={view === "nakshatra" ? "on" : ""}
                  aria-pressed={view === "nakshatra"}
                  onClick={() => pick("nakshatra")}>Nakshatra</button>
        </div>
      </div>
      <ul className="degrees">
        {GRAHAS.filter((g) => data.planets[g]).map((g) => {
          const { sign, deg, lon } = effectiveSignDegree(data, transitions[g], g, date);
          const nak = nakshatraOf(lon);
          const next = nextTransitionToday(transitions[g] ?? [], date);
          const rasiText = `${fmtDeg(deg)}° ${signs[sign]}`;
          const nakText = `${naks[nak.index]} · ${nak.pada}`;
          return (
            <li key={g}>
              <div className="row" title={view === "rasi" ? nakText : rasiText}>
                <span className="g" style={{ color: GRAHA_COLOR[g] }}>{label[g]}</span>
                {view === "rasi" ? (
                  <>
                    <span className="d">{fmtDeg(deg)}°</span>
                    <span className="s">{signs[sign]}</span>
                  </>
                ) : (
                  <>
                    <span className="d nk">{naks[nak.index]}</span>
                    <span className="s">· {nak.pada}</span>
                  </>
                )}
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
