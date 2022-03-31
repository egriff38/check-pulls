import { getAllPullRequests, getRepoNames } from "./modules/svc.github"
import { PullRequest } from "./modules/svc.github/types"

(async () => {
  // const ramdaRepos = await getRepoNames("Ramda")
  const ramdaPulls: PullRequest[] = []
  for await (const prChunk of getAllPullRequests("ramda", "ramda")) {
    ramdaPulls.push(...prChunk)
  }
  console.log(`Ramda has ${ramdaPulls.length} PRs!`)
})()