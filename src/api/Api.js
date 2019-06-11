import axios from 'axios'
import { stringify } from 'qs'
import normalize from 'json-api-normalizer'

import {Route} from '../route/Route'

class Api {
  constructor () {
    this.baseUrl = ''

    this.preprocessingCallbacks = []

    this.defaultOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      paramsSerializer (params) {
        return stringify(params, { encodeValuesOnly: true, arrayFormat: 'brackets' })
      }
    }
  }

  /**
   *
   * @param {Array} callbacks
   */
  setPreprocessingCallbacks (callbacks) {
    if (callbacks.constructor !== Array
      || callbacks.reduce((carry, cb) => cb.constructor === Function && carry, true)) {
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

  async doRequest (method, url, params, data, options) {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Objekte_mit_gleichen_Eigenschaften_zusammenf%C3%BChren
    let config = Object.assign(options, this.defaultOptions, options)

    if (url instanceof Route) {
      url = url.prepare(params)
    }

    url = this.baseUrl + url

    // make cross domain requests if necessary
    let crossDomain = false
    if (this.baseUrl.length > 0 && this.baseUrl.indexOf('://') > 0) {
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
