import { GRAHAS, GRAHA_COLOR, PLANET_WESTERN, PLANET_DEVANAGARI } from "../lib/signs";

export function PlanetFilter(
  { enabled, onToggle, script = "western" }:
  {
    enabled: Record<string, boolean>;
    onToggle: (planet: string) => void;
    script?: "western" | "devanagari";
  },
) {
  const label = script === "devanagari" ? PLANET_DEVANAGARI : PLANET_WESTERN;
  return (
    <div className="chips">
      {GRAHAS.map((p) => (
        <button key={p} className={`chip ${enabled[p] ? "on" : "off"}`}
                onClick={() => onToggle(p)} type="button"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: GRAHA_COLOR[p],
            display: "inline-block",
          }} />
          {label[p]}
        </button>
      ))}
    </div>
  );
}
