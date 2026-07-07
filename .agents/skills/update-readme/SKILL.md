---
name: update-readme
description: Use after merging a branch to main or cutting a release, to bring README.md's feature list, live URL, and Develop commands in sync with what actually shipped.
---

# Update README.md

`README.md` is user-facing (GitHub landing page) and drifts fast. Run this
whenever a branch merges to `main` or a release is tagged (see AGENTS.md
"Keep README.md current").

## Steps

1. Diff what changed since the README was last accurate:
   `git log --oneline <last-README-touching-commit>..HEAD -- . ':!README.md'`
   (or just review the commits in the branch/release being merged).
2. Check each README section against current reality:
   - **What it does** — any new feature (chart marks, panels, controls)?
     Add a bullet; don't just append, fold related bullets together.
   - **Live URL** — still correct (`https://web-pi-kohl-36.vercel.app`)?
   - **Architecture** — did the data model change (new JSON file, new
     generator module)? Update the file list and one-line description.
   - **Develop** commands — do `npm run dev`/`test`/generator commands still
     match `web/package.json` and `generator/pyproject.toml`? Don't let this
     silently rot.
   - **License** section rarely changes — touch only if licensing actually changed.
3. Keep it tight: README is a pitch + quickstart, not a changelog. Don't copy
   commit messages in verbatim; summarize user-visible capability.
4. Commit as its own commit: `docs: update README for <what shipped>`.

## Notes

- Don't invent features that exist in code but aren't user-reachable yet
  (in-progress/behind a flag) — README describes what's live now.
- If nothing user-facing changed (pure refactor, internal test additions),
  it's fine to skip — say so rather than padding the README with noise.
