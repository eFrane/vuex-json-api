import { hasOwn } from '../shared/utils'

/**
 * Basic router implementation for the ResourcefulApi.
 *
 * Automagically creating api bound modules builds on
 * an understanding of the available routes. To
 * easily instantiate a Store bound to an endpoint,
 * route information for that endpoint must be provided.
 *
 * Since every endpoint is implemented differently and
 * the choice where this route information comes from
 * should be left to the endpoint developer, this
 * library only assumes that route loading can be a
 * asynchronous process which eventually returns and
 * has a set of `Route` objects in `this.routes`,
 * keyed by their module and methods. To ensure the latter,
 * actually adding `Route`s should be done via `addRoute`.
 */
export class Router {
  constructor () {
    this.routes = {}
  }

  /**
   * @returns {Route[]}
   */
  getRoutes () {
    return this.routes
  }

  async updateRoutes () {
    return this
  }

  /**
   *
   * @param {Route} route
   */
  addRoute (route) {
    if (!hasOwn(this.routes, route.module)) {
      this.routes[route.module] = {}
    }

    this.routes[route.module][route.action] = route
  }
}
