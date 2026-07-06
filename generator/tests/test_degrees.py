from datetime import datetime, timezone
from jyotish_gen.degrees import build_degrees, daily_longitudes
from jyotish_gen.ephemeris import PLANETS

START = datetime(2024, 1, 1, tzinfo=timezone.utc)
END = datetime(2026, 1, 1, tzinfo=timezone.utc)


def _delta(a: float, b: float) -> float:
    # Signed shortest angular step a -> b.
    return ((b - a + 540) % 360) - 180


def test_build_degrees_shape():
    doc = build_degrees(START, END)
    assert doc["ayanamsa"] == "lahiri"
    assert doc["start"] == "2024-01-01T00:00:00Z"
    assert doc["stepDays"] == 1
    assert set(doc["planets"]) == set(PLANETS)
    # 2024 is a leap year: 366 + 365 days, samples inclusive of both ends.
    assert all(len(v) == 732 for v in doc["planets"].values())


def test_longitudes_in_range_and_rounded():
    lons = daily_longitudes("sun", START, END)
    assert all(0 <= x < 360 for x in lons)
    assert all(round(x, 2) == x for x in lons)


def test_sun_advances_about_one_degree_per_day():
    lons = daily_longitudes("sun", START, END)
    steps = [_delta(a, b) for a, b in zip(lons, lons[1:])]
    assert all(0.9 < s < 1.1 for s in steps)


def test_sun_and_moon_never_retrograde():
    for planet in ("sun", "moon"):
        lons = daily_longitudes(planet, START, END)
        assert all(_delta(a, b) > 0 for a, b in zip(lons, lons[1:]))


def test_mars_retrograde_in_january_2025():
    # Mars was retrograde Dec 2024 - Feb 2025.
    lons = daily_longitudes("mars", START, END)
    i = (datetime(2025, 1, 15, tzinfo=timezone.utc) - START).days
    assert _delta(lons[i], lons[i + 1]) < 0


def test_ketu_opposes_rahu():
    rahu = daily_longitudes("rahu", START, END)
    ketu = daily_longitudes("ketu", START, END)
    assert all(abs(_delta((r + 180) % 360, k)) < 0.02 for r, k in zip(rahu, ketu))
