import { SIGN_WESTERN, SIGN_DEVANAGARI } from "../lib/signs";

export function LagnaSelect(
  { value, onChange, script }:
  { value: number; onChange: (s: number) => void; script: "western" | "devanagari" },
) {
  const names = script === "western" ? SIGN_WESTERN : SIGN_DEVANAGARI;
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {names.map((n, i) => (
        <option key={i} value={i}>{n}</option>
      ))}
    </select>
  );
}
