/* eslint-env jest */
const determineBranchVersionNumber = require('./determineBranchVersionNumber')

test('Determine the version from a tag name.', () => {
  expect(determineBranchVersionNumber('v1.2.3')).toEqual({ major: 1, minor: 2, patch: 3 })
})

test('Fail to determine the version from an invalid tag name.', () => {
  expect(() => determineBranchVersionNumber('invalid')).toThrow(/invalid/)
  expect(() => determineBranchVersionNumber('1.2.3')).toThrow(/1.2.3/)
  expect(() => determineBranchVersionNumber('v1.2.')).toThrow(/v1.2./)
  expect(() => determineBranchVersionNumber('v1.2.3.')).toThrow(/v1.2.3./)
  expect(() => determineBranchVersionNumber('v1.2.3-alpha')).toThrow(/v1.2.3-alpha/)
})
