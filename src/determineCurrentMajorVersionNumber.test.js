/* eslint-env jest */
const determineCurrentMajorVersionNumber = require('./determineCurrentMajorVersionNumber')

test('Determine the current major version.', () => {
  expect(determineCurrentMajorVersionNumber('v1.2.3', 'major')).toEqual(1)
})

test('Fail to determine the current major version from an invalid tag.', () => {
  expect(() => determineCurrentMajorVersionNumber('not_a_version', 'major')).toThrow(/not_a_version/)
  expect(() => determineCurrentMajorVersionNumber('1.2.3', 'major')).toThrow(/1.2.3/)
  expect(() => determineCurrentMajorVersionNumber('v1.2.3-alpha', 'major')).toThrow(/v1.2.3-alpha/)
})
