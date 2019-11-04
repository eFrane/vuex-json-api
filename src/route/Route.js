export class Route {
  /**
   *
   * @param {String} module
   * @param {String} action
   * @param {String} url
   * @param {Array} parameters
   */
  constructor (module, action, url, parameters) {
    if (typeof module !== 'string') {
      throw new Error('Module name must be string')
    }

    if (!this.isValidAction(action)) {
      throw new Error('Action must be valid resourceful verb')
    }

    if (typeof url !== 'string') {
      throw new Error('URL must be string')
    }

    if (parameters.constructor !== Array) {
      throw new Error('Parameters must be array')
    }

    this.module = module
    this.action = action.toLowerCase()
    this.url = url
    this.parameters = parameters
  }

  get supportedResourcefulVerbs () {
    return [
      'list',
      'get',
      'create',
      'replace',
      'update',
      'delete'
    ]
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
    return this.parameters.filter((checkParam) => {
      return parameter === checkParam
    }).length > 0
  }

  isAbsolute () {
    return this.url.substring(0, 4) === 'http'
  }

  /**
   *
   * @param {String} action
   */
  isValidAction (action) {
    return typeof action === 'string' && this.supportedResourcefulVerbs.indexOf(action.toLowerCase()) > -1
  }
}
