import { getRepoNames } from "./modules/svc.github"

(async () => {
  const ramdaRepos = await getRepoNames("Ramda")
  console.log(`Here are the Repos of the Ramda org:\n${ramdaRepos.join("\n")}`)
})()