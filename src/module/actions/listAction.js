import { processResponseData } from '../helpers/processResponseData'
import { prepareQuery } from '../helpers/prepareQuery'

/**
 * Get a resource list
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 * @param {Object} defaultQuery
 * @param {Object} module     storeModule at point of initialisation
 */
export function listAction (api, moduleName, defaultQuery, module) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, query]) {
      query = prepareQuery(query, defaultQuery)

      vuexFns.commit('startLoading')

      return api[moduleName].list(query).then(({ data, meta }) => {
        vuexFns.commit('resetItems')
        processResponseData(thisArg, vuexFns, api, moduleName, data, 'list', module)

        if (meta && Object.prototype.hasOwnProperty.call(meta, 'pagination')) {
          vuexFns.commit('setPagination', meta.pagination)
        }

        vuexFns.commit('endLoading')
      })
    }
  })
}
