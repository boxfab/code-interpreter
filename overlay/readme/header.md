# BoxFab Code Interpreter

> [!NOTE]
> The `@boxfab/code-interpreter` and `boxfab-code-interpreter` SDK sources live in
> [boxfab/js-sdk](https://github.com/boxfab/js-sdk/tree/main/code-interpreter) and
> [boxfab/python-sdk](https://github.com/boxfab/python-sdk/tree/main/code-interpreter). This
> repository keeps the sandbox template, which bundles the chart data extractor
> (`template/charts`).

## What is BoxFab?
[BoxFab](https://boxfab.io) runs AI-generated code in secure isolated sandboxes in the cloud. To
start and control sandboxes, use the [JavaScript SDK](https://www.npmjs.com/package/@boxfab/code-interpreter)
or the [Python SDK](https://pypi.org/project/boxfab-code-interpreter/).

## Run your first Sandbox

### 1. Install SDK

JavaScript / TypeScript
```
npm i @boxfab/code-interpreter
```

Python
```
pip install boxfab-code-interpreter
```

### 2. Get your BoxFab API key
1. Get your API key in the [BoxFab dashboard](https://dashboard.us-west.boxfab.io).
2. Set environment variable with your API key.
```
export BOXFAB_API_KEY=e2b_***
```

