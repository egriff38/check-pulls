import { getAllPullRequests, getRepoNames } from "./modules/svc.github"
import { PullRequest } from "./modules/svc.github/types"
const ORG = "ramda";

(async () => {
  const ramdaPulls: PullRequest[] = []
  for(const repo of await getRepoNames(ORG)) {
    console.log(`Gathering PRs for ${repo}`)
    for await (const prChunk of getAllPullRequests(ORG, repo)) {
      ramdaPulls.push(...prChunk)
    }
  }
  console.log(`Ramda Org has ${ramdaPulls.length} PRs!`)
})()