/* eslint-env jest */
const getLatestReleaseOfBranch = require('./getLatestReleaseOfBranch')

const listReleases = () => ({
  data: [
    {
      tag_name: 'v0.0.3',
      target_commitish: 'lts_v2',
      name: 'v0.0.3',
      draft: false,
      prerelease: false,
      created_at: '2019-11-24T20:20:04Z',
      published_at: '2019-11-24T20:21:00Z',
      assets: [],
      body: 'Minor changes to test versioning of branches.'
    },
    {
      tag_name: 'v0.0.2',
      target_commitish: 'master',
      name: 'v0.0.2',
      draft: false,
      prerelease: true,
      created_at: '2019-11-24T14:22:55Z',
      published_at: '2019-11-24T14:26:39Z',
      assets: [],
      body: 'Testing the release process.'
    },
    {
      tag_name: 'v0.0.1',
      target_commitish: 'master',
      name: 'v0.0.1',
      draft: false,
      prerelease: true,
      created_at: '2019-11-23T09:15:02Z',
      published_at: '2019-11-23T09:18:48Z',
      assets: [],
      body: 'The first release.'
    }
  ]
})

test('Find the latest release on the branch.', async () => {
  await expect(getLatestReleaseOfBranch('boss', 'testRepo', 'master', listReleases)).resolves.toEqual({ tag_name: 'v0.0.2', published_at: '2019-11-24T14:26:39Z' })
  await expect(getLatestReleaseOfBranch('boss', 'testRepo', 'lts_v2', listReleases)).resolves.toEqual({ tag_name: 'v0.0.3', published_at: '2019-11-24T20:21:00Z' })
})

test('Find the latest release of an unknown branch.', async () => {
  await expect(getLatestReleaseOfBranch('boss', 'testRepo', 'madeup', listReleases)).resolves.toEqual(null)
})
