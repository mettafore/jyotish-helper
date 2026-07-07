# Architecture

Three views of the same system: no backend, static JSON in, browser-only rendering out.

## 1. System architecture

```mermaid
flowchart LR
    subgraph offline["Offline generator, runs by hand"]
        eph["pyswisseph: Moshier mode, Lahiri ayanamsa"]
        gen["jyotish_gen.build"]
        eph --> gen
    end

    subgraph data["Static JSON, committed to web/public/data/"]
        trans["transitions.json: sign-change timestamps per graha"]
        deg["degrees.json: daily sidereal longitude per graha"]
    end

    subgraph client["Frontend, static site on Vercel"]
        load["load JSON at page load"]
        bsearch["binary search: signAt, effectiveSignDegree, nextTransitionToday"]
        render["React render: NorthIndianChart, TimeSlider, GrahaDegrees"]
        load --> bsearch --> render
    end

    gen --> trans
    gen --> deg
    trans --> load
    deg --> load
```

No server, no DB, no astronomy at request time — the browser only ever does
lookups against data computed once, offline.

## 2. Component tree & prop flow

```mermaid
flowchart TB
    App["App: state value Date, script, house1Sign, rangeMonths, enabled"]

    App -->|positions, house1Sign, script, retro, combust| Chart["NorthIndianChart"]
    App -->|value, onChange| Lagna["LagnaSelect"]
    App -->|enabled, script, onToggle| Filter["PlanetFilter"]
    App -->|start, end, value, events, onChange| Slider["TimeSlider"]
    App -->|data, transitions, date, script| Degrees["GrahaDegrees"]

    Lagna -.->|setHouse1Sign| App
    Filter -.->|setEnabled| App
    Slider -.->|setValue| App
```

All derived state (`positions`, `retro`, `combust`, `events`) is computed in
`App` from `transitions.json`/`degrees.json` + `value`, then passed down —
children are presentational, no child fetches or computes astrology data itself.

## 3. Build & release pipeline

```mermaid
flowchart LR
    branch["feature branch"] -->|tests green, code review, security review| main["main"]
    main -->|gh release create| release["GitHub Release"]
    main -->|vercel --prod --yes| prod["Vercel production: web-pi-kohl-36.vercel.app"]
    main -.->|update-readme skill| readme["README.md"]
```

Deploys always build from `main`, never an unmerged branch (see
[`AGENTS.md`](../AGENTS.md) and the `deploy` skill). Merged branches are
deleted after landing.
