# Jyotish Helper

A Vedic astrology **transit (gochar) chart** — see which sign each of the 9 grahas
occupies in a North Indian diamond chart, scrubbable over 2015–2040, using the
**Lahiri sidereal** system.

**Live:** https://web-pi-kohl-36.vercel.app

## What it does

- North Indian diamond chart of all 9 grahas (Sun … Saturn, Rahu, Ketu) for any moment.
- Set any sign as house 1 (compare transits against a client's natal Lagna).
- Time slider with clickable, dated transition markers; jump to "Now" or any range
  (±3M / ±6M / ±1Y / ±5Y / ±10Y).
- Western or Devanagari script for the whole chart.

## Architecture (no backend)

- **`generator/`** — offline Python ([uv](https://docs.astral.sh/uv/)) +
  [pyswisseph](https://github.com/astrorigin/pyswisseph) (Moshier mode) computes every
  graha's sign-transition timestamps once and writes a static
  `web/public/data/transitions.json`.
- **`web/`** — static Vite + React + TypeScript app. Loads the JSON and does a
  binary-search lookup at runtime — zero astronomy in the browser. Deployed on Vercel.

## Develop

```bash
# Generate the data (once)
cd generator && uv sync && uv run python -m jyotish_gen.build

# Run the app
cd web && npm install && npm run dev

# Tests
cd generator && uv run pytest          # generator
cd web && npm test                     # frontend
```

## License

This project is licensed under the **GNU Affero General Public License v3.0**
(see [LICENSE](LICENSE)).

It uses the **Swiss Ephemeris** (via `pyswisseph`), which is itself AGPL-3.0 (or a
separate commercial license from Astrodienst AG). Because the generator links Swiss
Ephemeris, the whole project is distributed under AGPL-3.0. Swiss Ephemeris is
© Astrodienst AG, Zürich — https://www.astro.com/swisseph/

Copyright (C) 2026 Luv Suneja.
