import { Api } from './Api'
import { ApiModuleBuilder } from './ApiModuleBuilder'

export class ResourcefulAPI extends Api {
  /**
   *
   * @param router Router
   * @param store Vuex.Store
   */
  constructor (router, store) {
    super()

    this.moduleBuilder = new ApiModuleBuilder(store)
    const routes = router.getRoutes()

    console.time('api: setup')
    for (const route in routes) {
      if (routes.hasOwnProperty(route)) {
        let methods = routes[route]
        this.registerResourceMethods(route, methods)
        this.registerApiModule(store, route, methods)
      }
    }

    delete this.moduleBuilder
    console.timeEnd('api: setup')
  }

  registerResourceMethods (route, methods) {
    this[route] = {}

    console.time('api: add method proxies for route ' + route)
    for (let method in methods) {
      if (methods.hasOwnProperty(method)) {
        this[route][method] = ResourcefulAPI.createApiProxy(this, method, methods[method])
      }
    }
    console.timeEnd('api: add method proxies for route ' + route)
  }

  /**
   *
   * @param store Vuex.Store
   * @param routeName string
   * @param methods object
   */
  registerApiModule (store, routeName, methods) {
    store.registerModule(routeName, this.moduleBuilder.build(this, routeName, methods))
  }

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

          case 'update':
            return api.put.apply(api, argArray)

          case 'delete':
            return api.delete.apply(api, argArray)

          default:
            throw new Error('unsupported restful method: ' + method)
        }
      }
    })
  }
}
