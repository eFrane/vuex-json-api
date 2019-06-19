import { processResponseData } from '../helpers/processResponseData'
import { prepareQuery } from '../helpers/prepareQuery'

/**
 * Get a resource list
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function listAction (api, moduleName, defaultQuery) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [vuexFns, query] = argArray

      query = prepareQuery(query, defaultQuery)

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
