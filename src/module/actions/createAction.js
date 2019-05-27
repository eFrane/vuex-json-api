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
    apply (target, thisArg, argArray) {
      let [vuexFns, resourceObject] = argArray

      validateResourceObject(resourceObject)

      vuexFns.commit('startLoading')

      return api[moduleName].create(resourceObject).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)
      }).finally(() => {
        vuexFns.commit('endLoading')
      })
    }
  })
}
