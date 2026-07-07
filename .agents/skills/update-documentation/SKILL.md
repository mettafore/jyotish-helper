---
name: update-documentation
description: Use after merging a branch to main or cutting a release, to bring README.md and docs/architecture.md in sync with what actually shipped.
---

# Update documentation

`README.md` (user-facing) and `docs/architecture.md` (mermaid diagrams) both
drift fast. Run this whenever a branch merges to `main` or a release is
tagged (see AGENTS.md "Keep documentation current").

## Steps

1. Diff what changed since the docs were last accurate:
   `git log --oneline <last-docs-touching-commit>..HEAD -- . ':!README.md' ':!docs/architecture.md'`
   (or just review the commits in the branch/release being merged).
2. Check `README.md` against current reality:
   - **What it does** — any new feature (chart marks, panels, controls)?
     Add a bullet; don't just append, fold related bullets together.
   - **Live URL** — still correct (`https://web-pi-kohl-36.vercel.app`)?
   - **Architecture** — did the data model change (new JSON file, new
     generator module)? Update the file list and one-line description.
   - **Develop** commands — do `npm run dev`/`test`/generator commands still
     match `web/package.json` and `generator/pyproject.toml`? Don't let this
     silently rot.
   - **License** section rarely changes — touch only if licensing actually changed.
3. Check `docs/architecture.md` against current reality:
   - New component, prop, or data file? Update the matching mermaid diagram
     (system architecture / component tree / release pipeline).
   - Verify diagram node/prop names actually match the code (see App.tsx
     props, generator output files) — don't let diagrams describe stale shape.
   - **Verify it renders** before committing: extract each ```mermaid block
     and run through `npx @mermaid-js/mermaid-cli` (or equivalent), since
     GitHub's renderer silently blanks on unsupported syntax (no error shown).
     Known GitHub gotchas: no `style <subgraphId> ...`, no `<br/>` reliably —
     use plain colon-separated text in labels instead.
4. Keep it tight: README is a pitch + quickstart, not a changelog; diagrams
   show current shape, not history. Don't copy commit messages in verbatim —
   summarize user-visible capability / structural change.
5. Commit as its own commit: `docs: update README/architecture for <what shipped>`.

## Notes

- Don't invent features that exist in code but aren't user-reachable yet
  (in-progress/behind a flag) — docs describe what's live now.
- If nothing user-facing or structural changed (pure refactor, internal test
  additions), it's fine to skip — say so rather than padding docs with noise.
