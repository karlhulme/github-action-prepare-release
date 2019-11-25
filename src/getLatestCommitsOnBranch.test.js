/* eslint-env jest */
const getLatestCommitsOnBranch = require('./getLatestCommitsOnBranch')

const listCommits = () => ({
  data: [
    {
      commit: {
        message: 'Commit message 1.'
      }
    }, {
      commit: {
        message: 'Commit message 2.'
      }
    }
  ]
})

test('Find the latest commits on a given branch.', async () => {
  await expect(getLatestCommitsOnBranch('master', 'boss', 'testRepo', '2000-01-01T12:00:00Z', listCommits)).resolves.toEqual(['Commit message 1.', 'Commit message 2.'])
})
