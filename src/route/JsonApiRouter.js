import { Api } from '../api/Api'
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
 *                 "url": "api/route",
 *                 "method": "list"
 *             }
 *        },
 *        {
 *            "type": "Route",
 *            "id": "api.route.get",
 *            "attributes": {
 *                "parameters": [
 *                    "id"
 *                ],
 *                "url": "api/route/{id}",
 *                "method": "get"
 *            }
 *        }
 *     ]
 * }
 * ```
 *
 * To initialize this router, simply `new` it with the desired fetch path,
 * e.g. `new JsonApiRouter('/api/route')`.
 */
export class JsonApiRouter extends Router {
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
            const route = data.route[idx]

            const module = route.type.toLower()
            const action = route.attributes.action.toLower()

            this.addRoute(module, action, new Route(route))
          }
        }
        console.timeEnd('router_setup')

        // returning self to make working with this in chained promises easier
        return this
      })
  }
}
