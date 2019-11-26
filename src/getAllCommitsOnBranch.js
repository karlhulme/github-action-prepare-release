/**
 * Gets all of the commits on a branch.
 * @param {String} owner The repo owner.
 * @param {String} repo The repo name.
 * @param {String} branchName The name of a branch.
 * @param {Function} listCommits A function that queries github for commits.
 */
const getAllCommitsOnBranch = async (owner, repo, branchName, listCommits) => {
  const commitsResult = await listCommits({ owner, repo, sha: branchName })

  return commitsResult.data.map(c => c.commit.message)
}

module.exports = getAllCommitsOnBranch
