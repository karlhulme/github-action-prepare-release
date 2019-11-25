/* eslint-env jest */
const determineNextVersionNumber = require('./determineNextVersionNumber')

test('Determine the next major version.', () => {
  expect(determineNextVersionNumber({ major: 1, minor: 2, patch: 3 }, 'major')).toEqual({ major: 2, minor: 0, patch: 0 })
})

test('Determine the next minor version.', () => {
  expect(determineNextVersionNumber({ major: 1, minor: 2, patch: 3 }, 'minor')).toEqual({ major: 1, minor: 3, patch: 0 })
})

test('Determine the next patch version.', () => {
  expect(determineNextVersionNumber({ major: 1, minor: 2, patch: 3 }, 'patch')).toEqual({ major: 1, minor: 2, patch: 4 })
})
