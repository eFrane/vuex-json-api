import { processResponseData } from '../helpers/processResponseData'
import { prepareQuery } from '../helpers/prepareQuery'
import { hasOwn } from '../../shared/utils'

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

      return api[moduleName].list(query).then(response => {
        vuexFns.commit('resetItems')
        processResponseData(vuexFns, api, moduleName, response.data, 'list', module)

        if (response.meta && hasOwn(response.meta, 'pagination')) {
          vuexFns.commit('setPagination', response.meta.pagination)
        }

        vuexFns.commit('endLoading')

        return response
      })
    }
  })
}
