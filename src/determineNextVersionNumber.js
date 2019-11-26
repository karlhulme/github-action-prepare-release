/**
 * Determines the new version number given an existing version
 * object and the release type.
 * @param {Object} version A version object comprising of major, minor and patch properties.
 * @param {Object} releaseType The type of release, either 'major', 'minor' and 'patch'.
 */
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
