# Transit Chart Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the v1 transit (gochar) chart — a North Indian diamond showing which sign each of the 9 grahas occupies, scrubbable over 2015–2040, fed by a precomputed static JSON.

**Architecture:** Two isolated parts. (A) An offline Python generator (uv + pyswisseph, Moshier mode) computes sign-transition timestamps and writes `web/public/data/transitions.json`. (B) A static Vite + React + TS frontend loads that JSON and does binary-search lookup at runtime — zero astronomy in the browser.

**Tech Stack:** Python 3.11+, pyswisseph, uv (generator). Vite, React, TypeScript, Tailwind, shadcn/ui, Vitest (frontend).

## Global Constraints

- Ayanamsa: **Lahiri** (`swe.SIDM_LAHIRI`). Ephemeris: **Moshier** (`swe.FLG_MOSEPH`) — no `.se1` files.
- Data window: **fixed absolute 2015-01-01 → 2040-01-01 UTC**.
- 9 grahas only: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu (mean node), Ketu (node + 180°).
- `sign`: integer **0–11** (0 = Aries/Mesha … 11 = Pisces/Meena).
- Timestamps stored **UTC ISO-8601**; frontend displays **browser local time**.
- **No exact degrees** anywhere in v1. Chart shows sign/house occupancy only.
- **No backend, no DB.** JSON is committed at `web/public/data/transitions.json`.
- Generator deps via **uv** (`generator/pyproject.toml` + `uv.lock`, `uv run`). No pip/requirements.txt.
- UI follows the **`jyotish-design-standards`** skill (Saffron Gold; tokens in `.agents/skills/jyotish-design-standards/tokens.css`).

---

# Phase A — Generator (Python / uv)

### Task 1: Scaffold the generator package

**Files:**
- Create: `generator/pyproject.toml`
- Create: `generator/src/jyotish_gen/__init__.py`
- Create: `generator/tests/test_smoke.py`

**Interfaces:**
- Consumes: nothing.
- Produces: importable package `jyotish_gen`; `uv run pytest` works from `generator/`.

- [ ] **Step 1: Write `generator/pyproject.toml`**

```toml
[project]
name = "jyotish-gen"
version = "0.1.0"
description = "Offline Swiss Ephemeris transition generator for Jyotish Helper"
requires-python = ">=3.11"
dependencies = ["pyswisseph>=2.10"]

[dependency-groups]
dev = ["pytest>=8"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[tool.hatch.build.targets.wheel]
packages = ["src/jyotish_gen"]
```

- [ ] **Step 2: Create the package + a smoke test**

`generator/src/jyotish_gen/__init__.py`:
```python
__all__ = []
```

`generator/tests/test_smoke.py`:
```python
def test_import():
    import jyotish_gen  # noqa: F401
```

- [ ] **Step 3: Sync and run the smoke test (verify it passes)**

Run (from `generator/`): `uv sync && uv run pytest -q`
Expected: 1 passed. Also confirms `pyswisseph` installs and `uv.lock` is created.

- [ ] **Step 4: Commit**

```bash
git add generator/ && git commit -m "feat(generator): scaffold uv package with pyswisseph"
```

---

### Task 2: Ephemeris wrapper — sidereal sign of a graha

**Files:**
- Create: `generator/src/jyotish_gen/ephemeris.py`
- Test: `generator/tests/test_ephemeris.py`

**Interfaces:**
- Consumes: `swisseph` (imported as `swe`).
- Produces:
  - `PLANETS: dict[str, int]` — graha name → internal id. Keys exactly:
    `"sun","moon","mars","mercury","jupiter","venus","saturn","rahu","ketu"`.
  - `to_jd(dt: datetime) -> float` — UTC datetime → Julian Day (UT).
  - `longitude(jd: float, planet: str) -> float` — sidereal (Lahiri/Moshier) ecliptic longitude in degrees `[0,360)`.
  - `sign_of(jd: float, planet: str) -> int` — `int(longitude // 30)`, range 0–11.

- [ ] **Step 1: Write the failing test**

