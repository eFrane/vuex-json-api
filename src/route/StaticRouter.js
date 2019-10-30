import { Router } from './Router'
import { Route } from './Route'

/**
 * Static router
 *
 * It may be desirable to not do an additional request
 * for getting the api routes and instead bake them into
 * the code. To this avail, the `StaticRouter` can be
 * initialized with a POJO of { id, url, parameters }
 * whereas parameters are parts of the url which can be replaced.
 *
 *
 */
export class StaticRouter extends Router {
  /**
   *
   * @param {Array} routes
   */
  constructor (routes) {
    super()

    for (const idx in routes) {
      const routeData = routes[idx]
      const route = Route.fromPOJO(routeData)
      this.addRoute(routeData.module, routeData.action, route)
    }
  }
}
