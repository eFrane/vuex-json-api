import axios from 'axios'
import stringify from 'qs-stringify'
import normalize from 'json-api-normalizer'

import {Route} from './Route'

class Api {
  constructor () {
    if (typeof Api.baseUrl === 'undefined') {
      Api.baseUrl = ''
    }

    this.defaultOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      paramsSerializer (params) {
        return stringify(params)
      }
    }

    let metaCsrfToken = document.querySelector('meta[name=csrf-token]')
    if (metaCsrfToken) {
      this.defaultOptions.headers['X-CSRF-Token'] = document.querySelector('meta[name=csrf-token]').content
    }
  }

  async doRequest (method, url, params, data, options) {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Objekte_mit_gleichen_Eigenschaften_zusammenf%C3%BChren
    let config = Object.assign(options, this.defaultOptions, options)

    if (url instanceof Route) {
      url = url.prepare(params)
    }

    url = Api.baseUrl + url

    // make cross domain requests if necessary
    let crossDomain = false
    if (Api.baseUrl.length > 0) {
      crossDomain = true
    }

    return axios.create(config)
      .request({ method, url, params, data, crossDomain })
      .then((data) => {
        return {
          data: normalize(data.data),
          meta: data.meta
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

  static setBaseUrl (baseUrl) {
    Api.baseUrl = baseUrl
  }
}

export { Api }
