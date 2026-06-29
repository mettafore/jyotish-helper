// Date formatting for the UI. dd-mm-yy, browser-local time.
const p2 = (n: number) => String(n).padStart(2, "0");

export function fmtDate(d: Date): string {
  return `${p2(d.getDate())}-${p2(d.getMonth() + 1)}-${String(d.getFullYear()).slice(-2)}`;
}

export function fmtDateTime(d: Date): string {
  return `${fmtDate(d)} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
}
