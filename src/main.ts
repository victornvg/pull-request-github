import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('GITHUB_TOKEN')
    const pullRequestNumber = core.getInput('PullRequestNumber')
    const octokit = github.getOctokit(token)
    const {data: pullRequest} = await octokit.rest.pulls.get({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      pull_number: parseInt(pullRequestNumber)
    })
    if (!pullRequest) {
      core.info('Cannot find the pull request')
      return
    }
    core.setOutput('pullRequestState', pullRequest.state)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
