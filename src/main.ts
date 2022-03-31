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

  const today = +new Date()
  const ONE_WEEK = 1000 * 3600 * 24 * 7
  const PRsByWeek = ramdaPulls.reduce((acc, pr) => {
    const date = +new Date(pr.created_at)
    const weeksPast = Math.floor((today - date) / ONE_WEEK)
    acc[weeksPast] ??= 0
    acc[weeksPast]++
    return acc
  }, [] as number[])
  console.table(PRsByWeek.reduce((acc, count, index) => {
    if(count) acc.push({
      "Weeks Ago": index + 1,
      "Number of PRs": count,
    })
    return acc
  },[] as {"Weeks Ago": number, "Number of PRs": number}[]))
})()