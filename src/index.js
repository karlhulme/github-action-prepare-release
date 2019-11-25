const core = require('@actions/core')
const run = require('./run')

/**
 * The entry point to the Github action.
 */
const entryPoint = async () => {
  const input = {
    releaseBranch: core.getInput('releaseBranch')
  }

  console.log(`Inputs\n${JSON.stringify(input, null, 2)}\n`)

  const output = await run(input)

  console.log(`Output\n${JSON.stringify(output, null, 2)}\n`)

  for (const propName in output) {
    core.setOutput(propName, output[propName])
  }
}

entryPoint()
