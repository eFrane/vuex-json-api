export class Route {
  /**
   *
   * @param {String} module
   * @param {String} action
   * @param {String} url
   * @param {Array} parameters
   */
  constructor (module, action, url, parameters) {
    this.module = module
    this.action = action.toLowerCase()
    this.url = url
    this.parameters = parameters
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
      if (Object.prototype.hasOwnProperty.call(parameters, param) &&
        this.hasParameter(param)) {
        url = url.replace('{' + param + '}', parameters[param])
        delete parameters[param]
      }
    }

    return url
  }

  /**
   * Check if a parameter is allowed
   *
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
