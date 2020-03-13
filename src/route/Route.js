import { hasOwn } from '../shared/utils'

export class Route {
  /**
   * @param apiRouteObject
   */
  constructor (apiRouteObject) {
    this.url = apiRouteObject.attributes.url || ''
    this.parameters = apiRouteObject.attributes.parameters || {}
  }

  static fromPOJO ({ module, _, url, parameters }) {
    return new Route({
      type: module,
      attributes: {
        url,
        parameters
      }
    })
  }

  /**
   * Prepare an url, replacing provided parameters
   *
   * @param parameters
   * @returns {string}
   */
  prepare (parameters) {
    let url = this.url

    for (const param in parameters) {
      if (hasOwn(parameters, param) &&
        this.hasParameter(param)) {
        url = url.replace('{' + param + '}', parameters[param])
        delete parameters[param]
      }
    }

    return url
  }

  /**
   * Check if a parameter is allowed
   * @param parameter
   * @returns {boolean}
   */
  hasParameter (parameter) {
    return this.parameters.constructor === Array && this.parameters.filter((checkParam) => {
      return parameter === checkParam
    }).length > 0
  }

  isAbsolute () {
    return this.url.substring(0, 4) === 'http'
  }
}
