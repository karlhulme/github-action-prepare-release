const getLatestReleaseOfBranch = require('./getLatestReleaseOfBranch')
const getLatestCommitsOnBranch = require('./getLatestCommitsOnBranch')
const getMostImpactfulCommit = require('./getMostImpactfulCommit')
const determineBranchVersionNumber = require('./determineBranchVersionNumber')
const determineNextVersionNumber = require('./determineNextVersionNumber')
const sortCommitsByCommitType = require('./sortCommitsByCommitType')
const compileReleaseNotes = require('./compileReleaseNotes')

/**
 * Runs the Github action and returns a keyed object with values for output.
 * @param {Object} props The input properties to the github action.
 */
const run = async ({ branchName, owner, repo, listCommits, listReleases }) => {
  try {
    const latestReleaseOfBranch = await getLatestReleaseOfBranch(owner, repo, branchName, listReleases)

    const currentVersion = latestReleaseOfBranch
      ? determineBranchVersionNumber(latestReleaseOfBranch.tag_name)
      : { major: 0, minor: 0, patch: 0 }

    const commits = latestReleaseOfBranch
      ? await getLatestCommitsOnBranch(owner, repo, branchName, latestReleaseOfBranch.published_at, listCommits)
      : await getLatestCommitsOnBranch(owner, repo, branchName, null, listCommits)

    const releaseType = getMostImpactfulCommit(commits)

    const nextVersion = determineNextVersionNumber(currentVersion, releaseType)

    if (releaseType === 'major' && branchName !== 'master') {
      throw new Error('Major releases can only be made on the master branch.')
    }

    const sortedCommits = sortCommitsByCommitType(commits)
    const releaseNotes = compileReleaseNotes(sortedCommits)

    return {
      canRelease: 'yes',
      releaseVersion: `${nextVersion.major}.${nextVersion.minor}.${nextVersion.patch}`,
      releaseType,
      releaseNotes
    }
  } catch (err) {
    return {
      canRelease: 'no',
      releaseFailureReason: err.toString()
    }
  }
}

module.exports = run
