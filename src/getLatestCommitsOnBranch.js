/**
 * Gets all of the commits on a branch since the given point.
 * @param {String} owner The repo owner.
 * @param {String} repo The repo name.
 * @param {String} branchName The name of a branch.
 * @param {String} since A date time in YYYY-MM-DDTHH:mm:ssZ format.
 * @param {Function} listCommits A function that queries github for commits.
 */
const getLatestCommitsOnBranch = async (owner, repo, branchName, since, listCommits) => {
  let more = true
  let pageNo = 1
  const commitsResultData = []

  while (more) {
    const listCommitsParams = { owner, repo, sha: branchName, per_page: 100, page: pageNo }

    if (since) {
      listCommitsParams.since = since
    }

    const commitsResult = await listCommits(listCommitsParams)
    console.log(commitsResult.data)
    commitsResultData.push(...commitsResult.data)
    more = commitsResult.data.length === 100
    pageNo++
  }

  return commitsResultData.map(c => c.commit.message)
}

module.exports = getLatestCommitsOnBranch
