import { Api } from './Api'
import { Builder } from '../module/Builder'

export class ResourcefulAPI extends Api {
  /**
   *
   * @param {route.Router} router
   */
  setupResourcefulRequests (router) {
    console.time('api: setup resourceful routing')
    const routes = router.getRoutes()
    this.registerableModules = {}

    for (const routeName in routes) {
      if (routes.hasOwnProperty(routeName)) {
        let methods = routes[routeName]

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
  setupModules (store, modulesToRegister) {
    console.time('api: setup modules')

    let registerableModuleNames = Object.keys(this.registerableModules)

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
    let moduleBuilder = new Builder(store, this, moduleName, methods)
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

    for (let methodName in methods) {
      if (methods.hasOwnProperty(methodName)) {
        let route = methods[methodName]

        if (methodName.indexOf('related.') === 0) {
          this.registerRelatedResourceMethod(routeName, methodName, route)
          continue
        }

        this[routeName][methodName] = ResourcefulAPI.createApiProxy(this, methodName, route)
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
      ResourcefulAPI.createApiProxy(this, relationMethod, route)
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
        // add actual route as first param
        argArray.unshift(route)

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
