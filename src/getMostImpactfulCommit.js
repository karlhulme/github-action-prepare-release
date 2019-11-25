/**
 * Returns a value of 'major', 'minor' or 'patch' to indicate the most
 * impactful commit.
 * @param {Array} commits An array of commits.
 */
const getMostImpactfulCommit = commits => {
  let foundBreak = false
  let foundFeature = false

  for (const commit of commits) {
    if (commit.includes('--break')) {
      foundBreak = true
    } else if (commit.includes('--feat')) {
      foundFeature = true
    }
  }

  if (foundBreak) {
    return 'major'
  } else if (foundFeature) {
    return 'minor'
  } else {
    return 'patch'
  }
}

module.exports = getMostImpactfulCommit
