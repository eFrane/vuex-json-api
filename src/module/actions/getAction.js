import { processResponseData } from '../helpers/processResponseData'

/**
 * Get a resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function getAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [ vuexFns, query ] = argArray

      if (typeof query === 'undefined') {
        query = {}
      }

      vuexFns.commit('startLoading')

      return api[moduleName].get(query).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)
      }).finally(() => {
        vuexFns.commit('endLoading')
      })
    }
  })
}
