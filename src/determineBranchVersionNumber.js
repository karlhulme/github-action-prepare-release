const determineBranchVersionNumber = branchTagName => {
  if (!/^[v][0-9]+[.][0-9]+[.][0-9]+$/.test(branchTagName)) {
    throw new Error(`The tag name '${branchTagName}' is not a valid semver version number in the form 'v0.0.0'.`)
  }

  const major = Number(branchTagName.substring(1, branchTagName.indexOf('.')))
  const minor = Number(branchTagName.substring(branchTagName.indexOf('.') + 1, branchTagName.lastIndexOf('.')))
  const patch = Number(branchTagName.substring(branchTagName.lastIndexOf('.') + 1), branchTagName.indexOf('-'))

  return {
    major,
    minor,
    patch
  }
}

module.exports = determineBranchVersionNumber
