import json
from datetime import datetime, timezone
from pathlib import Path
from .ephemeris import PLANETS, iso
from .transitions import planet_transitions

WINDOW_START = datetime(2015, 1, 1, tzinfo=timezone.utc)
WINDOW_END = datetime(2040, 1, 1, tzinfo=timezone.utc)


def build(start: datetime, end: datetime) -> dict:
    return {
        "ayanamsa": "lahiri",
        "range": {"start": iso(start), "end": iso(end)},
        "planets": {name: planet_transitions(name, start, end) for name in PLANETS},
    }


def main() -> None:
    doc = build(WINDOW_START, WINDOW_END)
    # generator/src/jyotish_gen/build.py -> repo root is parents[3]
    out = (
        Path(__file__).resolve().parents[3]
        / "web"
        / "public"
        / "data"
        / "transitions.json"
    )
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(doc, separators=(",", ":")))
    print(f"wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
