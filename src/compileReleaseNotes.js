/**
 * Remove any commit flags and newlines from the string.
 * @param {String} s A string.
 */
const clean = s => {
  return s
    .replace(/--break/g, '')
    .replace(/--feature/g, '')
    .replace(/--feat/g, '')
    .replace(/--fix/g, '')
    .replace(/--docs/g, '')
    .replace(/[\n]/g, ' ')
    .replace(/[\r]/g, ' ')
    .trim()
}

/**
 * Compiles a markdown formatted text string combining all the
 * commit notes, sorted by commit flag.
 * @param {Array} sortedCommits An array of strings containing commit flags.
 */
const compileReleaseNotes = (sortedCommits) => {
  let result = ''

  if (sortedCommits.breakingChanges.length > 0) {
    result += '## Breaking Changes\n'
    result += sortedCommits.breakingChanges.map(s => `* ${clean(s)}\n`).join('')
    result += '\n'
  }

  if (sortedCommits.features.length > 0) {
    result += '## Features\n'
    result += sortedCommits.features.map(s => `* ${clean(s)}\n`).join('')
    result += '\n'
  }

  if (sortedCommits.fixes.length > 0) {
    result += '## Fixes\n'
    result += sortedCommits.fixes.map(s => `* ${clean(s)}\n`).join('')
    result += '\n'
  }

  if (sortedCommits.docs.length > 0) {
    result += '## Documentation\n'
    result += sortedCommits.docs.map(s => `* ${clean(s)}\n`).join('')
    result += '\n'
  }

  if (sortedCommits.misc.length > 0) {
    result += '## Miscellaneous\n'
    result += sortedCommits.misc.map(s => `* ${clean(s)}\n`).join('')
    result += '\n'
  }

  return result
}

module.exports = compileReleaseNotes
