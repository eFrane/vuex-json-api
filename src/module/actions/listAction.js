import { processResponseData } from '../helpers/processResponseData'

/**
 * Get a resource list
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function listAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [vuexFns, query] = argArray

      if (typeof query === 'undefined') {
        query = {}
      }

      vuexFns.commit('startLoading')

      return api[moduleName].list(query).then(({ data, meta }) => {
        vuexFns.commit('resetItems')

        processResponseData(thisArg, vuexFns, api, moduleName, data)

        if (meta.hasOwnProperty('pagination')) {
          vuexFns.commit('setPagination', meta.pagination)
        }
      }).finally(
        vuexFns.commit('endLoading')
      )
    }
  })
}
