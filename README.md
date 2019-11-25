# A Github Action for Preparing a Release

Plug this into a Github workflow wherever the branch being targetted is known.

The commits on the branch, since the last release, will be read and the release type and notes will be made available as outputs.

The https://github.com/karlhulme/github-action.analyse-issue-comment action can be used to determine which release should be prepared by analysing comments made in issues.

## Inputs

* **releaseBranch** - The name of the branch from which a release is being created.

## Outputs

* **canRelease** - A value of *yes* or *no* indicating if a release can be carried out.
* **releaseFailureReason** - If *canRelease* is equal to *no* then this property will contain a reason why.
* **releaseType** - The type of release.  One of the following values: *major*, *minor* or *patch*.
* **releaseNotes** - A formatted markdown block containing the commit comments since the last release.

## Example

```yml
name: Release

on:
  issue_comment:
    types: [created]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Prepare Release
        uses: karlhulme/github-action-prepare-release@master
        with:
          releaseBranch: master # or ${{ steps.step_id.outputs.releaseBranch }}
```

## Development

You must run `npm run build` to create the distribution file.  Do this before committing changes.
