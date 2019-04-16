import { Api } from './Api'
import { Builder } from './module/Builder'

export class ResourcefulAPI extends Api {
  /**
   *
   * @param {route.Router} router
   * @param {Vuex.Store} store
   */
  constructor (router, store) {
    super()

    const routes = router.getRoutes()

    console.time('api: setup')
    for (const route in routes) {
      if (routes.hasOwnProperty(route)) {
        let methods = routes[route]
        this.registerResourceMethods(route, methods)

        let moduleBuilder = new Builder(store, this, route, methods)
        const module = moduleBuilder.build()
        store.registerModule(route, module)
      }
    }

    console.timeEnd('api: setup')
  }

  /**
   *
   * @param {*} route
   * @param {*} methods
   */
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
   * @param {*} api
   * @param {*} method
   * @param {*} route
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
