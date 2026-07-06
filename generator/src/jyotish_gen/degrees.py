"""Daily sidereal longitudes for every graha.

One sample per day at 00:00 UTC, both window ends inclusive. The frontend
reads values at date granularity only (no interpolation, no time of day) —
see issues #3/#6.
"""

from datetime import datetime
from .ephemeris import PLANETS, iso, longitude, to_jd


def daily_longitudes(planet: str, start: datetime, end: datetime) -> list[float]:
    days = (end - start).days
    jd0 = to_jd(start)
    return [round(longitude(jd0 + d, planet), 2) for d in range(days + 1)]


def build_degrees(start: datetime, end: datetime) -> dict:
    return {
        "ayanamsa": "lahiri",
        "start": iso(start),
        "stepDays": 1,
        "planets": {name: daily_longitudes(name, start, end) for name in PLANETS},
    }
