# Notes for AI agents and reviewers

## Review guidelines

This repository holds the BoxFab code interpreter sandbox template. The template is
generated from the open-source E2B Code Interpreter template by `scripts/sync_upstream.py` and then
changed by a fixed set of asserted rewrites (see `UPSTREAM.md`).

- **Generated paths are out of scope for behaviour review:** `template/`, `tests/` (except
  `tests/uv.lock`), `README.md` and `Makefile`. Their content is upstream's apart from the listed
  rewrites; upstream issues are not fixed here. Do not report them. The `e2b` names kept in the
  template (`e2b/data`, `e2b/chart`, `e2b-charts`, `/run/e2b-jupyter`, `E2B_LOCAL`) are internal to
  the sandbox and stay on purpose, to keep the template identical to upstream's.
- **Do review:** `scripts/sync_upstream.py` (a rule that can match the wrong text, an audit that
  can miss an upstream name, the hostname rewrite), `overlay/` (our README text), the workflows in
  `.github/workflows/`, the E2B SDK checks in `.github/e2b-sdk-check/` and the hand-written docs.
- Report concrete P1/P2 defects with the triggering input and effect; skip style.
