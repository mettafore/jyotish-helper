# Architecture

Three views of the same system: no backend, static JSON in, browser-only rendering out.

## 1. System architecture

```mermaid
flowchart LR
    subgraph offline["Offline (generator/, runs by hand)"]
        eph["pyswisseph\nMoshier mode, Lahiri ayanamsa"]
        gen["jyotish_gen.build"]
        eph --> gen
    end

    subgraph data["Static JSON (committed, web/public/data/)"]
        trans["transitions.json\nsign-change timestamps per graha"]
        deg["degrees.json\ndaily sidereal longitude per graha"]
    end

    subgraph client["Frontend (web/, static site on Vercel)"]
        load["load JSON at page load"]
        bsearch["binary search\nsignAt / effectiveSignDegree / nextTransitionToday"]
        render["React render\nNorthIndianChart, TimeSlider, GrahaDegrees"]
        load --> bsearch --> render
    end

    gen --> trans
    gen --> deg
    trans --> load
    deg --> load

    style offline fill:#f0e2c0,stroke:#b8902f
    style data fill:#fffdf8,stroke:#b8902f
    style client fill:#fbf4e6,stroke:#e08a2b
```

No server, no DB, no astronomy at request time — the browser only ever does
lookups against data computed once, offline.

## 2. Component tree & prop flow

```mermaid
flowchart TB
    App["App\nstate: value (Date), script, house1Sign,\nrangeMonths, enabled (planet filter)"]

    App -->|positions, house1Sign, script,\nretro, combust| Chart["NorthIndianChart"]
    App -->|value, onChange| Lagna["LagnaSelect"]
    App -->|enabled, script, onToggle| Filter["PlanetFilter"]
    App -->|start, end, value, events, onChange| Slider["TimeSlider"]
    App -->|data, transitions, date, script| Degrees["GrahaDegrees"]

    Lagna -.->|setHouse1Sign| App
    Filter -.->|setEnabled| App
    Slider -.->|setValue| App

    style App fill:#f0e2c0,stroke:#b8902f
```

All derived state (`positions`, `retro`, `combust`, `events`) is computed in
`App` from `transitions.json`/`degrees.json` + `value`, then passed down —
children are presentational, no child fetches or computes astrology data itself.

## 3. Build & release pipeline

```mermaid
flowchart LR
    branch["feature branch"] -->|tests green,\n/code-review, /security-review| main["main"]
    main -->|"gh release create vX.Y.Z"| release["GitHub Release"]
    main -->|"vercel --prod --yes"| prod["Vercel production\nweb-pi-kohl-36.vercel.app"]
    main -.->|update-readme skill| readme["README.md"]

    style main fill:#f0e2c0,stroke:#b8902f
    style prod fill:#e08a2b,stroke:#b8902f,color:#fffdf8
```

Deploys always build from `main`, never an unmerged branch (see
[`AGENTS.md`](../AGENTS.md) and the `deploy` skill). Merged branches are
deleted after landing.
