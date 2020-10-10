/* eslint-env jest */
const run = require('./run')

const listReleases = () => ({
  data: [
    {
      tag_name: 'v2.1.4',
      target_commitish: 'lts_v2',
      name: 'v2.1.4',
      draft: false,
      prerelease: false,
      created_at: '2019-11-24T20:20:04Z',
      published_at: '2019-11-24T20:21:00Z',
      assets: [],
      body: 'Minor changes to test versioning of branches.'
    },
    {
      tag_name: 'v3.6.7',
      target_commitish: 'master',
      name: 'v3.6.7',
      draft: false,
      prerelease: true,
      created_at: '2019-11-24T14:22:55Z',
      published_at: '2019-11-24T14:26:39Z',
      assets: [],
      body: 'Testing the release process.'
    }
  ]
})

const listCommits = () => ({
  data: [
    {
      commit: {
        message: '--fix Prevent crash on divide by zero'
      }
    }, {
      commit: {
        message: '--break Add red option'
      }
    }
  ]
})

test('Prepare a new release for master.', async () => {
  await expect(run({ branchName: 'master', owner: 'boss', repo: 'test', listCommits, listReleases })).resolves.toEqual({
    canRelease: 'yes',
    releaseVersion: '4.0.0',
    releaseType: 'major',
    releaseNotes: '## Breaking Changes\n* Add red option\n\n## Fixes\n* Prevent crash on divide by zero\n\n'
  })
})

test('Prepare a new release for an lts branch.', async () => {
  const listCommitsOnlyFixes = () => ({
    data: [
      {
        commit: {
          message: '--fix Prevent crash on divide by zero'
        }
      }
    ]
  })

  await expect(run({ branchName: 'lts_v2', owner: 'boss', repo: 'test', listCommits: listCommitsOnlyFixes, listReleases })).resolves.toEqual({
    canRelease: 'yes',
    releaseVersion: '2.1.5',
    releaseType: 'patch',
    releaseNotes: '## Fixes\n* Prevent crash on divide by zero\n\n'
  })
})

test('Prepare a first release for master.', async () => {
  await expect(run({ branchName: 'master', owner: 'boss', repo: 'test', listCommits, listReleases: () => ({ data: [] }) })).resolves.toEqual({
    canRelease: 'yes',
    releaseVersion: '1.0.0',
    releaseType: 'major',
    releaseNotes: '## Breaking Changes\n* Add red option\n\n## Fixes\n* Prevent crash on divide by zero\n\n'
  })
})

test('Prepare a first release for main.', async () => {
  await expect(run({ branchName: 'main', owner: 'boss', repo: 'test', listCommits, listReleases: () => ({ data: [] }) })).resolves.toEqual({
    canRelease: 'yes',
    releaseVersion: '1.0.0',
    releaseType: 'major',
    releaseNotes: '## Breaking Changes\n* Add red option\n\n## Fixes\n* Prevent crash on divide by zero\n\n'
  })
})

test('Reject an attempt to perform a release on an unamed branch.', async () => {
  await expect(run({ branchName: '', owner: 'boss', repo: 'test', listCommits, listReleases })).resolves.toEqual({
    canRelease: 'no',
    releaseFailureReason: 'Error: Branch name not supplied.'
  })
})

test('Reject an attempt to perform a breaking release on a non-main/non-master branch.', async () => {
  await expect(run({ branchName: 'lts_v2', owner: 'boss', repo: 'test', listCommits, listReleases })).resolves.toEqual({
    canRelease: 'no',
    releaseFailureReason: 'Error: Major releases can only be made on the main or master branches.'
  })
})
