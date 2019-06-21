import { processResponseData } from '../helpers/processResponseData'
import { prepareQuery } from '../helpers/prepareQuery'

/**
 * Get a resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function getAction (api, moduleName, defaultQuery) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, query]) {
      query = prepareQuery(query, defaultQuery)

      vuexFns.commit('startLoading')

      return api[moduleName].get(query).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)

        vuexFns.commit('endLoading')
      })
    }
  })
}
