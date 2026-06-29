from datetime import datetime, timezone
from jyotish_gen.build import build
from jyotish_gen.ephemeris import PLANETS


def test_build_shape_small_window():
    start = datetime(2024, 1, 1, tzinfo=timezone.utc)
    end = datetime(2025, 1, 1, tzinfo=timezone.utc)
    doc = build(start, end)
    assert doc["ayanamsa"] == "lahiri"
    assert doc["range"]["start"] == "2024-01-01T00:00:00Z"
    assert set(doc["planets"]) == set(PLANETS)
    # Every planet has at least the seed entry, ordered, signs in range.
    for name, lst in doc["planets"].items():
        assert lst, name
        assert all(0 <= e["sign"] <= 11 for e in lst)


def test_moon_has_many_more_transitions_than_saturn():
    start = datetime(2024, 1, 1, tzinfo=timezone.utc)
    end = datetime(2025, 1, 1, tzinfo=timezone.utc)
    doc = build(start, end)
    assert len(doc["planets"]["moon"]) > 10 * len(doc["planets"]["saturn"])
