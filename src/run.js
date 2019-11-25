/**
 * Runs the Github action and returns a keyed object with values for output.
 * @param {Object} props The input properties to the github action.
 */
const run = async ({ releaseBranch }) => {
  console.log(`We want to do a release ${releaseBranch}`)
  return {
    canRelease: 'no',
    releaseFailureReason: 'no code written yet!'
  }
}

module.exports = run
