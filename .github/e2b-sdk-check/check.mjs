// E2B's own JS SDK (@e2b/code-interpreter) against a BoxFab template.
//
// Run by .github/workflows/pull_request.yml: E2B_DOMAIN, E2B_API_KEY and TEMPLATE come from the
// workflow. Backs the README's statement that the E2B Code Interpreter SDKs work with BoxFab.

import assert from 'node:assert/strict'
import { Sandbox } from '@e2b/code-interpreter'

const sandbox = await Sandbox.create(process.env.TEMPLATE, { timeoutMs: 300_000 })
try {
  await sandbox.runCode('x = 1')
  assert.equal((await sandbox.runCode('x += 1; x')).text, '2', 'state between calls')

  const error = (await sandbox.runCode('1 / 0')).error
  assert.equal(error?.name, 'ZeroDivisionError', 'errors')

  const chart = await sandbox.runCode('import matplotlib.pyplot as plt\nplt.bar([1, 2], [3, 4])\nplt.show()')
  assert.ok(chart.results[0]?.png, 'chart as PNG')

  const js = await sandbox.runCode('console.log(6 * 7)', { language: 'javascript' })
  assert.deepEqual(js.logs.stdout, ['42\n'], 'javascript')

  const context = await sandbox.createCodeContext()
  await sandbox.runCode('y = 5', { context })
  assert.equal((await sandbox.runCode('y * 3', { context })).text, '15', 'contexts')
} finally {
  await sandbox.kill()
}
console.log('@e2b/code-interpreter: OK')
