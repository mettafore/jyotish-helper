# Jyotish Helper — Agent Guide

Vedic astrology helper. **v1 = transit (gochar) chart**: which sign each graha
occupies in a North Indian diamond chart, scrubbable over time, using the
**Lahiri sidereal** system.

Full design: [docs/superpowers/specs/2026-06-29-transit-chart-design.md](docs/superpowers/specs/2026-06-29-transit-chart-design.md)

## Core architecture — NO backend in v1

Two separate parts. Keep them separate.

1. **Offline generator** (`generator/`, Python + `pyswisseph`)
   - Computes every graha's **sign-transition timestamps** over a fixed
     absolute window **2015–2040**, Lahiri ayanamsa, geocentric.
   - Uses **Moshier** mode (no `.se1` data files needed).
   - Output: a single static JSON committed at `web/public/data/transitions.json`.
   - Runs by hand / CI, NOT at request time.

2. **Frontend** (`web/`, Vite + React + TypeScript + Tailwind + shadcn/ui)
   - Loads the JSON. For any date, **binary-search** each planet's transition
     list to get its current sign. **Zero astronomy at runtime.**
   - Static site. No server, no DB. Add a backend later only for birth charts /
     live Lagna / degrees.

## Data model

`transitions.json` — per graha, an ordered list of sign entries:

```json
{
  "ayanamsa": "lahiri",
  "range": { "start": "2015-01-01T00:00:00Z", "end": "2040-01-01T00:00:00Z" },
  "planets": {
    "saturn": [
      { "sign": 10, "enters": "2014-11-02T..." },
      { "sign": 11, "enters": "2017-01-26T..." }
    ]
  }
}
```

- `sign`: 0–11 (0 = Aries / Mesha … 11 = Pisces / Meena).
- Timestamps stored in **UTC**. Frontend displays in **browser local time**.
- Retrograde re-entry (Mercury/Venus/Mars crossing a boundary backward then
  forward) = just extra entries in the list. Generator must scan finely near
  boundaries to catch them. Rahu/Ketu are always retrograde — handled the same.

## Grahas (9)

Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, **Rahu**, **Ketu** (lunar
nodes). No Uranus/Neptune/Pluto. Moon is fast (~2.25 days/sign).

## UI behavior

- **Chart frame:** North Indian diamond, fixed house layout. House 1 default =
  **Aries**. A sign dropdown can set any sign as house 1 (= a client's natal
  Lagna, for gochar-over-natal overlay). This is a manual sign pick — **no
  location / live ascendant math**.
- **Time slider (single control):**
  - Range default **±1 year**, expandable to **±10 years** (within the fixed
    2015–2040 data window).
  - Drag = free scrub to any date; chart updates live.
  - Transition events shown as **dots on the slider track**; click a dot to jump
    to that exact transition. (No arrow buttons.)
  - **Planet filter**: user selects which planets' transitions appear as dots /
    drive snapping. Default = all **except Moon** (so slow events aren't buried
    by ~1600 Moon changes); Moon toggleable on.
  - A **"Now"** marker is always on the track.
- **Sign labels:** **Western default** (Aries, Taurus…), with a **Devanagari**
  toggle (मेष, वृष…).
- Multiple grahas in one sign → stack their labels in that house cell.

## Out of scope (v1)

Aspects, combustion, planetary war, nakshatras, dashas, **exact degrees**, birth
charts, houses requiring location. Defer all.

## Stack & conventions

- Frontend: Vite + React + TypeScript + Tailwind + **shadcn/ui**.
- Generator: Python 3, `pyswisseph`. Keep deps in `generator/requirements.txt`.

## Test-driven development

**Write tests first.** For every feature/bugfix, follow red→green→refactor:

1. Write a failing test that pins the expected behavior.
2. Run it, confirm it fails for the right reason.
3. Write the minimum code to pass.
4. Refactor with the test green.

Use the installed **`test-driven-development`** skill — it is rigid, follow it
exactly; don't skip the failing-test step. Highest-value targets here:

- **Generator:** sign-boundary detection against known transitions; retrograde
  re-entry yields multiple entries; Lahiri ayanamsa applied.
- **Frontend:** "sign at time *t*" binary search against fixtures; house rotation
  when house-1 sign changes; planet-filter dot logic.

Keep units small and independently testable (see the spec's component split).

## Auto-commit

**Commit automatically at the end of every AI turn.** After completing the work
in a turn, stage and commit with a clear Conventional Commits message before
yielding. Keep commits small and reversible; never push unless asked.

> Note: a documented instruction relies on the agent following it. For
> guaranteed automation regardless of agent, wire a **Stop hook** in
> `settings.json` (`git add -A && git commit`) via the `update-config` skill.

## Skills to use

- **`vercel-react-best-practices`** (external) — apply when writing/refactoring
  React. Install: `npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices`
- **`/code-review`** on diffs before commit; **`/security-review`** before any
  deploy. (Both ship with the harness — trusted, no external supply chain.)
- A project **design-standards** skill (palette, typography, chart aesthetics)
  is planned — see follow-up in the spec.

## Licensing note

Swiss Ephemeris (`pyswisseph`) is **AGPL**. It runs **offline only** to generate
the JSON; the shipped frontend has **no swisseph dependency**, so there is no
AGPL obligation on the distributed app. Keep the generator isolated in
`generator/`.
