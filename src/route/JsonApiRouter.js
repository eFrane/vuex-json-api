import { ResourcefulApi } from '../api/ResourcefulApi'
import { Router } from './Router'
import { JsonApiRoute } from './JsonApiRoute'
import { hasOwn } from '../shared/utils'

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
 *             "type": "VuexJsonApiRoute",
 *             "id": 1,
 *             "attributes": {
 *                 "parameters": [],
 *                 "url": "api/route",
 *                 "method": "list",
 *                 "module": "route"
 *             }
 *        },
 *        {
 *            "type": "VuexJsonApiRoute",
 *            "id": 2,
 *            "attributes": {
 *                "parameters": [
 *                    "id"
 *                ],
 *                "url": "api/route/{id}",
 *                "method": "get",
 *                 "module": "route"
 *            }
 *        }
 *     ]
 * }
 * ```
 *
 * To initialize this router, simply `new` it with the desired fetch path,
 * e.g. `new JsonApiRouter('/api/route')`.
 *
 * @class JsonApiRouter
 */
export class JsonApiRouter extends Router {
  /**
   *
   * @param {String} baseUrl
   * @param {String} fetchPath
   */
  constructor (baseUrl, fetchPath) {
    super()

    this.baseUrl = baseUrl
    this.fetchPath = fetchPath
  }

  /**
   * Update routes
   *
   * @returns {*}
   */
  async updateRoutes () {
    const api = new ResourcefulApi()
    api.setBaseUrl(this.baseUrl)

    return api.get(this.fetchPath)
      .then(({ data }) => {
        this.parseApiResult(data)

        // returning self to make working with this in chained promises easier
        return this
      })
  }

  parseApiResult (data) {
    for (const idx in data.vuexjsonapiroute) {
      if (hasOwn(data.vuexjsonapiroute, idx)) {
        const routeResource = data.vuexjsonapiroute[idx]

        this.addRoute(new JsonApiRoute(routeResource))
      }
    }
  }
}
