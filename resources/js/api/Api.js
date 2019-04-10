import axios from 'axios'
import stringify from 'qs-stringify'
import normalize from 'json-api-normalizer'

import {Route} from './Route'

export class Api {
  constructor () {
    const csrfToken = document.querySelector('meta[name=csrf-token]').content

    this.defaultOptions = {
      headers: {
        'X-CSRF-Token': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      paramsSerializer (params) {
        return stringify(params)
      }
    }
  }

  doRequest (method, url, params, data, options) {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Objekte_mit_gleichen_Eigenschaften_zusammenf%C3%BChren
    let config = Object.assign(options, this.defaultOptions, options)

    if (url instanceof Route) {
      url = url.prepare(params)
    }

    return axios.create(config)
      .request({ method, url, params, data })
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

  delete (url, params = null, data = null, options = {}) {
    return this.doRequest('delete', url, params, data, options)
  }
}
