/* eslint-env jest */
const getMostImpactfulCommit = require('./getMostImpactfulCommit')

test('Interpret an empty set of commits as a patch.', async () => {
  expect(getMostImpactfulCommit([])).toEqual('patch')
})

test('Detect a break commit as the most impactful.', async () => {
  expect(getMostImpactfulCommit(['random --feat', '--fix', '--break here', '--docs more'])).toEqual('major')
})

test('Detect a feature commit as the most impactful.', async () => {
  expect(getMostImpactfulCommit(['random --feat', '--fix', '--ignore here', '--docs more'])).toEqual('minor')
})

test('Detect a fix commit as the most impactful.', async () => {
  expect(getMostImpactfulCommit(['--fix', 'here', 'more'])).toEqual('patch')
})

test('Detect a docs commit as the most impactful.', async () => {
  expect(getMostImpactfulCommit(['--docs', 'here', 'more'])).toEqual('patch')
})

test('Interpret a lack of commit flags as a patch.', async () => {
  expect(getMostImpactfulCommit(['here', 'more'])).toEqual('patch')
})
