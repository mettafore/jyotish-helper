from datetime import datetime, timezone
from jyotish_gen.ephemeris import to_jd, sign_of
from jyotish_gen.transitions import planet_transitions

START = datetime(2024, 1, 1, tzinfo=timezone.utc)
END = datetime(2027, 1, 1, tzinfo=timezone.utc)


def _parse(z: str) -> datetime:
    return datetime.fromisoformat(z.replace("Z", "+00:00"))


def test_first_entry_is_sign_active_at_start():
    tr = planet_transitions("saturn", START, END)
    assert tr[0]["sign"] == sign_of(to_jd(START), "saturn")
    assert _parse(tr[0]["enters"]) <= START


def test_entries_are_time_ordered():
    tr = planet_transitions("jupiter", START, END)
    times = [_parse(t["enters"]) for t in tr]
    assert times == sorted(times)


def test_each_boundary_is_a_real_sign_change():
    # At each recorded ingress (after the seed), the sign just after differs
    # from the sign just before.
    tr = planet_transitions("mars", START, END)
    for t in tr[1:]:
        jd = to_jd(_parse(t["enters"]))
        before = sign_of(jd - 1.0, "mars")  # 1 day earlier
        assert t["sign"] != before
        assert sign_of(jd + 0.01, "mars") == t["sign"]


def test_saturn_pisces_ingress_2025():
    # Saturn enters Pisces (sign 11) on 2025-03-29 (UTC), within ~1 day.
    tr = planet_transitions("saturn", START, END)
    ingress = [t for t in tr if t["sign"] == 11 and _parse(t["enters"]) > START]
    assert ingress, "expected a Saturn->Pisces ingress in 2024-2027"
    d = _parse(ingress[0]["enters"])
    assert (d.year, d.month) == (2025, 3)
