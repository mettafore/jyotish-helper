import { GRAHAS, GRAHA_COLOR } from "../lib/signs";

const LABEL: Record<string, string> = {
  sun: "Sun", moon: "Moon", mars: "Mars", mercury: "Merc", jupiter: "Jup",
  venus: "Ven", saturn: "Sat", rahu: "Rahu", ketu: "Ketu",
};

export function PlanetFilter(
  { enabled, onToggle }:
  { enabled: Record<string, boolean>; onToggle: (planet: string) => void },
) {
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
          {LABEL[p]}
        </button>
      ))}
    </div>
  );
}
