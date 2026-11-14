# Upstream

The template in this repository is derived from the open-source
[E2B Code Interpreter](https://github.com/e2b-dev/code-interpreter) template (Apache-2.0) and
includes modifications for BoxFab. Its chart extractor (`template/charts`, `e2b-charts`) is
MIT-licensed. The code interpreter SDKs are derived from the E2B Code Interpreter SDKs (MIT) and
are generated in [boxfab/python-sdk](https://github.com/boxfab/python-sdk/tree/main/code-interpreter)
and [boxfab/js-sdk](https://github.com/boxfab/js-sdk/tree/main/code-interpreter). BoxFab is an
independent project and is not affiliated with or endorsed by E2B.

## Pinned sources

- Code interpreter repo commit: `c49b78602c29e44d07e196604de515dfa6b12744` (`e2b-dev/code-interpreter` main,
  2026-11-03; template version 0.4.8)

The script checks that the checkout it is given is at the pinned commit.

## How the files are produced

`scripts/sync_upstream.py` writes these paths, which are never edited by hand:

| path | from |
|---|---|
| `template/` | upstream's `template/` (all but `package.json`, upstream's release tooling); the 7 Python scripts and `requirements-dev.txt` with the rewrites below; `CHANGELOG.md` kept as `CHANGELOG-E2B.md` |
| `template/README.md` | upstream's template guide, with the rewrites below and "Under the hood" (`overlay/template-readme/footer.md`) at the end |
| `README.md` | our introduction and steps 1-2 (`overlay/readme/header.md`), upstream's step 3 and "Customizing the sandbox template", renamed (upstream's docs and cookbook steps are left out), Under the hood and License (`overlay/readme/footer.md`) |
| `tests/` | upstream's end-to-end tests of the template's server (all but `package.json`, upstream's pnpm wrapper), with the SDK imports and `E2B_*` variables renamed; `tests/uv.lock` is this repository's own (`uv lock` with the BoxFab SDK) |
| `Makefile` | upstream's, unchanged |

`LICENSE` is upstream's Apache-2.0 text; the script checks it is unchanged. This repository's own
files: `overlay/`, `scripts/`, `.github/`, `tests/uv.lock`, this file and `CHANGELOG.md`.

## Workflows

| Upstream | Here |
|---|---|
| `pull_request.yml` (with `build_test_template.yml`, `code_interpreter_tests.yml`, `cleanup_build_template.yml`) | `pull_request.yml`: the same three steps in one workflow (build a throwaway template, run `tests/`, delete it with `@boxfab/cli`), with the `ci` environment's key, plus a check of E2B's own Code Interpreter SDKs (`.github/e2b-sdk-check/`) against the same template; also runnable by hand |
| `lint.yml` | `lint.yml`: ruff lint and format check of `template/` and `tests/`, without pnpm |
| `build_prod_template.yml`, `release.yml` | not taken over: the platform template is built by hand with the seed team's key |
| `validate-renovate-config.yaml`, `.github/scripts/` | not taken over (Renovate and Changesets are not used) |
| none | `ci.yml`: the template renders offline, and the generated files match `scripts/sync_upstream.py` |

Every rule asserts how often it matched. A final audit fails the sync if a changed script still
has an `e2b` SDK import, an `E2B_*` configuration variable or an E2B domain, or if text taken from
upstream into the READMEs still names E2B, its packages, variables or domains.

## Rewrites

| Change | Where | Why |
|---|---|---|
| SDK imports `e2b` → `boxfab` | the 7 Python scripts | built with the BoxFab SDK |
| `e2b==2.32.0` → `boxfab==0.1.0a3` | `template/requirements-dev.txt` | the build scripts' dependency |
| `E2B_TESTS_TEMPLATE`, `E2B_DEBUG_TEMPLATE` → `BOXFAB_TESTS_TEMPLATE`, `BOXFAB_DEBUG_TEMPLATE` | `build_ci.py`, `build_debug.py`, `debug_logs.py` | the SDKs read only `BOXFAB_*` variables |
| a "Modified by ContextFab, Inc." notice at the top | the 7 Python scripts, both READMEs | Apache-2.0 §4(b) |
| hostname `boxfab.local` (`hostname`, `/etc/hostname`, `/etc/hosts`), so the prompt reads `user@boxfab`; not in the Docker variant | `template.py` | BoxFab's runtime names every sandbox `e2b.local`; drop this step once the runtime sets the BoxFab name itself |
| package names, `E2B_API_KEY` → `BOXFAB_API_KEY`, the SDK install command, the link to E2B's template docs replaced by "as described below" | both READMEs | the BoxFab packages and configuration |
| "This is the script CI and releases run." → "BoxFab builds the platform template with it." | `template/README.md` | upstream's CI builds the template on release; here it is built by hand |
| custom template guide, step 3: `from .template import template` → `from template import template` | `template/README.md` | upstream's relative import fails when `build.py` is run as a script |
| custom template guide, step 6: `Sandbox` imported from the code interpreter SDK instead of the core SDK; step 1 installs both | `template/README.md` | `run_code` is in the code interpreter SDK; upstream's snippet fails |

## Deliberately unchanged

- **Names inside the sandbox:** the output formats `e2b/data` and `e2b/chart` (the server turns them
  into the `data` and `chart` fields the SDKs read), the chart extractor package `e2b-charts`, the
  socket directory `/run/e2b-jupyter`, the variables `E2B_LOCAL` and `E2B_TEST_VARIABLE` (the
  Docker variant only), and the Jupyter username in the server's messages. They are internal to
  the template; keeping them keeps the template identical to upstream's.
- **Protocol with the BoxFab runtime:** the `E2B-Traffic-Access-Token` header and the `e2b_` API key
  prefix.
- **Build-time sources:** the JavaScript kernel from `e2b-dev/ijavascript`, Node.js from
  NodeSource, Java from `download.java.net`, IJava 1.3.0, R packages from CRAN, Python packages at
  upstream's versions.
- **The README's structure and wording** apart from the rewrites; upstream's download badges,
  docs and cookbook steps are not taken over.
- **The template itself:** base image `python:3.13`, kernels, packages, server, systemd units,
  the alias `code-interpreter-v1` (`code-interpreter-dev` for the test build), 2 vCPU / 2 GiB.

## Updating

1. Put the new `e2b-dev/code-interpreter` commit in "Pinned sources" above.
2. `python3 scripts/sync_upstream.py` (or `--code-interpreter <checkout>`). A failing rule means
   upstream moved the text it targets: adjust the rule, not the generated files.
3. Review `git diff` (`template/CHANGELOG-E2B.md` lists upstream's changes), build
   `code-interpreter-dev` and run the SDKs' live tests against it
   (`BOXFAB_TESTS_TEMPLATE=code-interpreter-dev` in python-sdk and js-sdk), then update
   `CHANGELOG.md`.
