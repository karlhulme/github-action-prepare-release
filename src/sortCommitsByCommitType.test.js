/* eslint-env jest */
const sortCommitsByCommitType = require('./sortCommitsByCommitType')

const commits = [
  '--fix fixed a typo in the buffer allocation',
  '--feature can now produce pdfs',
  '--feature works underwater',
  '--fix removed the trailing zeroes',
  '--break extra parameter added to constructor',
  '--ignore change to build process',
  '--docs fixed typos in heading 2'
]

test('Sort commits by commit type.', async () => {
  expect(sortCommitsByCommitType(commits)).toEqual({
    breakingChanges: ['--break extra parameter added to constructor'],
    features: ['--feature can now produce pdfs', '--feature works underwater'],
    fixes: ['--fix fixed a typo in the buffer allocation', '--fix removed the trailing zeroes'],
    docs: ['--docs fixed typos in heading 2']
  })
})
