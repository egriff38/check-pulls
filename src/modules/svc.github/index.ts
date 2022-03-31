import { AxiosError } from "axios";
import { getPullRequests, getRepositories } from "./connection"
import { PullRequest } from "./types";

export const getRepoNames = async (org: string): Promise<string[]> => {
  const repoList = await getRepositories(org);
  return repoList.map((r) => r.name)
}

export const getAllPullRequests = async function*(org: string, repo: string): AsyncGenerator<PullRequest[]> {
  let page = 1
  do {
    try {
      console.log(`getting page ${page}`)
      const pulls = await getPullRequests(org, repo, {page})
      yield pulls
      if(pulls.length < 100) return;
      page++
    } catch(e: any) {
      if(!e.isAxiosError) throw e;
      const {response} = e as AxiosError
      // If rate limited, wait a few seconds and try again
      if(response?.status === 429) await new Promise((r)=> setTimeout(r, 2500));
      else throw e
    }
  } while(true)
}