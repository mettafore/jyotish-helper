from datetime import datetime, timedelta, timezone
from typing import TypedDict
from .ephemeris import to_jd, sign_of


class Transition(TypedDict):
    sign: int
    enters: str


# Margin before `start` long enough to find the ingress of the sign active at
# start. Saturn (slowest) spends ~2.5y in a sign -> ~912 days; 1100 is safe.
_MARGIN = timedelta(days=1100)


def _iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _refine(planet: str, lo: datetime, hi: datetime, target: int) -> datetime:
    # Binary-search the instant the sign becomes `target`, to ~1 minute.
    while (hi - lo) > timedelta(minutes=1):
        mid = lo + (hi - lo) / 2
        if sign_of(to_jd(mid), planet) == target:
            hi = mid
        else:
            lo = mid
    return hi


def planet_transitions(
    planet: str, start: datetime, end: datetime, step_hours: float = 6.0
) -> list[Transition]:
    step = timedelta(hours=step_hours)
    t = start - _MARGIN
    prev_sign = sign_of(to_jd(t), planet)
    # Seed: the ingress of whatever sign is active at the margin start.
    out: list[Transition] = [{"sign": prev_sign, "enters": _iso(t)}]
    while t < end:
        nxt = min(t + step, end)
        s = sign_of(to_jd(nxt), planet)
        if s != prev_sign:
            boundary = _refine(planet, t, nxt, s)
            out.append({"sign": s, "enters": _iso(boundary)})
            prev_sign = s
        t = nxt
    # Drop seed/changes fully before `start`, but keep the last one <= start
    # as the active-sign seed (re-stamped to its real ingress date).
    kept: list[Transition] = []
    seed = out[0]
    for tr in out:
        if datetime.fromisoformat(tr["enters"].replace("Z", "+00:00")) <= start:
            seed = tr
        else:
            kept.append(tr)
    return [seed] + kept
