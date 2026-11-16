# Changelog

Upstream template changes are in `template/CHANGELOG-E2B.md`.

## Unreleased

- Domain `us-west.boxfab.dev`, BoxFab's first region: the template is built with `boxfab` 0.1.0a4, which
  defaults to it; the E2B SDK check sets `E2B_DOMAIN=us-west.boxfab.dev`, and the cleanup step deletes the
  test template with `@boxfab/cli` 0.1.0-alpha.5. The previous default `boxfab.io` does not serve
  the API.
- README: the dashboard link points to `https://dashboard.us-west.boxfab.io`; step 2 exports
  `BOXFAB_API_KEY`, so the SDKs started from that shell see it; the E2B SDK instructions set
  `E2B_DOMAIN=us-west.boxfab.dev`.
- First version: the code interpreter sandbox template generated from `e2b-dev/code-interpreter`
  `c49b7860` (template 0.4.8), built with the BoxFab SDK, with the hostname `boxfab.local`.
- Workflows as upstream's: `pull_request.yml` (build a throwaway template, run `tests/`, delete it)
  and `lint.yml` (ruff).
- `tests/`: upstream's end-to-end tests of the template (91 passed against a build of this
  template on BoxFab, 2026-11-14).
- `README.md` and `template/README.md` generated from upstream's, with BoxFab's introduction and
  Under the hood; upstream's `Makefile` and `template/requirements-dev.txt` (with the BoxFab SDK)
  taken over.
