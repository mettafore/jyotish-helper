# Dark Mode — Design Spec

**Date:** 2026-07-07
**Status:** Approved (design), pending implementation plan
**Branch:** `feat/dark-mode`

## Goal

Add a **Light / Dark / Auto** theme control to the web app. Default follows the
device (`prefers-color-scheme`); the user can lock Light or Dark; the choice
persists across visits. The dark look stays loyal to the **Saffron Gold** brand —
the approved **"Obsidian"** direction: near-black warm-neutral surfaces, cream
text, brightened gold hairlines, lightened graha colors. No flash of the wrong
theme on load. Chart / slider / transit logic is untouched — this is purely a
presentation layer.

## Behavior (Option A — three-state)

| Pick | What happens |
|------|--------------|
| **Auto** (default, first visit) | Resolves to the OS setting. **Live**: if the OS flips light↔dark while the page is open, the theme follows. |
| **Light** | Locks light regardless of OS. |
| **Dark** | Locks dark regardless of OS. |

- The pick is saved in `localStorage` under key `theme` (`"light" | "dark" | "auto"`).
- On load: read the saved pick; if absent or unrecognized → treat as `auto`.
- The **resolved** theme (`light` | `dark`) is written as `data-theme` on
  `<html>` (`document.documentElement`). All CSS keys off this attribute.

## Architecture

The app already drives **every** color through CSS custom properties in
[web/src/styles/tokens.css](../../../web/src/styles/tokens.css). Dark mode is
therefore a **second set of token values** activated by an attribute — not a
rewrite. Runtime logic (transits, chart, slider) does not change.

### Components / boundaries

1. **`web/src/lib/theme.ts`** — pure, framework-free, fully unit-testable:
   - `type ThemePref = "light" | "dark" | "auto"`
   - `type ResolvedTheme = "light" | "dark"`
   - `resolveTheme(pref: ThemePref, systemDark: boolean): ResolvedTheme` — the
     truth table. `auto` → `systemDark ? "dark" : "light"`; otherwise the pref.
   - `readPref(): ThemePref` — reads `localStorage.theme`; returns `"auto"` for
     missing/invalid values (never throws — wrap in try/catch for privacy-mode
     `localStorage` access).
   - `savePref(pref: ThemePref): void` — writes `localStorage.theme` (try/catch).
   - `applyTheme(resolved: ResolvedTheme): void` — sets
     `document.documentElement.setAttribute("data-theme", resolved)`.

2. **`web/src/lib/useTheme.ts`** (`useTheme` hook) — wires state to the DOM:
   - Holds `pref` state, initialized from `readPref()`.
   - Derives `resolved` via `resolveTheme(pref, matchMedia("(prefers-color-scheme: dark)").matches)`.
   - `setPref(next)` → updates state, `savePref`, `applyTheme`.
   - Subscribes to the `matchMedia("(prefers-color-scheme: dark)")` `change`
     event; while `pref === "auto"`, re-applies on OS change. Cleans up listener
     on unmount.
   - Returns `{ pref, setPref }`.

3. **`web/src/components/ThemeToggle.tsx`** — the 3-way segmented control,
   styled with the existing `.seg` classes, placed in the header next to the
   Western/देवनागरी toggle. Buttons: **Light · Dark · Auto** (short text labels,
   matching the existing seg; the active one gets `.on`). Calls `setPref`.

4. **No-flash head script** — a tiny **inline** `<script>` in
   [web/index.html](../../../web/index.html) `<head>`, before the stylesheet/app
   load, that mirrors the resolve logic and sets `data-theme` synchronously
   **before first paint**:
   ```html
   <script>
     try {
       var p = localStorage.getItem('theme');
       // p !== 'light' covers 'dark', 'auto', null, and garbage → all fall to OS
       // except the explicit 'dark'/'light' locks.
       var d = p === 'dark' ||
               (p !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);
       document.documentElement.setAttribute('data-theme', d ? 'dark' : 'light');
     } catch (e) {}
   </script>
   ```
   This is a deliberate small duplication of `resolveTheme` for the pre-React
   critical path (`ponytail:` — the alternative, an unstyled flash, is worse).
   The React `useTheme` hook re-asserts the same value on mount, so they agree.

### CSS changes

**A. Introduce neutral-surface tokens** (in `tokens.css` `:root`), replacing the
scattered hardcoded whites in [web/src/styles/app.css](../../../web/src/styles/app.css)
so dark becomes a pure token swap:

