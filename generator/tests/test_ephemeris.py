from datetime import datetime, timezone
from jyotish_gen.ephemeris import PLANETS, to_jd, longitude, sign_of


def test_all_nine_grahas_present():
    assert set(PLANETS) == {
        "sun",
        "moon",
        "mars",
        "mercury",
        "jupiter",
        "venus",
        "saturn",
        "rahu",
        "ketu",
    }


def test_ketu_is_opposite_rahu():
    jd = to_jd(datetime(2025, 6, 1, tzinfo=timezone.utc))
    diff = (longitude(jd, "ketu") - longitude(jd, "rahu")) % 360
    assert abs(diff - 180) < 1e-6


def test_known_saturn_sign_mid_2025():
    # Saturn is in Pisces (sign 11) in mid-2025 (Lahiri sidereal).
    jd = to_jd(datetime(2025, 6, 1, tzinfo=timezone.utc))
    assert sign_of(jd, "saturn") == 11


def test_sign_in_range():
    jd = to_jd(datetime(2030, 1, 1, tzinfo=timezone.utc))
    for p in PLANETS:
        assert 0 <= sign_of(jd, p) <= 11
