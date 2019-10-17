import axios from 'axios'
import { stringify } from 'qs'
import { validateCallbackFn } from '../helpers/validateCallbackFn'

class Api {
  constructor () {
    this.baseUrl = ''

    this.preprocessingCallbacks = []
    this.errorCallbacks = []

    this.defaultOptions = {
      paramsSerializer (params) {
        return stringify(params, { encodeValuesOnly: true, arrayFormat: 'brackets' })
      }
    }

    this.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    }
  }

  /**
   *
   * @param {Array} callbacks
   */
  setPreprocessingCallbacks (callbacks) {
    if (typeof callbacks === 'undefined' || callbacks.constructor !== Array ||
      callbacks.reduce((carry, cb) => validateCallbackFn(cb) && carry, true) === false) {
      throw new Error('You must pass an array of callbacks to this method')
    }

    this.preprocessingCallbacks = callbacks
  }
  /**
   *
   * @param {Array} callbacks
   */
  setErrorCallbacks (callbacks) {
    if (typeof callbacks === 'undefined' || callbacks.constructor !== Array ||
      callbacks.reduce((carry, cb) => validateCallbackFn(cb) && carry, true) === false) {
      throw new Error('You must pass an array of callbacks to this method')
    }

    this.errorCallbacks = callbacks
  }

  /**
   *
   * @param {Function} callback
   */
  addPreprocessingCallback (callback) {
    if (validateCallbackFn(callback)) {
      throw new Error('You must pass a valid callback to this method')
    }

    this.preprocessingCallbacks.push(callback)
  }

  /**
   *
   * @param {Function} callback
   */
  addErrorCallback (callback) {
    if (validateCallbackFn(callback)) {
      throw new Error('You must pass a valid callback to this method')
    }

    this.errorCallbacks.push(callback)
  }

  /**
   * Reset the response preprocessing to the default behaviour
   */
  resetPreprocessing () {
    this.preprocessingCallbacks = []
  }

  /**
   * Reset the response error to the default behaviour
   */
  resetErrorCallbacks () {
    this.errorCallbacks = []
  }

  /**
   *
   * @param {Object} headers
   */
  addHeaders (headers) {
    if (headers.constructor !== Object) {
      throw new Error('You must pass an object to this method')
    }

    // make sure there is a spreadable object in headers
    if (!headers || Object.getOwnPropertyNames(headers).length < 1) {
      headers = {}
    }

    this.headers = Object.assign(this.headers, headers)
  }

  async doRequest (method, url, params, data, options) {
    let config = Object.assign(options, this.defaultOptions)
    config['headers'] = this.headers

    if (url.indexOf('://') <= 0) {
      url = this.baseUrl + url
    }

    // make cross domain requests if necessary
    let crossDomain = false
    if (url.length > 0 && url.indexOf('://') > 0) {
      crossDomain = true
    }

    return axios.create(config)
      .request({ method, url, params, data, crossDomain })
      .then(
        async response => {
          for (let i = 0; i < this.preprocessingCallbacks.length; i++) {
            await this.preprocessingCallbacks[i](response)
          }

          return response
        }
      ).catch(
        async errorResponse => {
          for (let i = 0; i < this.errorCallbacks.length; i++) {
            await this.errorCallbacks[i](errorResponse)
          }

          return errorResponse
        }
      )
  }

  get (url, params = null, options = {}) {
    return this.doRequest('get', url, params, null, options)
  }

  post (url, params = null, data = null, options = {}) {
    return this.doRequest('post', url, params, data, options)
  }

  put (url, params = null, data = null, options = {}) {
    return this.doRequest('put', url, params, data, options)
  }

  patch (url, params = null, data = null, options = {}) {
    return this.doRequest('patch', url, params, data, options)
  }

  delete (url, params = null, data = null, options = {}) {
    return this.doRequest('delete', url, params, data, options)
  }

  setBaseUrl (baseUrl) {
    this.baseUrl = baseUrl
  }
}

export { Api }
