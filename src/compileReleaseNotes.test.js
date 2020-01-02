/* eslint-env jest */
const compileReleaseNotes = require('./compileReleaseNotes')

const sortedCommitsWithEverything = {
  breakingChanges: ['--break extra parameter added to constructor'],
  features: ['--feature can now produce pdfs', '--feature works underwater'],
  fixes: ['--fix fixed a typo in the buffer allocation', '--fix removed the trailing zeroes'],
  docs: ['--docs fixed typos in heading 2'],
  misc: ['this will be misc', 'as will this']
}

const sortedCommitsWithFixesOnly = {
  breakingChanges: [],
  features: [],
  fixes: ['--fix fixed a typo in the buffer allocation', '--fix removed the trailing zeroes'],
  docs: [],
  misc: []
}

const sortedCommitsWithDocsOnly = {
  breakingChanges: [],
  features: [],
  fixes: [],
  docs: ['--docs fixed typos in heading 2'],
  misc: []
}

test('Compile release notes when all sections are included.', async () => {
  expect(compileReleaseNotes(sortedCommitsWithEverything)).toEqual('## Breaking Changes\n' +
    '* extra parameter added to constructor\n\n' +
    '## Features\n' +
    '* can now produce pdfs\n' +
    '* works underwater\n\n' +
    '## Fixes\n' +
    '* fixed a typo in the buffer allocation\n' +
    '* removed the trailing zeroes\n\n' +
    '## Documentation\n' +
    '* fixed typos in heading 2\n\n' +
    '## Miscellaneous\n' +
    '* this will be misc\n' +
    '* as will this\n\n'
  )
})

test('Compile release notes for just fixes.', async () => {
  expect(compileReleaseNotes(sortedCommitsWithFixesOnly)).toEqual('## Fixes\n' +
    '* fixed a typo in the buffer allocation\n' +
    '* removed the trailing zeroes\n\n'
  )
})

test('Compile release notes just docs.', async () => {
  expect(compileReleaseNotes(sortedCommitsWithDocsOnly)).toEqual('## Documentation\n' +
    '* fixed typos in heading 2\n\n'
  )
})
