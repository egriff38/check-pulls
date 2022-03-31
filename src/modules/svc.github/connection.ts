import axios from 'axios';
import { Repository, PullRequest } from './types';
if(!process.env.GITHUB_ACCESS_KEY) {
  console.error("Access Key Missing!")
  process.exit(1)
}
const svc = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Authorization": `token ${process.env.GITHUB_ACCESS_KEY}`
  }
})

export const getRepositories = async (org: string) => {
  const {data} = await svc.get<Repository[]>(`/orgs/${org}/repos`)
  return data
}
export const getPullRequests = async (org: string, repo: string, {state = "all", page=1}) => {
  const {data} = await svc.get<PullRequest[]>(`/repos/${org}/${repo}/pulls`, {
    params: {
      state,
      page,
      per_page: 100,
    }
  })
  return data;
}
export const getZen = async () => {
  const {data} = await svc.get<string>("/zen")
  return data;
} 
