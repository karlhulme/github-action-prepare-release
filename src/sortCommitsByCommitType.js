/**
 * Returns an object where each property is an array
 * of commit comments that have the matching commit flag.
 * @param {Array} commits An array of commit comments.
 */
const sortCommitsByCommitType = commits => {
  const breakingChanges = []
  const features = []
  const fixes = []
  const docs = []
  const misc = []

  for (const commit of commits) {
    if (commit.includes('--break')) {
      breakingChanges.push(commit)
    } else if (commit.includes('--feat')) {
      features.push(commit)
    } else if (commit.includes('--docs')) {
      docs.push(commit)
    } else if (commit.includes('--fix')) {
      fixes.push(commit)
    } else {
      misc.push(commit)
    }
  }

  return {
    breakingChanges,
    features,
    fixes,
    docs,
    misc
  }
}

module.exports = sortCommitsByCommitType
