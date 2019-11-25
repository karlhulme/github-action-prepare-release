/* eslint-env jest */
const getAllCommitsOnBranch = require('./getAllCommitsOnBranch')

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

test('Find all the commits on a given branch.', async () => {
  await expect(getAllCommitsOnBranch('master', 'boss', 'testRepo', listCommits)).resolves.toEqual(['Commit message 1.', 'Commit message 2.'])
})
