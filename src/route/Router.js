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
 * library only assumes that route loading is usually an
 * asynchronous process which eventually returns and
 * has a set of keyed-by-name `Route` objects in
 * `this.routes`.
 */
export class Router {
  constructor () {
    this.routes = {}
  }

  getRoutes () {
    return this.routes
  }

  async updateRoutes () {
    return this
  }

  /**
   *
   * @param {String} module
   * @param {String} action
   * @param {Route} route
   */
  addRoute (module, action, route) {
    if (!hasOwn(this.routes, module)) {
      this.routes[module] = {}
    }

    this.routes[module][action] = route
  }
}