`generator/tests/test_ephemeris.py`:
```python
from datetime import datetime, timezone
from jyotish_gen.ephemeris import PLANETS, to_jd, longitude, sign_of

def test_all_nine_grahas_present():
    assert set(PLANETS) == {
        "sun","moon","mars","mercury","jupiter","venus","saturn","rahu","ketu"
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `uv run pytest tests/test_ephemeris.py -q`
Expected: FAIL — `ModuleNotFoundError`/`ImportError` (ephemeris.py not written).

- [ ] **Step 3: Write the implementation**

`generator/src/jyotish_gen/ephemeris.py`:
```python
from datetime import datetime
import swisseph as swe

# Swiss Ephemeris body ids; Rahu = mean lunar node, Ketu = node + 180°.
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `uv run pytest tests/test_ephemeris.py -q`
Expected: 4 passed. (If `test_known_saturn_sign_mid_2025` fails, re-check the sid-mode call — do not change the assertion; Saturn is in Pisces mid-2025.)

- [ ] **Step 5: Commit**

```bash
git add generator/ && git commit -m "feat(generator): Lahiri sidereal sign_of via Moshier"
```

---

### Task 3: Transition detector for one graha

**Files:**
- Create: `generator/src/jyotish_gen/transitions.py`
- Test: `generator/tests/test_transitions.py`

**Interfaces:**
- Consumes: `to_jd`, `sign_of`, `PLANETS` from `ephemeris`.
- Produces:
  - `Transition = TypedDict("Transition", {"sign": int, "enters": str})` — `enters` is UTC ISO-8601 `...Z`.
  - `planet_transitions(planet: str, start: datetime, end: datetime, step_hours: float = 6.0) -> list[Transition]`
    — ordered list. First element is the sign active at `start` (its `enters` is the real ingress, found by scanning a margin before `start`). Subsequent elements are each sign-change at/after `start` and before `end`. Retrograde re-entry yields repeated signs as separate entries.

- [ ] **Step 1: Write the failing test**

`generator/tests/test_transitions.py`:
```python
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `uv run pytest tests/test_transitions.py -q`
Expected: FAIL — `ImportError` (transitions.py not written).

- [ ] **Step 3: Write the implementation**

`generator/src/jyotish_gen/transitions.py`:
```python
from datetime import datetime, timedelta, timezone
from typing import TypedDict
from .ephemeris import to_jd, sign_of

class Transition(TypedDict):
    sign: int
    enters: str

# Margin before `start` long enough to find the ingress of the sign active at
# start. Saturn (slowest) spends ~2.5y in a sign → ~912 days; 1100 is safe.
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run pytest tests/test_transitions.py -q`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add generator/ && git commit -m "feat(generator): per-graha sign-transition detector with refine"
```

---

### Task 4: Build the full `transitions.json`

**Files:**
- Create: `generator/src/jyotish_gen/build.py`
- Test: `generator/tests/test_build.py`

**Interfaces:**
- Consumes: `PLANETS`, `planet_transitions`.
- Produces:
  - `build(start: datetime, end: datetime) -> dict` — the full document `{"ayanamsa","range","planets"}`.
  - `main()` — CLI: builds for the 2015–2040 window and writes `web/public/data/transitions.json` (path relative to repo root).

- [ ] **Step 1: Write the failing test**

`generator/tests/test_build.py`:
```python
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `uv run pytest tests/test_build.py -q`
Expected: FAIL — `ImportError` (build.py not written).

- [ ] **Step 3: Write the implementation**

`generator/src/jyotish_gen/build.py`:
```python
import json
from datetime import datetime, timezone
from pathlib import Path
from .ephemeris import PLANETS
from .transitions import planet_transitions

WINDOW_START = datetime(2015, 1, 1, tzinfo=timezone.utc)
WINDOW_END = datetime(2040, 1, 1, tzinfo=timezone.utc)

def _iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def build(start: datetime, end: datetime) -> dict:
    return {
        "ayanamsa": "lahiri",
        "range": {"start": _iso(start), "end": _iso(end)},
        "planets": {name: planet_transitions(name, start, end) for name in PLANETS},
    }

