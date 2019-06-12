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
      if (modulesToRegister.length === 0 || modulesToRegister.indexOf(currentModuleName)) {
        this.registerModule(store, this.registerableModules[currentModuleName], currentModuleName)
      }

      currentModuleName = registerableModuleNames.pop()
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
    store.registerModule(moduleName, module)
  }

  /**
   *
   * @param {String} routeName
   * @param {Route} methods
   */
  registerResourceMethods (routeName, methods) {
    this[routeName] = {}

    console.time('api: add method proxies for route ' + routeName)

    for (let method in methods) {
      if (methods.hasOwnProperty(method)) {
        this[routeName][method] = ResourcefulAPI.createApiProxy(this, method, methods[method])
      }
    }

    console.timeEnd('api: add method proxies for route ' + routeName)
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
