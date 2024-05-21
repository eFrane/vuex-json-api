import normalize from 'json-api-normalizer'

import { Api } from './Api'
import { ApiError, NotFoundApiError } from '../errors/ApiError'
import { ModuleBuilder } from '../module/ModuleBuilder'
import { ResourceProxy } from './ResourceProxy'
import { hasOwn } from '../shared/utils'
import { Performance } from '../shared/Performance'

export class ResourcefulApi extends Api {
  constructor () {
    super()

    /** @var {Function[]} */
    this.requestCallbacks = []

    /** @var {Function[]} */
    this.responseCallbacks = []
  }

  /**
   * Functions to be called with the parsed request data.
   *
   * @param {Function[]} callbacks
   */
  setRequestCallbacks (callbacks) {
    this.requestCallbacks = callbacks
  }

  addRequestCallback (cb) {
    this.requestCallbacks.push(cb)
  }

  resetRequestCallbacks () {
    this.requestCallbacks = []
  }

  /**
   * Functions to be called with the parsed response data.
   *
   * @param {Function[]} callbacks
   */
  setResponseCallbacks (callbacks) {
    this.responseCallbacks = callbacks
  }

  addResponseCallback (cb) {
    this.responseCallbacks.push(cb)
  }

  resetResponseCallbacks () {
    this.responseCallbacks = []
  }

  /**
   * Extends `Api::doRequest()` to handle some data preprocessing.
   *
   * The api modules don't require access to all of the response
   * and they expect the response data to be normalized.
   *
   * @inheritdoc
   * @param {String} method
   * @param {String} url
   * @param {Object} params
   * @param {Object} data
   */
  async _doRequest (method, url, params, data) {
    for (const cb of this.requestCallbacks) {
      data = cb(data, params, url, method)
    }

    return super._doRequest(method, url, params, data)
      .then(async (response) => {
        let parsedResponse = this._createDatalessResponse(response)

        if (this._shouldDecodeResponseJson(response.status)) {
          const json = await this._decodeResponseJson(response)

          parsedResponse = this._parseResponse(response.status, json)
        }

        for (const cb of this.responseCallbacks) {
          parsedResponse = cb(parsedResponse, response.status)
        }

        return Object.freeze(parsedResponse)
      })
  }

  _shouldDecodeResponseJson (status) {
    return [200, 201, 404, 409].includes(status)
  }

  async _decodeResponseJson (response) {
    try {
      return await response.json()
    } catch (e) {
      if (response.status === 404) {
        throw new NotFoundApiError('Resource not found')
      }

      throw new ApiError('Failed to decode response json')
    }
  }

  _parseResponse (status, json) {
    if (!(hasOwn(json, 'data') || hasOwn(json, 'errors'))) {
      throw new ApiError('Response object must have either a `data` or an `errors` property.')
    }

    const parsedResponse = {
      meta: json.meta ? json.meta : {},
      links: json.links ? json.links : {},
      status: status
    }

    if (json.data) {
      parsedResponse.data = normalize(json, { camelizeTypeValues: false })
    }

    if (json.errors) {
      parsedResponse.errors = json.errors

      switch (status) {
        case 404:
          throw new NotFoundApiError('Resource not found but received error info', json.errors)
      }
    }

    return parsedResponse
  }

  _createDatalessResponse (response) {
    return {
      data: null,
      meta: null,
      links: null,
      status: response.status
    }
  }

  /**
   * Prepare the routable requests
   *
   * @param {Router} router
   */
  setupResourcefulRequests (router) {
    this.router = router

    Performance.mark('api_setup_routing_start')

    const routes = router.getRoutes()
    this.registerableModules = {}

    for (const routeName of Object.keys(routes)) {
      const methods = routes[routeName]

      this.registerResourceMethods(routeName, methods)
      this.registerableModules[routeName] = methods
    }

    Performance.mark('api_setup_routing_end')
    Performance.measure(
      'api: setup resourceful routing',
      'api_setup_routing_start',
      'api_setup_routing_end'
    )
  }

  /**
   *
   * @param {Vuex.Store} store
   */
  setStore (store) {
    this.store = store
  }

  /**
   *
   * @param {Array} apiModulesToRegister
   */
  setupApiModules (apiModulesToRegister = []) {
    Performance.mark('api_setup_modules_start')

    apiModulesToRegister.forEach(moduleName => {
      let resourceProxy = this[moduleName]
      if (!resourceProxy) {
        resourceProxy = new ResourceProxy()
      }
      this.registerModule(moduleName, resourceProxy)
    })

    Performance.mark('api_setup_modules_end')
    Performance.measure(
      'api: setup api modules',
      'api_setup_modules_start',
      'api_setup_modules_end'
    )
  }

  /**
   *
   * @param {String} moduleName
   * @param {Route} methods
   */
  registerModule (moduleName, methods) {
    // prevent double registration
    if (hasOwn(this.store.state, moduleName)) {
      return
    }

    const moduleBuilder = new ModuleBuilder(this, moduleName, methods)
    const module = moduleBuilder.build()
    if (moduleName) {
      this.store.registerModule(moduleName, module)
    }
  }

  /**
   *
   * @param {String} routeName
   * @param {Route} methods
   */
  registerResourceMethods (routeName, methods) {
    this[routeName] = new ResourceProxy(this)

    Performance.mark('api_setup_proxies_start')

    const relationsToBeAdded = []

    for (const methodName of Object.keys(methods)) {
      if (this.isRelationMethodName(methodName)) {
        relationsToBeAdded.push(methodName)

        continue
      }

      this[routeName].addRoute(methods[methodName])
    }

    relationsToBeAdded.forEach(relationToBeAdded => {
      const [relationIdentifier, relationName] = relationToBeAdded.split('.')

      this[relationIdentifier].addRelation(relationName, this[relationName])
    })

    Performance.mark('api_setup_proxies_end')
    Performance.measure(
      'api: add method proxies for route ' + routeName,
      'api_setup_proxies_start',
      'api_setup_proxies_end'
    )
  }

  isRelationMethodName (methodName) {
    return methodName.indexOf('related.') === 0
  }

  /**
   * Register an api module
   *
   * After api initialization, this is the way to register
   * non-default modules.
   *
   * its purpose is to get called from store, where its referenced from the initJsonApiPlugin.
   * At that point `this` is the store and not the api object
   *
   * @param {String} moduleName
   */
  registerApiModule (moduleName) {
    return this.api.registerModule(moduleName, this.api[moduleName])
  }

  /**
   * Get a list of available api modules
   *
   * A module is available if it has defined routing.
   * If `onlyUnregistered` is set to false, this list
   * will also return already registered modules.
   *
   * @param {Boolean} onlyUnregistered
   * @returns {Array}
   */
  getAvailableApiModules (onlyUnregistered = true) {
    const availableModules = Object.keys(this.registerableModules)

    if (onlyUnregistered) {
      return availableModules.filter((moduleName) => {
        return !hasOwn(this.state, moduleName)
      })
    }
    return availableModules
  }
}
