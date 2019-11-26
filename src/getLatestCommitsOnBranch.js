
/**
 * Gets all of the commits on a branch since the given point.
 * @param {String} owner The repo owner.
 * @param {String} repo The repo name.
 * @param {String} branchName The name of a branch.
 * @param {String} since A date time in YYYY-MM-DDTHH:mm:ssZ format.
 * @param {Function} listCommits A function that queries github for commits.
 */
const getLatestCommitsOnBranch = async (owner, repo, branchName, since, listCommits) => {
  const commitsResult = await listCommits({ owner, repo, sha: branchName, since: since })

  return commitsResult.data.map(c => c.commit.message)
}

module.exports = getLatestCommitsOnBranch
