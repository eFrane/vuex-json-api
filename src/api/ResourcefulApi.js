import normalize from 'json-api-normalizer'

import { Api } from './Api'
import { ModuleBuilder } from '../module/ModuleBuilder'
import { Route } from '../route/Route'
import { createResourcefulApiMethod } from './createApiResourceMethodProxy'

export class ResourcefulApi extends Api {
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
   * @param {Object} options
   */
  async doRequest (method, url, params, data, options) {
    return super.doRequest(method, url, params, data, options)
      .then((response) => {
        return {
          data: normalize(response.data),
          meta: response.data.meta,
          status: response.status
        }
      })
  }

  /**
   * Prepare the routable requests
   *
   * @param {route.Router} router
   */
  setupResourcefulRequests (router) {
    this.router = router

    console.time('api: setup resourceful routing')
    const routes = router.getRoutes()
    this.registerableModules = {}

    for (const routeName in routes) {
      if (Object.prototype.hasOwnProperty.call(routes, routeName)) {
        const methods = routes[routeName]

        this.registerResourceMethods(routeName, methods)
        this.registerableModules[routeName] = methods
      }
    }

    console.timeEnd('api: setup resourceful routing')
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
   * @param {Array} modulesToRegister
   */
  setupModules (modulesToRegister = []) {
    console.time('api: setup modules')

    for (let moduleName in modulesToRegister) {
      this.registerModule(this[moduleName], moduleName)
    }

    console.timeEnd('api: setup modules')
  }

  /**
   *
   * @param {Vuex} store
   * @param {Route} methods
   */
  registerModule (methods, moduleName) {
    // prevent double registration
    if (Object.prototype.hasOwnProperty.call(store.state, moduleName)) {
      return
    }

    let moduleBuilder = new ModuleBuilder(this.store, this, moduleName, methods)
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
    this[routeName] = {}

    console.time('api: add method proxies for route ' + routeName)

    for (const methodName in methods) {
      if (Object.prototype.hasOwnProperty.call(methods, methodName)) {
        const route = methods[methodName]

        if (methodName.indexOf('related.') === 0) {
          this.registerRelatedResourceMethod(routeName, methodName, route)
          continue
        }

        this[routeName][methodName] = createResourcefulApiMethod(this, methodName, route)
      }
    }

    console.timeEnd('api: add method proxies for route ' + routeName)
  }

  registerRelatedResourceMethod (routeName, methodName, route) {
    let [related, resource, relationMethod] = methodName.split('.')

    if (typeof this[routeName][related] !== 'object') {
      this[routeName][related] = {}
    }

    if (typeof this[routeName][related][resource] !== 'object') {
      this[routeName][related][resource] = {}
    }

    this[routeName][related][resource][relationMethod] =
      createResourcefulApiMethod(this, relationMethod, route)
  }

  /**
   * Register an api module
   *
   * After api initialization, this is the way to register
   * non-default modules.
   *
   * @param {String} moduleName
   */
  registerApiModule (moduleName) {
    return this.registerModule(this[moduleName], moduleName)
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
    let availableModules = Object.keys(this.registerableModules)

    if (onlyUnregistered) {
      return availableModules.filter((moduleName) => {
        return !this.state.hasOwnProperty(moduleName)
      })
    }

    return availableModules
  }
}
