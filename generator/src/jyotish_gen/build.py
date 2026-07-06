import json
from datetime import datetime, timezone
from pathlib import Path
from .degrees import build_degrees
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
    # generator/src/jyotish_gen/build.py -> repo root is parents[3]
    data_dir = Path(__file__).resolve().parents[3] / "web" / "public" / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    docs = {
        "transitions.json": build(WINDOW_START, WINDOW_END),
        "degrees.json": build_degrees(WINDOW_START, WINDOW_END),
    }
    for name, doc in docs.items():
        out = data_dir / name
        out.write_text(json.dumps(doc, separators=(",", ":")))
        print(f"wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
