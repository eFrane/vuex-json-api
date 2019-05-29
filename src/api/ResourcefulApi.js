import { Api } from './Api'
import { Builder } from '../module/Builder'

export class ResourcefulAPI extends Api {
  /**
   *
   * @param {route.Router} router
   * @param {Vuex.Store} store
   * @param {Array} modulesToRegister
   */
  constructor (router, store, modulesToRegister = []) {
    super()

    const routes = router.getRoutes()

    console.time('api: setup')

    for (const routeName in routes) {
      if (routes.hasOwnProperty(routeName)) {
        let methods = routes[routeName]

        this.registerResourceMethods(routeName, methods)

        // conditionally build and register a corresponding vuex module
        if (modulesToRegister.length === 0 || modulesToRegister.indexOf(routeName) >= 0) {
          this.registerModule(store, methods);
        }
      }
    }

    console.timeEnd('api: setup')
  }

  /**
   *
   * @param {Vuex} store
   * @param {Route} methods
   */
  registerModule (store, methods) {
    let moduleBuilder = new Builder(store, this, route, methods);
    const module = moduleBuilder.build();
    store.registerModule(route, module);
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
