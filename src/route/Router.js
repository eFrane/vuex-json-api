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
   * @param {Route} route
   */
  addRoute (route) {
    if (!Object.prototype.hasOwnProperty.call(this.routes, route.module)) {
      this.routes[route.module] = {}
    }

    this.routes[route.module][route.action] = route
  }
}
