import { Route } from './Route'
import { Api } from './Api'

export class Router {
  constructor () {
    this.routes = {}
  }

  /**
   * Update routes
   *
   * @returns {*}
   */
  updateRoutes () {
    let api = new Api()
    return api.get('route?filter[group]=api')
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

  getRoutes () {
    return this.routes
  }
}
