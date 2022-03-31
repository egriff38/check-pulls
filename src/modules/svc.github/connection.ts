import axios from 'axios';

const svc = axios.create({
  baseURL: "https://api.github.com",
})

export const getZen = async () => {
  const {data} = await svc.get<string>("/zen")
  return data;
} 