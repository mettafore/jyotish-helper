import { useEffect, useMemo, useState } from "react";
import { NorthIndianChart } from "./components/NorthIndianChart";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./lib/useTheme";
import { LagnaSelect } from "./components/LagnaSelect";
import { PlanetFilter } from "./components/PlanetFilter";
import { TimeSlider } from "./components/TimeSlider";
import { GrahaDegrees } from "./components/GrahaDegrees";
import { signAt, transitionsInRange, type TransitData } from "./lib/transits";
import {
  isRetrograde, isCombust, COMBUST_ORB_DEFAULT, COMBUST_ORB_MERCURY, type DegreesData,
} from "./lib/degrees";
import { fmtDateTime } from "./lib/format";
import { GRAHAS } from "./lib/signs";

const MONTH_MS = 2629800000; // ~30.44 days
const RANGES: { months: number; label: string }[] = [
  { months: 3, label: "3M" },
  { months: 6, label: "6M" },
  { months: 12, label: "1Y" },
  { months: 60, label: "5Y" },
  { months: 120, label: "10Y" },
];

export default function App() {
  const [data, setData] = useState<TransitData | null>(null);
  const [value, setValue] = useState<Date>(new Date());
  const [house1Sign, setHouse1Sign] = useState(0);
  const [script, setScript] = useState<"western" | "devanagari">("western");
  const { pref: themePref, setPref: setThemePref } = useTheme();
  const [rangeMonths, setRangeMonths] = useState(3);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(GRAHAS.map((g) => [g, g !== "moon"])), // Moon off by default
  );

  const [degrees, setDegrees] = useState<DegreesData | null>(null);

  useEffect(() => {
    fetch("/data/transitions.json").then((r) => r.json()).then(setData);
    fetch("/data/degrees.json").then((r) => r.json()).then(setDegrees)
      .catch(() => {}); // degrees panel is optional; chart works without it
  }, []);

  const winStart = useMemo(() => new Date(data?.range.start ?? 0), [data]);
  const winEnd = useMemo(() => new Date(data?.range.end ?? 0), [data]);

  const positions = useMemo(() => {
    if (!data) return {};
    return Object.fromEntries(GRAHAS.map((g) => [g, signAt(data.planets[g], value)]));
  }, [data, value]);

  const rangeStart = useMemo(
    () => new Date(Math.max(value.getTime() - rangeMonths * MONTH_MS, winStart.getTime())),
    [value, rangeMonths, winStart]);
  const rangeEnd = useMemo(
    () => new Date(Math.min(value.getTime() + rangeMonths * MONTH_MS, winEnd.getTime())),
    [value, rangeMonths, winEnd]);

  const retro = useMemo(() => {
    if (!degrees) return {};
    return Object.fromEntries(GRAHAS.map((g) => [g, isRetrograde(degrees, g, value)]));
  }, [degrees, value]);

  const combust = useMemo(() => {
    if (!degrees) return {};
    return Object.fromEntries(GRAHAS.map((g) => [g, isCombust(degrees, g, value)]));
  }, [degrees, value]);

  const events = useMemo(() => {
    if (!data) return [];
    const planets = GRAHAS.filter((g) => enabled[g]);
    return transitionsInRange(data, planets, rangeStart, rangeEnd);
  }, [data, enabled, rangeStart, rangeEnd]);

  if (!data) return <div className="app"><div className="card">Loading…</div></div>;

  return (
    <div className="app">
      <div className="card">
        <header>
          <div className="brand">
            <div className="om">ॐ</div>
            <div>
              <h1>Jyotish Helper</h1>
              <p>GOCHAR · TRANSIT CHART · LAHIRI</p>
            </div>
          </div>
          <div className="controls">
            <ThemeToggle pref={themePref} onChange={setThemePref} />
            <div className="seg">
              <button className={script === "western" ? "on" : ""}
                      onClick={() => setScript("western")}>Western</button>
              <button className={script === "devanagari" ? "on" : ""}
                      onClick={() => setScript("devanagari")}>देवनागरी</button>
            </div>
          </div>
        </header>

        <details className="howto">
          <summary>How this works</summary>
          <ul>
            <li>The <b>North Indian chart</b> shows which sign each graha sits in
              (Lahiri sidereal). Multiple grahas in one sign stack together.</li>
            <li>Pick <b>House 1 sign (Lagna)</b> to rotate the houses over a
              client's natal ascendant. Toggle <b>Western / देवनागरी</b> for sign names.</li>
            <li>Drag the <b>time slider</b> to scrub the chart to any date. Dots mark
              upcoming sign transitions — click one to jump to it. <b>Now</b> marks today.</li>
            <li>Use <b>Transition planets</b> to choose which grahas show dots, and the
              <b>±range</b> buttons to widen the window (Moon is off by default).</li>
            <li>The degrees panel's <b>Rāśi ° / Nakshatra</b> toggle switches each
              graha's line between degree-in-sign and nakshatra · pada; hover a
              line to peek at the other view.</li>
            <li><b>⬆</b> exalted · <b>⬇</b> debilitated · <b>🌀</b> retrograde ·
              <b>🔥</b> combust — within {COMBUST_ORB_DEFAULT}° of the Sun
              (Mercury {COMBUST_ORB_MERCURY}°), based on daily positions.</li>
            <li>A <b>→ time · sign</b> line under a graha's degree means it changes
              sign later that same day — the time and sign it moves into.</li>
          </ul>
        </details>

        <div className="grid2">
          <div className="chartwrap">
            <NorthIndianChart positions={positions} house1Sign={house1Sign}
                              script={script} retro={retro} combust={combust} />
          </div>
          <div className="panel">
            <div className="field">
              <label>House 1 sign (Lagna)</label>
              <LagnaSelect value={house1Sign} onChange={setHouse1Sign} script={script} />
            </div>
            <div className="field">
              <label>Transition planets</label>
              <PlanetFilter enabled={enabled} script={script}
                onToggle={(p) => setEnabled((e) => ({ ...e, [p]: !e[p] }))} />
            </div>
            <div className="readout">
              <div className="lbl">Viewing</div>
              <div className="val">{fmtDateTime(value)}</div>
            </div>
            {degrees && (
              <div className="field">
                {/* Daily 00:00 UTC samples — date-granular, so no time shown.
                    Label + Rāśi/Nakshatra view toggle render inside the panel. */}
                <GrahaDegrees data={degrees} transitions={data.planets} date={value}
                              script={script} />
              </div>
            )}
          </div>
        </div>

        <div className="timebar">
          <div className="timehead">
            <button type="button" className="today-btn"
                    onClick={() => setValue(new Date())}>Today</button>
            <div className="range-seg">
              {RANGES.map((r) => (
                <button key={r.months} type="button"
                        className={rangeMonths === r.months ? "on" : ""}
                        onClick={() => setRangeMonths(r.months)}>±{r.label}</button>
              ))}
            </div>
          </div>
          <TimeSlider start={rangeStart} end={rangeEnd} value={value}
                      onChange={setValue} events={events} />
        </div>
      </div>
    </div>
  );
}
