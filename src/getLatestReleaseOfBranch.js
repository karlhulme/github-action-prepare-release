
const getLatestReleaseOfBranch = async (owner, repo, branchName, listReleases) => {
  const releasesResult = await listReleases({ owner, repo })

  const sortedMatchingReleases = releasesResult.data
    .filter(r => r.target_commitish === branchName)
    .sort((a, b) => b.published_at.localeCompare(a.published_at))

  if (sortedMatchingReleases.length > 0) {
    return {
      tag_name: sortedMatchingReleases[0].tag_name,
      published_at: sortedMatchingReleases[0].published_at
    }
  } else {
    return null
  }
}

module.exports = getLatestReleaseOfBranch
