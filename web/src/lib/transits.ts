export type Transition = { sign: number; enters: string };
export type TransitData = {
  ayanamsa: string;
  range: { start: string; end: string };
  planets: Record<string, Transition[]>;
};

// Sign active at time t = the entry with greatest `enters` <= t (binary search).
export function signAt(list: Transition[], t: Date): number {
  const ms = t.getTime();
  let lo = 0, hi = list.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (new Date(list[mid].enters).getTime() <= ms) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return list[ans].sign;
}

// The first entry after t, only if it falls on the viewer's local calendar
// day — used to preview "transitions later today", never as a substitute for
// signAt's causal current-state answer.
export function nextTransitionToday(list: Transition[], t: Date): Transition | undefined {
  const ms = t.getTime();
  let lo = 0, hi = list.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (new Date(list[mid].enters).getTime() > ms) hi = mid;
    else lo = mid + 1;
  }
  if (lo >= list.length) return undefined;
  const entry = list[lo];
  const entryDate = new Date(entry.enters);
  const sameLocalDay = t.getFullYear() === entryDate.getFullYear()
    && t.getMonth() === entryDate.getMonth()
    && t.getDate() === entryDate.getDate();
  return sameLocalDay ? entry : undefined;
}

export function transitionsInRange(
  data: TransitData,
  planets: string[],
  start: Date,
  end: Date,
): { planet: string; sign: number; at: Date }[] {
  const s = start.getTime(), e = end.getTime();
  const out: { planet: string; sign: number; at: Date }[] = [];
  for (const planet of planets) {
    const list = data.planets[planet] ?? [];
    for (let i = 1; i < list.length; i++) {
      // skip seed at index 0
      const at = new Date(list[i].enters);
      const ms = at.getTime();
      if (ms >= s && ms <= e) out.push({ planet, sign: list[i].sign, at });
    }
  }
  out.sort((a, b) => a.at.getTime() - b.at.getTime());
  return out;
}
