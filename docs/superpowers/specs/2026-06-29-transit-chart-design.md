# Jyotish Helper v1 — Transit Chart Design

**Date:** 2026-06-29
**Status:** Implemented & deployed (v1 live on Vercel). This spec reflects the
shipped app, including post-plan UI additions (range presets, Today + clickable
Now, hover/dated transition dots, full-chart Devanagari).

## Goal

Show which sign each graha occupies in a North Indian diamond chart for the
present, near past, and near future. Lahiri sidereal. A time slider scrubs
through time and marks planet sign-changes (transitions / gochar).

Audience: astrologers wanting to read "what's in the sky now" and compare
transits against a client's natal chart.

## Non-goals (v1)

Aspects, combustion, planetary war, nakshatras, dashas, exact degrees, birth
chart entry, location-dependent houses / live Lagna. All deferred.

## Architecture — no backend

Two isolated parts.

### 1. Offline generator (`generator/`, Python + pyswisseph)

- Computes sign-transition timestamps for all 9 grahas across a **fixed absolute
  window 2015–2040**.
- Lahiri ayanamsa, geocentric (location-independent — planet-in-sign is the same
  for everyone on Earth).
- **Moshier** mode → no `.se1` data files. Accuracy (~arcsec) far exceeds what
  sign-boundary detection needs.
- Boundary scan must be fine enough to catch **retrograde re-entry** (a planet
  crossing a sign cusp backward then forward yields enter/exit/re-enter).
- Output: one static JSON, committed at `web/public/data/transitions.json`.
- Run by hand or in CI. Never at request time.

### 2. Frontend (`web/`, Vite + React + TS + Tailwind + shadcn/ui)

- Loads `transitions.json` once.
- For any date: binary-search each planet's transition list → current sign.
  **Zero astronomy at runtime.**
- Pure static site. No server, no DB.

## Data model

```json
{
  "ayanamsa": "lahiri",
  "range": { "start": "2015-01-01T00:00:00Z", "end": "2040-01-01T00:00:00Z" },
  "planets": {
    "saturn": [
      { "sign": 9,  "enters": "2014-11-02T..." },
      { "sign": 10, "enters": "2017-01-26T..." }
    ]
  }
}
```

- `sign`: integer 0–11 (0 = Aries/Mesha … 11 = Pisces/Meena).
- `enters`: UTC ISO-8601. Frontend displays in **browser local time**.
- Current sign at time *t* = the entry with greatest `enters` ≤ *t* (binary search).

## Grahas

Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu. Moon is fast
(~2.25 days/sign → ~1600 transitions over the window); nodes always retrograde.

## UI components

### Chart (North Indian diamond)

- Fixed house layout (house positions never move on screen).
- House 1 (top) default = **Aries**.
- A sign dropdown sets any sign as house 1 = a client's natal Lagna sign, for
  gochar-over-natal overlay. Manual sign selection only — **no location, no live
  ascendant computation**.
- Each graha rendered into the house holding its current sign. Multiple grahas in
  one sign stack within the cell.
- Script toggle (**Western default** / **Devanagari**) switches the **whole chart**:
  Lagna dropdown sign names (Aries… / मेष…), **graha glyphs** (Su… / सू चं मं बु गु
  शु श रा के), and **house sign numbers** (1–12 / Devanagari numerals १–१२).

### Time slider (single control)

- Range presets: **±3M / ±6M / ±1Y / ±5Y / ±10Y** (default **±1Y**), as a band
  around the viewed date, clamped to the fixed 2015–2040 data window.
- **Drag handle:** free scrub to any date; chart updates live (cheap lookup).
- **Transition dots:** sign-change events render as clickable dot buttons on the
  track; each **pops on hover/focus** and its tooltip shows the **planet + exact
  date**; clicking jumps to that exact transition. No arrow buttons.
- **Planet filter:** user selects which planets' transitions appear as dots /
  drive snapping. Default = all **except Moon** (so slow, astrologically major
  events aren't buried); Moon toggleable on.
- **"Now" marker** always present on the track, and is itself a **clickable
  button** that jumps the view back to the present (also a **Today** button
  beside the range presets).

## Error / edge handling

- Date outside data window → clamp to range, show a notice.
- Empty/failed JSON load → error state, no chart.
- Retrograde clusters near a cusp → multiple transition entries; lookup still
  returns the correct current sign.

## Testing

- **Generator:** unit-test boundary detection against known transitions (e.g.
  Saturn → Pisces 2025-03-29). Verify retrograde re-entry produces multiple
  entries. Verify Lahiri ayanamsa applied.
- **Frontend:** unit-test the binary-search "sign at time *t*" against fixtures;
  test house rotation when house-1 sign changes; test planet-filter dot logic.

## Stack

- Frontend: Vite + React + TypeScript + Tailwind + shadcn/ui.
- Generator: Python 3 + pyswisseph, deps managed with **uv** (`generator/pyproject.toml`
  + `uv.lock`; run via `uv run`). No pip/requirements.txt.
- Apply the `vercel-react-best-practices` skill for React work.

## Deployment

Static frontend deployed on **Vercel** (`npx vercel --prod` from `web/`, scope
`mettafore`). Live: https://web-pi-kohl-36.vercel.app. The `transitions.json` ships
in `web/public/data/` and is served as a static asset; no server/runtime.

## Licensing

Swiss Ephemeris (pyswisseph) is AGPL. It runs offline only to generate JSON; the
shipped frontend has no swisseph dependency → no AGPL obligation on the
distributed app. Keep the generator isolated.

## Follow-ups (not v1 implementation)

- **Auto-commit:** documented in AGENTS.md; optionally enforce via a Stop hook.
