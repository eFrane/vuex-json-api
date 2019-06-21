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
      validateResourceObject(resourceObject, createResource)

      vuexFns.commit('startLoading')

      return api[moduleName].create({data: resourceObject}).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)
      }).finally(() => {
        vuexFns.commit('endLoading')
      })
    }
  })
}
