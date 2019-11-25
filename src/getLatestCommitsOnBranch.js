
const getLatestCommitsOnBranch = async (owner, repo, branchName, since, listCommits) => {
  const commitsResult = await listCommits({ owner, repo, sha: branchName, since: since })

  return commitsResult.data.map(c => c.commit.message)
}

module.exports = getLatestCommitsOnBranch
