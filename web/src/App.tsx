import { useEffect, useMemo, useState } from "react";
import { NorthIndianChart } from "./components/NorthIndianChart";
import { LagnaSelect } from "./components/LagnaSelect";
import { PlanetFilter } from "./components/PlanetFilter";
import { TimeSlider } from "./components/TimeSlider";
import { signAt, transitionsInRange, type TransitData } from "./lib/transits";

const GRAHAS = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];
const YEAR_MS = 365 * 864e5;

export default function App() {
  const [data, setData] = useState<TransitData | null>(null);
  const [value, setValue] = useState<Date>(new Date());
  const [house1Sign, setHouse1Sign] = useState(0);
  const [script, setScript] = useState<"western" | "devanagari">("western");
  const [rangeYears, setRangeYears] = useState<1 | 5 | 10>(1);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(GRAHAS.map((g) => [g, g !== "moon"])), // Moon off by default
  );

  useEffect(() => {
    fetch("/data/transitions.json").then((r) => r.json()).then(setData);
  }, []);

  const winStart = useMemo(() => new Date(data?.range.start ?? 0), [data]);
  const winEnd = useMemo(() => new Date(data?.range.end ?? 0), [data]);

  const positions = useMemo(() => {
    if (!data) return {};
    return Object.fromEntries(GRAHAS.map((g) => [g, signAt(data.planets[g], value)]));
  }, [data, value]);

  const rangeStart = useMemo(
    () => new Date(Math.max(value.getTime() - rangeYears * YEAR_MS, winStart.getTime())),
    [value, rangeYears, winStart]);
  const rangeEnd = useMemo(
    () => new Date(Math.min(value.getTime() + rangeYears * YEAR_MS, winEnd.getTime())),
    [value, rangeYears, winEnd]);

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
          <div className="seg">
            <button className={script === "western" ? "on" : ""}
                    onClick={() => setScript("western")}>Western</button>
            <button className={script === "devanagari" ? "on" : ""}
                    onClick={() => setScript("devanagari")}>देवनागरी</button>
          </div>
        </header>

        <div className="grid2">
          <div className="chartwrap">
            <NorthIndianChart positions={positions} house1Sign={house1Sign} />
          </div>
          <div className="panel">
            <div className="field">
              <label>House 1 sign (Lagna)</label>
              <LagnaSelect value={house1Sign} onChange={setHouse1Sign} script={script} />
            </div>
            <div className="field">
              <label>Transition planets</label>
              <PlanetFilter enabled={enabled}
                onToggle={(p) => setEnabled((e) => ({ ...e, [p]: !e[p] }))} />
            </div>
            <div className="readout">
              <div className="lbl">Viewing</div>
              <div className="val">{value.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="timebar">
          <div className="timehead">
            <span className="ttl">Timeline</span>
            <div className="range-seg">
              {([1, 5, 10] as const).map((y) => (
                <button key={y} type="button" className={rangeYears === y ? "on" : ""}
                        onClick={() => setRangeYears(y)}>±{y}y</button>
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
