import { getRepositories } from "./connection"

export const getRepoNames = async (org: string): Promise<string[]> => {
  const repoList = await getRepositories(org);
  return repoList.map((r) => r.name)
}