| New token | Light value | Replaces (app.css) |
|-----------|-------------|--------------------|
| `--surface` | `rgba(255,255,255,.5)` | `.seg`, `.howto`, `.range-seg`, `select` (~.5–.65), `.readout`, `.today-btn`, planet-toggle bg |
| `--surface-on` | `#fff` | `.seg button.on`, `.range-seg button.on`, `.today-btn:hover`, handle core `#fffdf8` |
| `--hl` | `rgba(255,255,255,.7)` | `.card` inset top highlight; om tile inset uses `.5` → `--hl` too |
| `--caret` | `#8a7558` (`%238a7558`) | `select` dropdown-arrow SVG stroke |

Replace the matching literals in `app.css` with `var(--…)`. (`color:#fff` text on
the saffron→gold **om tile gradient** stays `#fff` — legible in both themes.)

**B. Add the Obsidian dark block** in `tokens.css`:

```css
:root[data-theme="dark"]{
  /* surfaces */
  --bg1:#101010; --bg2:#181818;
  --glass:rgba(30,30,30,.62); --glass-brd:rgba(212,175,110,.26);
  /* text */
  --ink:#efe9df; --ink-soft:#b3a892; --faint:#83796a;
  /* accents */
  --gold:#dcae4d; --gold-soft:rgba(220,174,77,.14); --saffron:#f0a13c;
  /* structure */
  --line:rgba(220,174,77,.22);
  --shadow:0 16px 46px -16px rgba(0,0,0,.6);
  /* neutral surfaces */
  --surface:rgba(255,255,255,.06); --surface-on:rgba(255,255,255,.10);
  --hl:rgba(255,255,255,.06); --caret:#b3a892;
  /* per-graha — lightened for legibility on near-black */
  --gr-su:#f0932e; --gr-mo:#9aa8ad; --gr-ma:#e46b57; --gr-me:#45b088;
  --gr-ju:#e0c05a; --gr-ve:#c48fcc; --gr-sa:#7c9ed0; --gr-ra:#b39a72; --gr-ke:#c2a17f;
}
```
Radii, blur, and fonts are theme-independent (unchanged).

**C. Body background** — the `body` gradient hardcodes `#fff` and `#f7ead0`
highlights. Override the whole `body` background under
`:root[data-theme="dark"] body{ … }` with a subtle warm dark glow
(e.g. radial `#232323` highlight over the `--bg1`→`--bg2` linear), so the page
canvas (outside the card) also goes dark.

## Testing (TDD — write tests first)

**Unit — `theme.test.ts`:**
- `resolveTheme` truth table: `(auto,true)→dark`, `(auto,false)→light`,
  `(light,*)→light`, `(dark,*)→dark`.
- `readPref`: `"dark"`→`dark`; missing→`auto`; garbage (`"blue"`)→`auto`.
- `savePref` then `readPref` round-trips.
- `readPref`/`savePref` swallow a throwing `localStorage` (privacy mode) → no crash, returns `auto`.

**Component — `ThemeToggle.test.tsx`:**
- Renders three options; the one matching current `pref` has `.on`.
- Clicking **Dark** sets `document.documentElement data-theme="dark"` and persists `theme=dark`.
- With `pref=auto`, mocked `matchMedia` dark → resolves dark.
- (If practical) a `matchMedia` `change` event while on `auto` re-applies; switching to a locked pref stops following.

**Regression:** the full existing suite (`App.test.tsx`, `NorthIndianChart`,
`TimeSlider`, `controls`, `degrees`, `transits`, `signs`, `format`) stays green —
evidence nothing else moved.

**Manual validation (post-implementation):**
- Load with OS in dark → page renders dark with **no white flash**.
- On **Auto**, flip OS light↔dark → page follows live.
- Pick **Light**, refresh → still light (pick sticks); pick **Auto**, refresh → follows OS again.
- Eyeball the chart in dark: all nine graha glyphs, slider dots, "Now" marker, and
  gold hairlines are clearly legible against Obsidian.

## Scope guard / non-goals

- **Purely additive:** new `theme.ts`, `useTheme.ts`, `ThemeToggle.tsx`, a dark
  token block, neutral-surface tokens, and the no-flash script. The only edits to
  existing files are (a) swapping hardcoded whites for the new tokens in
  `app.css`, (b) mounting `ThemeToggle` in the header of `App.tsx`, (c) the head
  script + nothing else in `index.html`.
- **No** change to transit math, chart geometry, slider logic, or the data model.
- **No** per-graha color redesign beyond lightening for dark legibility.
- **No** theming of the offline Python generator (frontend-only).
- Animated theme-transition polish is out of scope (instant swap is fine).
```
