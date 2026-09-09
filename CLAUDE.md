@AGENTS.md

## Claude Code specifics

- Invoke the `frontend-design` skill before writing any frontend code here, every session, no
  exceptions.
- Never screenshot a `file:///` URL. Start `node serve.mjs` in the background before taking any
  screenshot, and check first whether it is already running rather than starting a second
  instance.
- After running `node screenshot.mjs`, read the resulting PNG from `temporary screenshots/` with
  the Read tool to view it directly and compare against the reference, per the workflow in
  `AGENTS.md`.
