import axios from 'axios'
import { stringify } from 'qs'
import normalize from 'json-api-normalizer'

import {Route} from '../route/Route'

class Api {
  constructor () {
    this.baseUrl = ''

    this.preprocessingCallbacks = []

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
      callbacks.reduce((carry, cb) => cb.constructor === Function && carry, true) === false) {
      throw new Error('You must pass an array of callbacks to this method')
    }

    this.preprocessingCallbacks = callbacks
  }

  /**
   *
   * @param {Function} callback
   */
  addPreprocessingCallback (callback) {
    if (callback.constructor !== Function) {
      throw new Error('You must pass a valid callback to this method')
    }

    this.preprocessingCallbacks.push(callback)
  }

  /**
   * Reset the response preprocessing to the default behaviour
   */
  resetPreprocessing () {
    this.preprocessingCallbacks = []
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
    if (!headers || headers.getOwnPropertyNames().length < 1) {
      headers = {}
    }

    this.headers = {
      ...this.headers,
      ...headers
    }
  }

  async doRequest (method, url, params, data, options) {
    let config = {
      ...options,
      ...this.defaultOptions,
      headers: this.headers
    }

    if (url instanceof Route) {
      url = url.prepare(params)
    }

    url = this.baseUrl + url

    // make cross domain requests if necessary
    let crossDomain = false
    if (url.length > 0 && url.indexOf('://') > 0) {
      crossDomain = true
    }

    return axios.create(config)
      .request({ method, url, params, data, crossDomain })
      .then(Promise.all(this.preprocessingCallbacks))
      .then((response) => {
        return {
          data: normalize(response.data),
          meta: response.data.meta
        }
      })
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
