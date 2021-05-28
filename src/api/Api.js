import { ApiError } from '../errors/ApiError'
import { stringify } from 'qs'
import { isAbsoluteUri, validateCallbackFn } from '../shared/utils'

/**
 * Some headers cannot be reconfigured to stop users from
 * accidental errors.
 *
 * @type {string[]}
 */
const READ_ONLY_HEADERS = [
  'Accept',
  'Content-type'
]

/**
 * Wrapper around json:api 1.0 requests, sets content type and other defaults.
 *
 * @class Api
 */
export class Api {
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
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }

  /**
   *
   * @param {Function[]} callbacks
   */
  setPreprocessingCallbacks (callbacks) {
    this._setCallbacks('preprocessingCallbacks', callbacks)
  }

  /**
   *
   * @param {string} property
   * @param {Function[]} callbacks
   * @private
   */
  _setCallbacks (property, callbacks) {
    const errored = []

    for (const i in callbacks) {
      if (!validateCallbackFn(callbacks[i])) {
        errored.push(i)
        continue
      }

      this[property].push(callbacks[i])
    }

    if (errored.length) {
      throw new ApiError('Invalid callbacks: ' + callbacks.join(', '))
    }
  }

  /**
   *
   * @param {Function[]} callbacks
   */
  setErrorCallbacks (callbacks) {
    this._setCallbacks('errorCallbacks', callbacks)
  }

  /**
   *
   * @param {Function} callback
   */
  addPreprocessingCallback (callback) {
    if (!validateCallbackFn(callback)) {
      throw new ApiError('You must pass a valid callback to this method')
    }

    this.preprocessingCallbacks.push(callback)
  }

  /**
   *
   * @param {Function} callback
   */
  addErrorCallback (callback) {
    if (!validateCallbackFn(callback)) {
      throw new ApiError('You must pass a valid callback to this method')
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
   * @param {string} name
   * @param {string} value
   * @param {boolean} overwrite
   */
  setHeader (name, value, overwrite = false) {
    if (typeof name !== 'string') {
      throw new ApiError('Expected name to be string, got ' + typeof name)
    }

    if (READ_ONLY_HEADERS.includes(name)) {
      throw new ApiError('Cannot change default headers')
    }

    if (typeof value !== 'string') {
      throw new ApiError('Expected value to be string, got ' + typeof value)
    }

    if (Object.keys(this.headers).includes(name) && !overwrite) {
      throw new ApiError('Header is already set, not overwriting.')
    }

    this.headers[name] = value
  }

  /**
   * Add multiple request headers at once by passing an object:
   *
   * ```js
   * api.addHeaders({
   *   'X-My-Header': 'my-header-value',
   *   'E-Tag': '12923-434-123'
   * })
   * ```
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

    for (const [name, value] of Object.entries(headers)) {
      this.setHeader(name, value)
    }
  }

  setBaseUrl (baseUrl) {
    this.baseUrl = baseUrl
  }

  /* #region request methods */

  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {Object} params
   * @param {Object} data
   * @returns {Promise<Response>}
   * @protected
   */
  async _doRequest (method, url, params, data) {
    const config = Object.assign({}, this.defaultOptions)
    config.headers = this.headers

    if (!isAbsoluteUri(url)) {
      url = this.baseUrl + url
    }

    // make cross domain requests if necessary
    let crossDomain = false
    if (url.length > 0 && isAbsoluteUri(url)) {
      crossDomain = true
    }

    const requestConfig = {
      body: null,
      headers: this.headers,
      method: method.toUpperCase(),
      mode: crossDomain ? 'cors' : 'same-origin',
      referrerPolicy: 'strict-origin-when-cross-origin'
    }

    if (data) {
      requestConfig.body = JSON.stringify(data)
    }

    return fetch(url, requestConfig).then(async response => {
      let callbacks = []
      if (response.ok) {
        callbacks = this.preprocessingCallbacks
      } else {
        // run preprocessing callbacks
        callbacks = this.errorCallbacks
      }

      for (const callback of callbacks) {
        await callback(response)
      }

      return response
    })
  }

  get (url, params = null) {
    return this.doRequest('get', url, params, null)
  }

  post (url, params = null, data = null) {
    return this.doRequest('post', url, params, data)
  }

  put (url, params = null, data = null) {
    return this.doRequest('put', url, params, data)
  }

  patch (url, params = null, data = null) {
    return this.doRequest('patch', url, params, data)
  }

  delete (url, params = null, data = null) {
    return this.doRequest('delete', url, params, data)
  }

  /* #endregion */
}
