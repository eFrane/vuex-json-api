import normalize from 'json-api-normalizer'

import { Api } from './Api'
import { ModuleBuilder } from '../module/ModuleBuilder'
import { Route } from '../route/Route'

export class ResourcefulApi extends Api {
  /**
   *
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
   * @param {Array} modulesToRegister
   */
  setupModules (store, modulesToRegister = []) {
    console.time('api: setup modules')

    const registerableModuleNames = Object.keys(this.registerableModules)

    let currentModuleName
    do {
      currentModuleName = registerableModuleNames.pop()

      if (typeof currentModuleName !== 'undefined' &&
        (modulesToRegister.length === 0 || modulesToRegister.indexOf(currentModuleName))) {
        this.registerModule(store, this[currentModuleName], currentModuleName)
      }
    } while (currentModuleName)

    delete this.registerableModules

    console.timeEnd('api: setup modules')
  }

  /**
   *
   * @param {Vuex} store
   * @param {Route} methods
   */
  registerModule (store, methods, moduleName) {
    // prevent double registration
    if (Object.prototype.hasOwnProperty.call(store.state, moduleName)) {
      return
    }

    const moduleBuilder = new ModuleBuilder(store, this, moduleName, methods)
    const module = moduleBuilder.build()
    if (moduleName) {
      store.registerModule(moduleName, module)
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

        this[routeName][methodName] = ResourcefulApi.createApiProxy(this, methodName, route)
      }
    }

    console.timeEnd('api: add method proxies for route ' + routeName)
  }

  registerRelatedResourceMethod (routeName, methodName, route) {
    const [related, resource, relationMethod] = methodName.split('.')

    if (typeof this[routeName][related] !== 'object') {
      this[routeName][related] = {}
    }

    if (typeof this[routeName][related][resource] !== 'object') {
      this[routeName][related][resource] = {}
    }

    this[routeName][related][resource][relationMethod] =
      ResourcefulApi.createApiProxy(this, relationMethod, route)
  }

  /**
   *
   * @param {Api} api
   * @param {String} method
   * @param {Route} route
   */
  static createApiProxy (api, method, route) {
    return new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        if (!(route instanceof Route)) {
          throw new Error('Expected Route object')
        }

        // add actual route as first param
        const url = route.prepare(argArray[0])
        argArray.unshift(url)

        switch (method) {
          case 'list':
          case 'get':
            return api.get.apply(api, argArray)

          case 'create':
            return api.post.apply(api, argArray)

          case 'replace':
            return api.put.apply(api, argArray)

          case 'update':
            return api.patch.apply(api, argArray)

          case 'delete':
            return api.delete.apply(api, argArray)

          default:
            throw new Error('unsupported api method: ' + method)
        }
      }
    })
  }
}
