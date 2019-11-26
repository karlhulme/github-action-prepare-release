/**
 * Returns the most recently published release on a branch.
 * @param {String} owner The repo owner
 * @param {String} repo The name of a repo.
 * @param {String} branchName The name of a branch.
 * @param {Function} listReleases A function that queries github for releases.
 */
const getLatestReleaseOfBranch = async (owner, repo, branchName, listReleases) => {
  let more = true
  let pageNo = 0
  const releasesResultData = []

  while (more) {
    const releasesResult = await listReleases({ owner, repo, per_page: 100, page: pageNo })
    releasesResultData.push(...releasesResult.data)
    more = releasesResult.data.length === 100
    pageNo++
  }

  const sortedMatchingReleases = releasesResultData
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
