const determineNextVersionNumber = (version, releaseType) => {
  if (releaseType === 'major') {
    return { major: version.major + 1, minor: 0, patch: 0 }
  } else if (releaseType === 'minor') {
    return { major: version.major, minor: version.minor + 1, patch: 0 }
  } else {
    return { major: version.major, minor: version.minor, patch: version.patch + 1 }
  }
}

module.exports = determineNextVersionNumber
