import { Api } from '../Api'
import { Router } from './Router'
import { Route } from './Route'

/**
 * A simple router implementation querying a
 */
export class SimpleRouter extends Router {
  constructor (fetchPath) {
    super()
    this.fetchPath = fetchPath
  }

  /**
   * Update routes
   *
   * @returns {*}
   */
  async updateRoutes () {
    let api = new Api()
    return api.get(this.fetchPath)
      .then(({ data }) => {
        console.time('router_setup')
        for (let idx in data.route) {
          if (data.route.hasOwnProperty(idx)) {
            let route = data.route[idx]

            let nameComponents = route.id.split('.')

            let routeIdentifier = nameComponents[1]
            let action = nameComponents[2]

            if (!this.routes.hasOwnProperty(routeIdentifier)) {
              this.routes[routeIdentifier] = {}
            }

            this.routes[routeIdentifier][action] = new Route(route)
          }
        }
        console.timeEnd('router_setup')

        // returning self to make working with this in chained promises easier
        return this
      })
  }
}
