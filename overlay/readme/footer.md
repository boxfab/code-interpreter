
## Under the hood

BoxFab sandboxes are [Firecracker](https://firecracker-microvm.github.io/) microVMs, run on the
open-source [E2B](https://github.com/e2b-dev/infra) sandbox infrastructure. This repository is
derived from the open-source [E2B Code Interpreter](https://github.com/e2b-dev/code-interpreter)
repository; the template is generated from it by `scripts/sync_upstream.py` and built with the
BoxFab SDK. [UPSTREAM.md](UPSTREAM.md) lists every change.

**Using the E2B Code Interpreter SDKs.** BoxFab serves the same API and provides the
`code-interpreter-v1` template, so the E2B Code Interpreter SDKs work with it as well. Set both
variables, the domain first:

```bash
export E2B_DOMAIN=us-west.boxfab.dev
export E2B_API_KEY="<your BoxFab API key>"
```

Without `E2B_DOMAIN`, the E2B SDKs send requests, including the key, to E2B's own service.

Tested against BoxFab with `e2b-code-interpreter` 2.11.6 (Python) and `@e2b/code-interpreter` 2.9.0
(JavaScript).

## License

Apache-2.0, as the E2B Code Interpreter repository it is derived from; see [LICENSE](LICENSE). The
chart extractor in `template/charts/` is MIT-licensed, see `template/charts/LICENSE`.

BoxFab is a product of ContextFab, Inc.
