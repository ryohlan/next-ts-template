import Routes from 'next-routes'
import Patterns from './pattern.json'

const routes = new Routes()

for (let pattern of Patterns.patterns) {
  routes.add(pattern)
}

export default routes
export const Link = routes.Link
export const Router = routes.Router
