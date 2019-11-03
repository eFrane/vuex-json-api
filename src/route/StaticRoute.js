import { Route } from './Route'

/**
 * Parses a static route data object into a `Route`
 *
 * ``` json
 * [
 *   {
 *     "module": "MyApiModule",
 *     "action": "GET",
 *     "url": "/api/my-api-module/{id}",
 *     "parameters": ["id"]
 *   }
 * ]
 * ```
 */
export class StaticRoute extends Route {
  constructor (routeData) {
    const module = routeData.module
    const action = routeData.action
    const url = routeData.url
    const parameters = routeData.parameters || []

    super(module, action, url, parameters)
  }
}
