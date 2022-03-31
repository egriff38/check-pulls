import axios from 'axios';
import { Repository } from './types';

const svc = axios.create({
  baseURL: "https://api.github.com",
})

export const getRepositories = async (org: string) => {
  const {data} = await svc.get<Repository[]>(`/orgs/${org}/repos`)
  return data
}

export const getZen = async () => {
  const {data} = await svc.get<string>("/zen")
  return data;
} 
