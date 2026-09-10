# Agent instructions

This file is the shared contract for every harness that reads `AGENTS.md` directly, rather than
`CLAUDE.md`. Claude Code reads it too, via `CLAUDE.md`'s `@AGENTS.md` import. Keep this file
authoritative and self-contained; don't assume the reader has also seen `CLAUDE.md`.

## What this is

WishPool, a gifting/wishlist-pooling landing page: a single static `index.html` (all CSS and JS
inline, no build step) plus a Vercel serverless function (`api/subscribe.js`) that captures
waitlist signup emails into an Airtable base (`app40Sptn1IA6WmBQ`, table `Table 1`, per that
file). No sibling repo dependency found in any tracked file.

## Session start

Read `STATE.md` and `GOTCHAS.md` first, both short. Git and any live dashboards outrank any prose
claim about current state; check them before trusting a claim here. `DECISIONS.md` is the
append-only dated decision log: read it before reopening a settled call, add a line when you make
a new one, never rewrite an existing dated line.

Full protocol for what to read on entry, what to write on exit, and what to do when something
unexpected happens: `~\.agents\PROTOCOL.md`.

## Stack and run commands

Plain Node (`"type": "module"`), no frontend framework, no build step. `puppeteer-core` is the
only listed dependency, used by the dev-only screenshot tool below.

- `node serve.mjs`: static file server at `http://localhost:3000`. It only serves files; it has
  no `/api/*` routing, so a form submit against it will 404 on `/api/subscribe` and never reach
  Airtable. Only a real Vercel deploy (or `vercel dev`) exercises the API end to end.
- `node screenshot.mjs <url> [label]`: Puppeteer screenshot saved to `temporary screenshots/`
  (gitignored), for comparing the rendered page against a reference design. Screenshots are
  auto-incremented (`screenshot-N.png`, or `screenshot-N-label.png` with a label) and never
  overwritten.
- `node verify-word.mjs [word]`: force-renders a hero swap word to check its layout.

## Verification gate

No test suite: `package.json`'s `test` script is a placeholder (`echo "Error: no test
specified" && exit 1`). The closest gate is the manual visual-verification workflow above (serve
locally, screenshot, compare against the reference); there is no automated check.

This gate is non-negotiable for any harness or agent making code changes here, not just Claude
Code. A change that has not run the gate clean is not done. Do not commit with `--no-verify`. If a
cap or a gate step is genuinely wrong for the content, say so and get it changed rather than
routing around it.

## Repo boundaries

No sibling repo in `..\<repo>` is referenced anywhere in tracked files; this repo stands alone.

## Hard rules and compliance

Moved here from the old `CLAUDE.md`, the real frontend build/matching-reference conventions (not
Claude-specific; see `CLAUDE.md` for what stayed there):

- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in
  placeholder content only (images via `https://placehold.co/`, generic copy). Do not improve on
  or add to the design.
- If no reference image: design from scratch with high craft. No default Tailwind palette
  (indigo-500, blue-600, etc); pick a custom brand color and derive from it. Never flat
  `shadow-md`; use layered, color-tinted shadows. Pair a display/serif font with a clean sans,
  never the same font for both; tight tracking (`-0.03em`) on large headings, generous line-height
  (`1.7`) on body. Layer multiple radial gradients and add grain/texture via an SVG noise filter
  for depth rather than a flat gradient. Only animate `transform` and `opacity`, never
  `transition-all`, with spring-style easing. Every clickable element needs hover, focus-visible,
  and active states. Images get a gradient overlay (`bg-gradient-to-t from-black/60`) and a color
  treatment layer (`mix-blend-multiply`). Use intentional, consistent spacing tokens, and a
  layering system (base, elevated, floating) rather than one flat plane.
- Output defaults: single `index.html`, all styles inline, unless told otherwise. Tailwind via
  `<script src="https://cdn.tailwindcss.com"></script>`. Placeholder images via
  `https://placehold.co/WIDTHxHEIGHT`. Mobile-first responsive.
- Verify visually: serve locally (`node serve.mjs`), screenshot (`node screenshot.mjs`), compare
  against the reference, fix mismatches, re-screenshot. At least 2 comparison rounds; stop only
  when no visible differences remain or the user says so. Be specific when comparing, for example
  "heading is 32px but reference shows ~24px" or "card gap is 16px but should be 24px", and check
  spacing and padding, font size, weight and line-height, colors as exact hex, alignment,
  border-radius, shadows, and image sizing.
- Do not add sections, features, or content not in the reference. Do not "improve" a reference
  design instead of matching it.
- Check for a `brand_assets/` folder before inventing placeholders (none exists in this repo as
  of today); if one is added, use real logos or a defined color palette from it rather than
  inventing brand colors.

## Writing style

No em dashes anywhere (user-facing copy, comments, docs). Natural, human phrasing; errors say what
happened and what to do next. Match the surrounding code's conventions.
