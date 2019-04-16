export class Route {
  /**
   * @param apiRouteObject
   */
  constructor (apiRouteObject) {
    this.url = apiRouteObject.attributes.url
    this.parameters = apiRouteObject.attributes.parameters
  }

  /**
   * Prepare an url, replacing provided parameters
   *
   * @param parameters
   * @returns {string}
   */
  prepare (parameters) {
    let url = this.url

    for (let param in parameters) {
      if (parameters.hasOwnProperty(param) && this.hasParameter(param)) {
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
    return this.parameters.filter((checkParam) => {
      return parameter === checkParam
    }).length > 0
  }
}
