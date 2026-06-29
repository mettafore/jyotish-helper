from datetime import datetime
import swisseph as swe

# Swiss Ephemeris body ids; Rahu = mean lunar node, Ketu = node + 180 degrees.
PLANETS: dict[str, int] = {
    "sun": swe.SUN, "moon": swe.MOON, "mars": swe.MARS,
    "mercury": swe.MERCURY, "jupiter": swe.JUPITER, "venus": swe.VENUS,
    "saturn": swe.SATURN, "rahu": swe.MEAN_NODE, "ketu": swe.MEAN_NODE,
}

_FLAGS = swe.FLG_SIDEREAL | swe.FLG_MOSEPH
_sid_set = False


def _ensure_lahiri() -> None:
    global _sid_set
    if not _sid_set:
        swe.set_sid_mode(swe.SIDM_LAHIRI, 0, 0)
        _sid_set = True


def to_jd(dt: datetime) -> float:
    # dt must be timezone-aware UTC.
    u = dt.utctimetuple()
    hour = u.tm_hour + u.tm_min / 60 + u.tm_sec / 3600
    return swe.julday(u.tm_year, u.tm_mon, u.tm_mday, hour, swe.GREG_CAL)


def longitude(jd: float, planet: str) -> float:
    _ensure_lahiri()
    lon = swe.calc_ut(jd, PLANETS[planet], _FLAGS)[0][0]
    if planet == "ketu":
        lon = (lon + 180) % 360
    return lon % 360


def sign_of(jd: float, planet: str) -> int:
    return int(longitude(jd, planet) // 30)