def main() -> None:
    doc = build(WINDOW_START, WINDOW_END)
    # generator/src/jyotish_gen/build.py -> repo root is parents[3]
    out = Path(__file__).resolve().parents[3] / "web" / "public" / "data" / "transitions.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(doc, separators=(",", ":")))
    print(f"wrote {out} ({out.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `uv run pytest tests/test_build.py -q`
Expected: 2 passed.

- [ ] **Step 5: Generate the real data file**

Run (from `generator/`): `uv run python -m jyotish_gen.build`
Expected: prints `wrote .../web/public/data/transitions.json (<N> bytes)`. Confirm the file exists and is valid JSON: `uv run python -c "import json,pathlib;json.loads(pathlib.Path('../web/public/data/transitions.json').read_text());print('ok')"`

- [ ] **Step 6: Commit**

```bash
git add generator/ web/public/data/transitions.json
git commit -m "feat(generator): build full 2015-2040 transitions.json"
```

> **PHASE A CHECKPOINT** — stop here for user review before starting the frontend.

---

# Phase B — Frontend (Vite / React / TS)

### Task 5: Scaffold the web app

**Files:**
- Create: `web/` (Vite React-TS), `web/package.json`, `web/vite.config.ts`, `web/vitest.config.ts`
- Create: `web/src/styles/tokens.css` (copied from the design skill)
- Modify: `web/src/main.tsx`, `web/index.html`

**Interfaces:**
- Consumes: `web/public/data/transitions.json` (already generated).
- Produces: `npm run dev`, `npm run build`, `npm run test` all work.

- [ ] **Step 1: Scaffold Vite + Vitest + Tailwind**

Run (from repo root):
```bash
npm create vite@latest web -- --template react-ts
cd web && npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
```

- [ ] **Step 2: Add the Vitest config + test script**

`web/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/setupTests.ts"] },
});
```

`web/src/setupTests.ts`:
```ts
import "@testing-library/jest-dom";
```

Add to `web/package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 3: Copy design tokens**

Copy `.agents/skills/jyotish-design-standards/tokens.css` → `web/src/styles/tokens.css`, and `import "./styles/tokens.css";` at the top of `web/src/main.tsx`. Configure Tailwind `content: ["./index.html","./src/**/*.{ts,tsx}"]` and add the three Google Fonts (`Inter`, `Cormorant Garamond`, `Sora`, `Noto Sans Devanagari`) via `<link>` in `web/index.html`.

- [ ] **Step 4: Verify dev + test run**

Run: `npm run test` → "No test files found" is acceptable here (exit 0 once a passing test exists in later tasks; for now confirm the command runs). Run `npm run build` → succeeds.

- [ ] **Step 5: Commit**

```bash
git add web/ && git commit -m "chore(web): scaffold Vite React-TS + Vitest + Tailwind + tokens"
```

---

### Task 6: Signs + house rotation logic

**Files:**
- Create: `web/src/lib/signs.ts`
- Test: `web/src/lib/signs.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `SIGN_WESTERN: string[]` and `SIGN_DEVANAGARI: string[]` — length 12, index 0 = Aries/मेष.
  - `houseOfSign(sign: number, house1Sign: number): number` — returns house **1–12** for a given `sign` (0–11) when `house1Sign` (0–11) sits in house 1. Formula: `((sign - house1Sign + 12) % 12) + 1`.

- [ ] **Step 1: Write the failing test**

`web/src/lib/signs.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { SIGN_WESTERN, SIGN_DEVANAGARI, houseOfSign } from "./signs";

describe("signs", () => {
  it("has 12 names in each script, Aries first", () => {
    expect(SIGN_WESTERN).toHaveLength(12);
    expect(SIGN_DEVANAGARI).toHaveLength(12);
    expect(SIGN_WESTERN[0]).toBe("Aries");
    expect(SIGN_DEVANAGARI[0]).toBe("मेष");
  });
  it("puts house1Sign in house 1", () => {
    expect(houseOfSign(0, 0)).toBe(1);   // Aries in house 1 (default)
    expect(houseOfSign(1, 0)).toBe(2);   // Taurus -> house 2
    expect(houseOfSign(1, 1)).toBe(1);   // Taurus lagna -> Taurus in house 1
    expect(houseOfSign(0, 1)).toBe(12);  // Aries -> house 12 when Taurus is lagna
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- signs` → FAIL (module not found).

- [ ] **Step 3: Write the implementation**

`web/src/lib/signs.ts`:
```ts
export const SIGN_WESTERN = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
];
export const SIGN_DEVANAGARI = [
  "मेष","वृष","मिथुन","कर्क","सिंह","कन्या",
  "तुला","वृश्चिक","धनु","मकर","कुम्भ","मीन",
];
export function houseOfSign(sign: number, house1Sign: number): number {
  return ((sign - house1Sign + 12) % 12) + 1;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- signs` → PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/signs.ts web/src/lib/signs.test.ts
git commit -m "feat(web): sign names + house rotation"
```

---

### Task 7: Transit lookup (load + binary search)

**Files:**
- Create: `web/src/lib/transits.ts`
- Test: `web/src/lib/transits.test.ts`

**Interfaces:**
- Consumes: the `transitions.json` shape.
- Produces:
  - `type Transition = { sign: number; enters: string }`
  - `type TransitData = { ayanamsa: string; range: { start: string; end: string }; planets: Record<string, Transition[]> }`
  - `signAt(list: Transition[], t: Date): number` — greatest `enters <= t` (binary search); if `t` precedes all, returns `list[0].sign`.
  - `transitionsInRange(data: TransitData, planets: string[], start: Date, end: Date): {planet:string; sign:number; at:Date}[]` — flat, time-sorted list of ingress events (skips each planet's seed entry) within `[start,end]` for the named planets.

- [ ] **Step 1: Write the failing test**

`web/src/lib/transits.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { signAt, transitionsInRange, type TransitData } from "./transits";

const data: TransitData = {
  ayanamsa: "lahiri",
  range: { start: "2024-01-01T00:00:00Z", end: "2025-01-01T00:00:00Z" },
  planets: {
    saturn: [
      { sign: 10, enters: "2023-01-17T00:00:00Z" },
      { sign: 11, enters: "2025-03-29T00:00:00Z" },
    ],
    mars: [
      { sign: 8, enters: "2023-12-01T00:00:00Z" },
      { sign: 9, enters: "2024-02-04T00:00:00Z" },
      { sign: 10, enters: "2024-03-15T00:00:00Z" },
    ],
  },
};

describe("signAt", () => {
  it("returns the sign active at t", () => {
    expect(signAt(data.planets.saturn, new Date("2024-06-01T00:00:00Z"))).toBe(10);
    expect(signAt(data.planets.mars, new Date("2024-02-20T00:00:00Z"))).toBe(9);
  });
  it("returns first sign when t precedes all entries", () => {
    expect(signAt(data.planets.mars, new Date("2020-01-01T00:00:00Z"))).toBe(8);
  });
});

describe("transitionsInRange", () => {
  it("returns sorted ingress events, skipping seeds, filtered by planet", () => {
    const out = transitionsInRange(
      data, ["mars"],
      new Date("2024-01-01T00:00:00Z"), new Date("2024-12-31T00:00:00Z"),
    );
    expect(out.map((e) => e.sign)).toEqual([9, 10]); // seed (8) skipped
    expect(out.every((e) => e.planet === "mars")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- transits` → FAIL (module not found).

- [ ] **Step 3: Write the implementation**

`web/src/lib/transits.ts`:
```ts
export type Transition = { sign: number; enters: string };
export type TransitData = {
  ayanamsa: string;
  range: { start: string; end: string };
  planets: Record<string, Transition[]>;
};

export function signAt(list: Transition[], t: Date): number {
  const ms = t.getTime();
  let lo = 0, hi = list.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (new Date(list[mid].enters).getTime() <= ms) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return list[ans].sign;
}

export function transitionsInRange(
  data: TransitData, planets: string[], start: Date, end: Date,
): { planet: string; sign: number; at: Date }[] {
  const s = start.getTime(), e = end.getTime();
  const out: { planet: string; sign: number; at: Date }[] = [];
  for (const planet of planets) {
    const list = data.planets[planet] ?? [];
    for (let i = 1; i < list.length; i++) { // skip seed at index 0
      const at = new Date(list[i].enters);
      const ms = at.getTime();
      if (ms >= s && ms <= e) out.push({ planet, sign: list[i].sign, at });
    }
  }
  out.sort((a, b) => a.at.getTime() - b.at.getTime());
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- transits` → PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/lib/transits.ts web/src/lib/transits.test.ts
git commit -m "feat(web): transit lookup with binary search"
```

---

### Task 8: North Indian chart component

**Files:**
- Create: `web/src/components/NorthIndianChart.tsx`
- Test: `web/src/components/NorthIndianChart.test.tsx`

**Interfaces:**
- Consumes: `houseOfSign` (signs.ts), graha colors from tokens.
- Produces: `NorthIndianChart({ positions, house1Sign }: { positions: Record<string, number>; house1Sign: number })` — renders an SVG diamond; places each graha glyph in the house cell matching its sign.

- [ ] **Step 1: Write the failing test**

`web/src/components/NorthIndianChart.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { NorthIndianChart } from "./NorthIndianChart";

describe("NorthIndianChart", () => {
  it("renders all provided grahas", () => {
    const { getByText } = render(
      <NorthIndianChart positions={{ sun: 2, saturn: 9 }} house1Sign={0} />,
    );
    expect(getByText("Su")).toBeInTheDocument();
    expect(getByText("Sa")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- NorthIndianChart` → FAIL (module not found).

- [ ] **Step 3: Write the implementation**

`web/src/components/NorthIndianChart.tsx` — fixed house centroids from the design skill; abbreviations and `--gr-*` colors per graha:
```tsx
import { houseOfSign } from "../lib/signs";

const ABBR: Record<string, string> = {
  sun:"Su",moon:"Mo",mars:"Ma",mercury:"Me",jupiter:"Ju",
  venus:"Ve",saturn:"Sa",rahu:"Ra",ketu:"Ke",
};
const COLOR: Record<string, string> = {
  sun:"var(--gr-su)",moon:"var(--gr-mo)",mars:"var(--gr-ma)",mercury:"var(--gr-me)",
  jupiter:"var(--gr-ju)",venus:"var(--gr-ve)",saturn:"var(--gr-sa)",
  rahu:"var(--gr-ra)",ketu:"var(--gr-ke)",
};
// House centroids (x,y) at viewBox 400 — from jyotish-design-standards.
const CENTROID: Record<number, [number, number]> = {
  1:[200,105],2:[118,40],3:[58,118],4:[100,206],5:[58,296],6:[118,366],
  7:[200,312],8:[284,366],9:[356,300],10:[304,206],11:[320,118],12:[284,40],
};

export function NorthIndianChart(
  { positions, house1Sign }: { positions: Record<string, number>; house1Sign: number },
) {
  // Group grahas by house so multiple in one cell stack horizontally.
  const byHouse: Record<number, string[]> = {};
  for (const [planet, sign] of Object.entries(positions)) {
    const h = houseOfSign(sign, house1Sign);
    (byHouse[h] ??= []).push(planet);
  }
  return (
    <svg className="chart" viewBox="0 0 400 400" style={{ width: "100%" }}>
      <rect x="2" y="2" width="396" height="396" rx="6" fill="rgba(255,252,244,.4)"
            stroke="var(--gold)" strokeWidth="1.5" />
      <line x1="2" y1="2" x2="398" y2="398" stroke="var(--gold)" strokeWidth="1.1" opacity=".7" />
      <line x1="398" y1="2" x2="2" y2="398" stroke="var(--gold)" strokeWidth="1.1" opacity=".7" />
      <polygon points="200,2 398,200 200,398 2,200" fill="none"
               stroke="var(--gold)" strokeWidth="1.1" opacity=".7" />
      {Object.entries(byHouse).map(([h, planets]) => {
        const [cx, cy] = CENTROID[Number(h)];
        return (
          <text key={h} x={cx} y={cy} textAnchor="middle"
                fontFamily="Sora, sans-serif" fontWeight={600} fontSize={15}>
            {planets.map((p, i) => (
              <tspan key={p} fill={COLOR[p]} dx={i ? 6 : 0}>{ABBR[p]}</tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- NorthIndianChart` → PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/NorthIndianChart.tsx web/src/components/NorthIndianChart.test.tsx
git commit -m "feat(web): North Indian chart component"
```

---

### Task 9: Lagna select + planet filter controls

**Files:**
- Create: `web/src/components/LagnaSelect.tsx`, `web/src/components/PlanetFilter.tsx`
- Test: `web/src/components/controls.test.tsx`

**Interfaces:**
- Consumes: `SIGN_WESTERN`, `SIGN_DEVANAGARI`.
- Produces:
  - `LagnaSelect({ value, onChange, script })` — `value`/`onChange` are sign index 0–11; `script` is `"western"|"devanagari"`.
  - `PlanetFilter({ enabled, onToggle })` — `enabled: Record<string,boolean>` over the 9 grahas; chips toggle a planet; Moon default off is owned by the parent's initial state, not here.

- [ ] **Step 1: Write the failing test**

`web/src/components/controls.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { LagnaSelect } from "./LagnaSelect";
import { PlanetFilter } from "./PlanetFilter";

describe("LagnaSelect", () => {
  it("calls onChange with the chosen sign index", () => {
    const onChange = vi.fn();
    const { getByRole } = render(<LagnaSelect value={0} onChange={onChange} script="western" />);
    fireEvent.change(getByRole("combobox"), { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
describe("PlanetFilter", () => {
  it("toggles a planet on click", () => {
    const onToggle = vi.fn();
    const enabled = { sun:true, moon:false, mars:true, mercury:true, jupiter:true,
      venus:true, saturn:true, rahu:true, ketu:true };
    const { getByText } = render(<PlanetFilter enabled={enabled} onToggle={onToggle} />);
    fireEvent.click(getByText(/sun/i));
    expect(onToggle).toHaveBeenCalledWith("sun");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- controls` → FAIL (modules not found).

- [ ] **Step 3: Write the implementations**

`web/src/components/LagnaSelect.tsx`:
```tsx
import { SIGN_WESTERN, SIGN_DEVANAGARI } from "../lib/signs";

export function LagnaSelect(
  { value, onChange, script }:
  { value: number; onChange: (s: number) => void; script: "western" | "devanagari" },
) {
  const names = script === "western" ? SIGN_WESTERN : SIGN_DEVANAGARI;
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {names.map((n, i) => <option key={i} value={i}>{n}</option>)}
    </select>
  );
}
```

`web/src/components/PlanetFilter.tsx`:
```tsx
const GRAHAS = ["sun","moon","mars","mercury","jupiter","venus","saturn","rahu","ketu"];
const LABEL: Record<string,string> = {
  sun:"Sun",moon:"Moon",mars:"Mars",mercury:"Merc",jupiter:"Jup",
  venus:"Ven",saturn:"Sat",rahu:"Rahu",ketu:"Ketu",
};

export function PlanetFilter(
  { enabled, onToggle }:
  { enabled: Record<string, boolean>; onToggle: (planet: string) => void },
) {
  return (
    <div className="chips">
      {GRAHAS.map((p) => (
        <button key={p} className={`chip ${enabled[p] ? "on" : "off"}`}
                onClick={() => onToggle(p)} type="button">
          {LABEL[p]}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- controls` → PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/LagnaSelect.tsx web/src/components/PlanetFilter.tsx web/src/components/controls.test.tsx
git commit -m "feat(web): Lagna select + planet filter"
```

---

### Task 10: Time slider with transition dots

**Files:**
- Create: `web/src/components/TimeSlider.tsx`
- Test: `web/src/components/TimeSlider.test.tsx`

**Interfaces:**
- Consumes: `transitionsInRange` output type.
- Produces:
  - `pct(t: Date, start: Date, end: Date): number` — exported pure helper, position 0–100.
  - `TimeSlider({ start, end, value, onChange, events })` — `value: Date`; `onChange(d: Date)` on scrub; `events: {planet:string; sign:number; at:Date}[]` rendered as clickable dots that call `onChange(at)`; renders a "Now" marker for `new Date()` when in range.

- [ ] **Step 1: Write the failing test**

`web/src/components/TimeSlider.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TimeSlider, pct } from "./TimeSlider";

const start = new Date("2025-01-01T00:00:00Z");
const end = new Date("2027-01-01T00:00:00Z");

describe("pct", () => {
  it("maps a date to 0..100 across the range", () => {
    expect(pct(start, start, end)).toBeCloseTo(0);
    expect(pct(end, start, end)).toBeCloseTo(100);
    expect(pct(new Date("2026-01-01T00:00:00Z"), start, end)).toBeCloseTo(50, 0);
  });
});

describe("TimeSlider", () => {
  it("jumps to a transition when its dot is clicked", () => {
    const onChange = vi.fn();
    const at = new Date("2026-03-29T00:00:00Z");
    const { getByLabelText } = render(
      <TimeSlider start={start} end={end} value={start} onChange={onChange}
        events={[{ planet: "saturn", sign: 11, at }]} />,
    );
    fireEvent.click(getByLabelText(/saturn.*transition/i));
    expect(onChange).toHaveBeenCalledWith(at);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- TimeSlider` → FAIL (module not found).

- [ ] **Step 3: Write the implementation**

`web/src/components/TimeSlider.tsx`:
```tsx
const GR_COLOR: Record<string,string> = {
  sun:"var(--gr-su)",moon:"var(--gr-mo)",mars:"var(--gr-ma)",mercury:"var(--gr-me)",
  jupiter:"var(--gr-ju)",venus:"var(--gr-ve)",saturn:"var(--gr-sa)",
  rahu:"var(--gr-ra)",ketu:"var(--gr-ke)",
};

export function pct(t: Date, start: Date, end: Date): number {
  return ((t.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
}

export function TimeSlider(
  { start, end, value, onChange, events }:
  { start: Date; end: Date; value: Date;
    onChange: (d: Date) => void;
    events: { planet: string; sign: number; at: Date }[] },
) {
  const span = end.getTime() - start.getTime();
  const now = new Date();
  const nowIn = now >= start && now <= end;
  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(new Date(start.getTime() + (Number(e.target.value) / 1000) * span));
  return (
    <div className="track" style={{ position: "relative" }}>
      <input type="range" min={0} max={1000} step={1}
             value={Math.round((pct(value, start, end) / 100) * 1000)}
             onChange={onScrub} aria-label="scrub time" style={{ width: "100%" }} />
      {events.map((ev, i) => (
        <button key={i} type="button"
          aria-label={`${ev.planet} transition`}
          onClick={() => onChange(ev.at)}
          className="tdot"
          style={{ position: "absolute", left: `${pct(ev.at, start, end)}%`,
                   borderColor: GR_COLOR[ev.planet] }} />
      ))}
      {nowIn && (
        <div className="now" style={{ position: "absolute", left: `${pct(now, start, end)}%` }} />
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- TimeSlider` → PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/components/TimeSlider.tsx web/src/components/TimeSlider.test.tsx
git commit -m "feat(web): time slider with transition dots"
```

---

### Task 11: Wire the app together

**Files:**
- Modify: `web/src/App.tsx`, `web/src/App.css` (or a new `web/src/styles/app.css`)
- Test: `web/src/App.test.tsx`

**Interfaces:**
- Consumes: all of the above + `fetch("/data/transitions.json")`.
- Produces: a working app — loads data, shows the chart for the current `value` Date, controls update state.

- [ ] **Step 1: Write the failing test**

`web/src/App.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const fake = {
  ayanamsa: "lahiri",
  range: { start: "2015-01-01T00:00:00Z", end: "2040-01-01T00:00:00Z" },
  planets: {
    sun:[{sign:8,enters:"2014-12-16T00:00:00Z"}],
    moon:[{sign:0,enters:"2014-12-31T00:00:00Z"}],
    mars:[{sign:9,enters:"2014-11-01T00:00:00Z"}],
    mercury:[{sign:8,enters:"2014-12-01T00:00:00Z"}],
    jupiter:[{sign:3,enters:"2014-07-01T00:00:00Z"}],
    venus:[{sign:9,enters:"2014-12-20T00:00:00Z"}],
    saturn:[{sign:7,enters:"2014-11-02T00:00:00Z"}],
    rahu:[{sign:5,enters:"2014-07-01T00:00:00Z"}],
    ketu:[{sign:11,enters:"2014-07-01T00:00:00Z"}],
  },
};

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => fake })));
});

describe("App", () => {
  it("loads data and renders the chart with grahas", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Ju")).toBeInTheDocument());
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- App` → FAIL (App not wired to data yet).

- [ ] **Step 3: Write the implementation**

`web/src/App.tsx`:
```tsx
import { useEffect, useMemo, useState } from "react";
import { NorthIndianChart } from "./components/NorthIndianChart";
import { LagnaSelect } from "./components/LagnaSelect";
import { PlanetFilter } from "./components/PlanetFilter";
import { TimeSlider } from "./components/TimeSlider";
import { signAt, transitionsInRange, type TransitData } from "./lib/transits";

const GRAHAS = ["sun","moon","mars","mercury","jupiter","venus","saturn","rahu","ketu"];

export default function App() {
  const [data, setData] = useState<TransitData | null>(null);
  const [value, setValue] = useState<Date>(new Date());
  const [house1Sign, setHouse1Sign] = useState(0);
  const [script, setScript] = useState<"western" | "devanagari">("western");
  const [rangeYears, setRangeYears] = useState<1 | 5 | 10>(1); // ±years around value
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(GRAHAS.map((g) => [g, g !== "moon"])), // Moon off by default
  );

  useEffect(() => {
    fetch("/data/transitions.json").then((r) => r.json()).then(setData);
  }, []);

  const positions = useMemo(() => {
    if (!data) return {};
    return Object.fromEntries(GRAHAS.map((g) => [g, signAt(data.planets[g], value)]));
  }, [data, value]);

  // Clamp the scrubbed value to the data window, then build a ±rangeYears band.
  const winStart = useMemo(() => new Date(data?.range.start ?? 0), [data]);
  const winEnd = useMemo(() => new Date(data?.range.end ?? 0), [data]);
  const yearMs = 365 * 864e5;
  const rangeStart = useMemo(
    () => new Date(Math.max(value.getTime() - rangeYears * yearMs, winStart.getTime())),
    [value, rangeYears, winStart]);
  const rangeEnd = useMemo(
    () => new Date(Math.min(value.getTime() + rangeYears * yearMs, winEnd.getTime())),
    [value, rangeYears, winEnd]);
  const events = useMemo(() => {
    if (!data) return [];
    const planets = GRAHAS.filter((g) => enabled[g]);
    return transitionsInRange(data, planets, rangeStart, rangeEnd);
  }, [data, enabled, rangeStart, rangeEnd]);

  if (!data) return <div className="card">Loading…</div>;

  return (
    <div className="app">
      <div className="card">
        <header>
          <div className="brand"><div className="om">ॐ</div>
            <div><h1>Jyotish Helper</h1><p>Gochar · Transit · Lahiri</p></div></div>
          <div className="seg">
            <button className={script==="western"?"on":""} onClick={()=>setScript("western")}>Western</button>
            <button className={script==="devanagari"?"on":""} onClick={()=>setScript("devanagari")}>देवनागरी</button>
          </div>
        </header>
        <div className="grid2">
          <div className="chartwrap">
            <NorthIndianChart positions={positions} house1Sign={house1Sign} />
          </div>
          <div className="panel">
            <div className="field"><label>House 1 sign (Lagna)</label>
              <LagnaSelect value={house1Sign} onChange={setHouse1Sign} script={script} /></div>
            <div className="field"><label>Transition planets</label>
              <PlanetFilter enabled={enabled}
                onToggle={(p)=>setEnabled((e)=>({...e,[p]:!e[p]}))} /></div>
            <div className="readout"><div className="lbl">Viewing</div>
              <div className="val">{value.toLocaleString()}</div></div>
          </div>
        </div>
        <div className="timebar">
          <div className="timehead">
            <span className="ttl">Timeline</span>
            <div className="range-seg">
              {([1,5,10] as const).map((y) => (
                <button key={y} type="button" className={rangeYears===y?"on":""}
                  onClick={()=>setRangeYears(y)}>±{y}y</button>
              ))}
            </div>
          </div>
          <TimeSlider start={rangeStart} end={rangeEnd} value={value}
            onChange={setValue} events={events} />
        </div>
      </div>
    </div>
  );
}
```

Add the panel/card CSS by porting the relevant rules from `designs/design-04/index.html` into `web/src/styles/app.css` (import it in `main.tsx`). Reuse token vars; do not hardcode colors.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- App` → PASS. Then full suite: `npm run test` → all pass.

- [ ] **Step 5: Manual verification**

Run: `npm run dev`, open the app. Confirm: chart shows all 9 grahas in correct signs for "now"; changing the Lagna dropdown rotates the houses; toggling Moon adds/removes its dots; dragging the slider updates the chart; clicking a dot jumps to that transition; the ±1y/±5y/±10y buttons widen the band (more dots appear); Western/Devanagari toggle switches sign names. Then `npm run build` succeeds.

- [ ] **Step 6: Commit**

```bash
git add web/ && git commit -m "feat(web): wire transit chart app end-to-end"
```

---

## Notes for the executor

- **TDD is mandatory** (see `test-driven-development` skill): write the test, watch it fail, then implement.
- Apply the **`vercel-react-best-practices`** skill when writing React.
- Apply the **`jyotish-design-standards`** skill for any styling decision.
- The Phase A checkpoint exists so the user can sanity-check the generated data before any UI is built.
- Out of scope (do NOT add): degrees, aspects, dashas, nakshatras, birth charts, live Lagna, backend.
