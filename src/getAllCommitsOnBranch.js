
const getAllCommitsOnBranch = async (owner, repo, branchName, listCommits) => {
  const commitsResult = await listCommits({ owner, repo, sha: branchName })

  return commitsResult.data.map(c => c.commit.message)
}

module.exports = getAllCommitsOnBranch
