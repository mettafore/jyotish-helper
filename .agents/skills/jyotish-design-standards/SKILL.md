---
name: jyotish-design-standards
description: Use when building, styling, or reviewing any Jyotish Helper UI — components, colors, fonts, the North Indian chart, the time slider, glass panels — to keep the look consistent with the approved "Saffron Gold" direction.
---

# Jyotish Helper Design Standards

## Overview

The approved visual direction is **"Saffron Gold"** (design-04): glossy, Apple-sleek,
minimal, premium — warm ivory frosted glass with gold-leaf hairlines, saffron
accents, a refined serif for display type, and a subtle gold mandala motif. Calm,
gilded, expensive. Never gaudy.

Canonical reference: [../../../designs/design-04/index.html](../../../designs/design-04/index.html)
Drop-in tokens: [tokens.css](tokens.css)

## When to Use

- Building any new component, screen, or control in `web/`.
- Choosing a color, font, radius, shadow, or blur value.
- Styling the North Indian chart or the time slider.
- Reviewing UI for consistency with the brand.

When NOT to use: backend / generator code, data model decisions.

## Design Tokens (source of truth)

Use the CSS variables from [tokens.css](tokens.css). Never hardcode hex values
that duplicate a token — reference the variable.

| Token | Value | Use |
|-------|-------|-----|
| `--bg1` / `--bg2` | `#fbf4e6` / `#fffdf8` | page gradient ends |
| `--glass` | `rgba(255,251,242,.6)` | frosted panel fill |
| `--glass-brd` | `rgba(212,175,110,.45)` | panel border |
| `--ink` | `#3a2e1c` | primary text |
| `--ink-soft` | `#8a7558` | secondary text/labels |
| `--faint` | `#bca889` | hints, sign numbers |
| `--gold` | `#b8902f` | hairlines, glyphs, primary accent |
| `--gold-soft` | `#f0e2c0` | active chip / rail fill |
| `--saffron` | `#e08a2b` | "Now" marker, Sun, hot accent |
| `--line` | `rgba(184,144,47,.28)` | dividers, control borders |
| `--shadow` | `0 16px 46px -16px rgba(150,110,40,.3)` | panel elevation |

**Per-graha colors** — each graha has its own theme-coherent color (earthy palette
with a couple of jewel accents), used for both the chart glyph and its slider dots.
Source of truth: the `--gr-*` vars in [tokens.css](tokens.css).

| Graha | Token | Color |
|-------|-------|-------|
| Sun (Su) | `--gr-su` | `#d97a1f` saffron |
| Moon (Mo) | `--gr-mo` | `#7a8a8f` moonstone (off by default in filters) |
| Mars (Ma) | `--gr-ma` | `#b83f2e` rust |
| Mercury (Me) | `--gr-me` | `#2f7d5e` emerald |
| Jupiter (Ju) | `--gr-ju` | `#b8902f` gold |
| Venus (Ve) | `--gr-ve` | `#a06aa8` orchid |
| Saturn (Sa) | `--gr-sa` | `#3f5f86` indigo |
| Rahu (Ra) | `--gr-ra` | `#6a5a3f` umber |
| Ketu (Ke) | `--gr-ke` | `#8a6a4a` tan |

## Typography

- **Display / headings / values:** `Cormorant Garamond` (600–700), serif.
- **Graha glyphs (Su, Mo, …):** `Sora` (600–700) — geometric, vibrant, NOT serif.
  This is deliberate: grahas read as crisp, modern tokens, each in its own color.
- **UI / labels / values:** `Inter` (300–600).
- **Sanskrit / Devanagari (ॐ, rashi names):** `Noto Sans Devanagari`.
- Labels: 11px, `text-transform:uppercase`, `letter-spacing:.1em`, `--ink-soft`.

## Glass panel recipe

```css
background: var(--glass);
border: 1px solid var(--glass-brd);
backdrop-filter: blur(26px) saturate(140%);
-webkit-backdrop-filter: blur(26px) saturate(140%);
box-shadow: var(--shadow), inset 0 1px 0 rgba(255,255,255,.7);
border-radius: 30px;   /* cards. controls 13–16px, chips 20px pill */
```

## Geometry & motifs

- **Card radius** 30px; **controls** 13–16px; **chips** fully rounded (20px+).
- **Gold divider:** `linear-gradient(90deg,transparent,var(--gold),transparent)`, opacity ~.5, 1px tall.
- **Mandala motif:** faint gold concentric-circles + petals SVG behind the chart,
  `opacity:.14`. Decorative only, `pointer-events:none`. Never let it compete with content.
- **ॐ logo tile:** 42px rounded square, saffron→gold gradient, Devanagari ॐ.

## North Indian chart spec (must match across the app)

- `viewBox="0 0 400 400"`. Outer `rect` rounded `rx=6`, gold stroke 1.5.
- Two diagonals + central diamond `polygon points="200,2 398,200 200,398 2,200"`,
  gold stroke ~1.1, opacity .7.
- **House 1 = top-center diamond; numbering counter-clockwise.** Default sign in
  house 1 = Aries.
- Sign numbers: `--faint`, 9px, near each region edge. Graha glyphs: `Sora` 600,
  ~15px, each in its own `--gr-*` color, centered at the house centroid; multiple
  grahas in one cell use per-glyph `<tspan>` fills so each keeps its color.
