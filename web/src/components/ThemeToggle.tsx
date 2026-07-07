import type { ThemePref } from "../lib/theme";

const OPTS: { value: ThemePref; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

export function ThemeToggle(
  { pref, onChange }: { pref: ThemePref; onChange: (p: ThemePref) => void },
) {
  return (
    <div className="seg" role="group" aria-label="Theme">
      {OPTS.map((o) => (
        <button
          key={o.value}
          className={pref === o.value ? "on" : ""}
          aria-pressed={pref === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
