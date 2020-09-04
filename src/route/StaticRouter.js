import { Router } from './Router'
import { StaticRoute } from './StaticRoute'

/**
 * Static router
 *
 * It may be desirable to not do an additional request
 * for getting the api routes and instead bake them into
 * the code. To this avail, the `StaticRouter` can be
 * initialized with a POJO of { id, url, parameters }
 * whereas parameters are parts of the url which can be replaced.
 *
 * When using the StaticRouter it is not necessary to call
 * `updateRoutes` before passing the Router onwards.
 *
 * @class StaticRouter
 */
export class StaticRouter extends Router {
  /**
   * Requires an array of route data objects.
   *
   * @see StaticRoute
   * @param {Array} routes
   */
  constructor (routes) {
    super()

    for (const idx in routes) {
      const routeData = routes[idx]
      this.addRoute(new StaticRoute(routeData))
    }
  }
}