- House centroids (x,y) for placing glyphs:
  H1 200,105 · H2 118,40 · H3 58,118 · H4 100,206 · H5 58,296 · H6 118,366 ·
  H7 200,312 · H8 284,366 · H9 356,300 · H10 304,206 · H11 320,118 · H12 284,40.

## Time slider spec

- Rail `--gold-soft`, 4px, rounded; fill `linear-gradient(90deg,var(--saffron),var(--gold))`.
- **Transition dots:** 10px, ivory fill, 2px planet-colored border, soft shadow. Click = snap.
- **"Now" marker:** 2px `--saffron` vertical line with a "Now" label above.
- **Handle:** 24px ivory circle, gold border, gradient core, soft shadow.
- Range segmented control: ±1y / ±5y / ±10y.

## Dark theme ("Obsidian")

The app is dual-theme: **Light / Dark / Auto**, driven by `data-theme="light|dark"`
on `<html>` (set pre-paint by an inline head script; managed by `useTheme`).
Dark is the approved **Obsidian** direction: near-black warm-neutral surfaces,
cream text, brightened gold, lightened graha colors. Same geometry, radii,
blur, and fonts — dark is a token swap, never a layout change.

Rules:

- **Never hardcode a white/ivory surface.** Use the neutral-surface tokens —
  they swap automatically in dark:

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--surface` | `rgba(255,255,255,.5)` | `rgba(255,255,255,.06)` | control / panel fills |
| `--surface-on` | `#fff` | `rgba(255,255,255,.10)` | active seg button, hover fills |
| `--hl` | `rgba(255,255,255,.7)` | `rgba(255,255,255,.06)` | inset top highlight |
| `--dot` | `#fffdf8` | `#e8e2d6` | slider transition dot fill |

- **Core tokens are re-valued in dark** (see the `:root[data-theme="dark"]`
  block in [tokens.css](tokens.css)): `--bg1/--bg2` near-black, `--glass`
  smoked, `--ink*` cream, `--gold #dcae4d`, `--saffron #f0a13c`,
  `--gold-soft` becomes a translucent gold wash, shadows go black-based.
- **Per-graha colors lighten in dark** for legibility on near-black — the
  `--gr-*` vars swap automatically; keep referencing the vars and both themes
  work for free.
- Exceptions that deliberately stay fixed: the ॐ tile's `color:#fff` (white on
  the saffron→gold gradient reads in both themes), and the light `body`
  gradient's `#fff`/`#f7ead0` highlights (dark has its own
  `:root[data-theme="dark"] body` override).
- When adding any new color: define it as a token with a value in **both**
  themes, and eyeball it against both backgrounds before shipping.

## Dark theme ("Obsidian")

The app is dual-theme: **Light / Dark / Auto**, driven by `data-theme="light|dark"`
on `<html>` (set pre-paint by an inline head script; managed by `useTheme`).
Dark is the approved **Obsidian** direction: near-black warm-neutral surfaces,
cream text, brightened gold, lightened graha colors. Same geometry, radii,
blur, and fonts — dark is a token swap, never a layout change.

Rules:

- **Never hardcode a white/ivory surface.** Use the neutral-surface tokens —
  they swap automatically in dark:

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--surface` | `rgba(255,255,255,.5)` | `rgba(255,255,255,.06)` | control / panel fills |
| `--surface-on` | `#fff` | `rgba(255,255,255,.10)` | active seg button, hover fills |
| `--hl` | `rgba(255,255,255,.7)` | `rgba(255,255,255,.06)` | inset top highlight |
| `--dot` | `#fffdf8` | `#e8e2d6` | slider transition dot fill |

- **Core tokens are re-valued in dark** (see the `:root[data-theme="dark"]`
  block in [tokens.css](tokens.css)): `--bg1/--bg2` near-black, `--glass`
  smoked, `--ink*` cream, `--gold #dcae4d`, `--saffron #f0a13c`,
  `--gold-soft` becomes a translucent gold wash, shadows go black-based.
- **Per-graha colors lighten in dark** for legibility on near-black — the
  `--gr-*` vars swap automatically; keep referencing the vars and both themes
  work for free.
- Exceptions that deliberately stay fixed: the ॐ tile's `color:#fff` (white on
  the saffron→gold gradient reads in both themes), and the light `body`
  gradient's `#fff`/`#f7ead0` highlights (dark has its own
  `:root[data-theme="dark"] body` override).
- When adding any new color: define it as a token with a value in **both**
  themes, and eyeball it against both backgrounds before shipping.

## Common Mistakes

- ❌ Pure white `#fff` panels → use warm `--glass` (ivory), not cold white.
- ❌ Hardcoding gold/saffron hex inline → reference tokens.
- ❌ Heavy/opaque mandala → keep faint (`opacity ≤ .15`), decorative.
- ❌ Sans-serif headings → display type is the serif (Cormorant).
- ❌ Serif graha glyphs → grahas use `Sora` (sans), each in its own `--gr-*` color.
- ❌ Monochrome grahas → every graha keeps its distinct color in chart + slider.
- ❌ Sharp corners → everything is generously rounded.
- ❌ Mandala or glow stealing focus from chart/planets.
- ❌ Hardcoding `#fff` / `rgba(255,255,255,…)` surfaces → use `--surface` / `--surface-on` / `--hl` so dark mode works.
- ❌ Adding a color that only works on ivory → every new token needs a dark value too.
- ❌ Hardcoding `#fff` / `rgba(255,255,255,…)` surfaces → use `--surface` / `--surface-on` / `--hl` so dark mode works.
- ❌ Adding a color that only works on ivory → every new token needs a dark value too.
