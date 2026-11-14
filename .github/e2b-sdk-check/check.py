"""E2B's own Python SDK (e2b-code-interpreter) against a BoxFab template.

Run by .github/workflows/pull_request.yml: E2B_DOMAIN, E2B_API_KEY and TEMPLATE come from the
workflow. Backs the README's statement that the E2B Code Interpreter SDKs work with BoxFab.
"""

import os

from e2b_code_interpreter import Sandbox

with Sandbox.create(template=os.environ["TEMPLATE"], timeout=300) as sandbox:
    sandbox.run_code("x = 1")
    assert sandbox.run_code("x += 1; x").text == "2", "state between calls"

    execution = sandbox.run_code("1 / 0")
    assert execution.error and execution.error.name == "ZeroDivisionError", "errors"

    execution = sandbox.run_code("import matplotlib.pyplot as plt\nplt.bar([1, 2], [3, 4])\nplt.show()")
    formats = list(execution.results[0].formats())
    assert "png" in formats and "chart" in formats, f"chart formats: {formats}"

    execution = sandbox.run_code("console.log(6 * 7)", language="javascript")
    assert execution.logs.stdout == ["42\n"], f"javascript: {execution.logs.stdout}"

    context = sandbox.create_code_context()
    sandbox.run_code("y = 5", context=context)
    assert sandbox.run_code("y * 3", context=context).text == "15", "contexts"

print("e2b-code-interpreter: OK")
