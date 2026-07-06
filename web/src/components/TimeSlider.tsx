import { fmtDate } from "../lib/format";
import { GRAHA_COLOR } from "../lib/signs";

export function pct(t: Date, start: Date, end: Date): number {
  return ((t.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
}

export function TimeSlider(
  { start, end, value, onChange, events }:
  {
    start: Date; end: Date; value: Date;
    onChange: (d: Date) => void;
    events: { planet: string; sign: number; at: Date }[];
  },
) {
  const span = end.getTime() - start.getTime();
  const now = new Date();
  const nowIn = now >= start && now <= end;
  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(new Date(start.getTime() + (Number(e.target.value) / 1000) * span));

  return (
    <div className="track">
      <input type="range" min={0} max={1000} step={1}
             value={Math.round((pct(value, start, end) / 100) * 1000)}
             onChange={onScrub} aria-label="scrub time" />
      {events.map((ev, i) => (
        <button key={i} type="button"
          aria-label={`${ev.planet} transition`}
          data-tip={`${ev.planet[0].toUpperCase()}${ev.planet.slice(1)} → sign ${ev.sign + 1} · ${fmtDate(ev.at)}`}
          onClick={() => onChange(ev.at)}
          className="tdot"
          style={{
            position: "absolute", left: `${pct(ev.at, start, end)}%`,
            borderColor: GRAHA_COLOR[ev.planet],
          }} />
      ))}
      {nowIn && (
        <button type="button" className="now" aria-label="jump to now"
          title="Jump to now" onClick={() => onChange(new Date())}
          style={{ position: "absolute", left: `${pct(now, start, end)}%` }} />
      )}
    </div>
  );
}
