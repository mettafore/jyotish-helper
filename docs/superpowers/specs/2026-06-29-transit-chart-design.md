# Jyotish Helper v1 — Transit Chart Design

**Date:** 2026-06-29
**Status:** Approved (brainstorming)

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
- Sign labels: **Western default** (Aries…), toggle to **Devanagari** (मेष…).

### Time slider (single control)

- Range: default **±1 year**, expandable up to **±10 years**, panning within the
  fixed 2015–2040 data window.
- **Drag handle:** free scrub to any date; chart updates live (cheap lookup).
- **Transition dots:** sign-change events render as dots on the track; clicking a
  dot jumps to that exact transition. No arrow buttons.
- **Planet filter:** user selects which planets' transitions appear as dots /
  drive snapping. Default = all **except Moon** (so slow, astrologically major
  events aren't buried); Moon toggleable on.
- **"Now" marker** always present on the track.

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
- Generator: Python 3 + pyswisseph (`generator/requirements.txt`).
- Apply the `vercel-react-best-practices` skill for React work.

## Licensing

Swiss Ephemeris (pyswisseph) is AGPL. It runs offline only to generate JSON; the
shipped frontend has no swisseph dependency → no AGPL obligation on the
distributed app. Keep the generator isolated.

## Follow-ups (not v1 implementation)

- **Design-standards skill:** a project skill in `.agents/skills/` pinning visual
  standards (palette, typography, North Indian chart aesthetics, shadcn component
  conventions). To be authored via the `writing-skills` skill before UI build.
- **Auto-commit:** documented in AGENTS.md; optionally enforce via a Stop hook.
- Later: birth charts, live Lagna (needs location), exact degrees, aspects.
