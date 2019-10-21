import { Route } from '../route/Route'

/**
*
* @param {Api} api
* @param {String} method
* @param {Route} route
*/
export function createApiResourceMethodProxy (api, method, route) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      if (!(route instanceof Route)) {
        throw new Error('Expected Route object')
      }

      // add actual route as first param
      let url = route.prepare(argArray[0])
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
