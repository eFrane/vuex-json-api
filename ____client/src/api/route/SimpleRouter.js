import { Api } from '../Api'
import { Router } from './Router'
import { Route } from './Route'

/**
 * A simple router implementation querying a json:api endpoint which delivers all
 * necessary route information
 *
 * The endpoint must return a list of Route objects:
 *
 * ```json
 * {
 *     "data": [
 *         {
 *             "type": "Route",
 *             "id": "api.route.list",
 *             "attributes": {
 *                 "parameters": [],
 *                 "url": "api/route"
 *             }
 *        },
 *        {
 *            "type": "Route",
 *            "id": "api.route.get",
 *            "attributes": {
 *                "parameters": [
 *                    "id"
 *                ],
 *                "url": "api/route/{id}"
 *            }
 *        }
 *     ]
 * }
 * ```
 *
 * To initialize this router, simply `new` it with the desired fetch path,
 * e.g. `new SimpleRouter('/api/route')`.
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
