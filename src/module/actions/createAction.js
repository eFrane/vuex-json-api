import { processResponseData } from '../helpers/processResponseData'
import { validateResourceObject } from '../helpers/validateResourceObject'

/**
 * Create a new resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function createAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, resourceObject]) {
      validateResourceObject(resourceObject, true)

      vuexFns.commit('startLoading')

      // It is currently not supported to pass query params when creating a new resource
      return api[moduleName].create(null, {data: resourceObject}).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)

        vuexFns.commit('endLoading')
      })
    }
  })
}
