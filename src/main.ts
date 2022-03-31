import { getZen } from "./modules/svc.github/connection"

(async () => {
  const zen = await getZen()
  console.log(zen)
})()