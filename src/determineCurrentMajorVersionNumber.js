const determineCurrentMajorVersionNumber = (branchLatestTagName) => {
  if (!/^[v][0-9]+[.][0-9]+[.][0-9]+$/.test(branchLatestTagName)) {
    throw new Error(`The latest tag_name of the branch '${branchLatestTagName}' is not a valid semver version number in the form 'v0.0.0'.`)
  }

  return Number(branchLatestTagName.substring(1, branchLatestTagName.indexOf('.')))
}

module.exports = determineCurrentMajorVersionNumber
