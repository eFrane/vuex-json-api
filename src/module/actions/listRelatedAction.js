import { processResponseData } from '../helpers/processResponseData'
import { prepareQuery } from '../helpers/prepareQuery'

/**
 * Get a resource list of a related resource
 *
 * Handles /resource/{id}/relation routes
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function listRelatedAction (api, moduleName, relatedModuleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, query]) {
      query = prepareQuery(query, {})

      vuexFns.commit('startLoading')
      vuexFns.commit(`${relatedModuleName}/startLoading`, null, { root: true })

      return api[moduleName].related[relatedModuleName].list(query).then(({ data, meta }) => {
        processResponseData(thisArg, vuexFns, api, relatedModuleName, data)

        if (meta.hasOwnProperty('pagination')) {
          vuexFns.commit(`${relatedModuleName}setPagination`, meta.pagination)
        }

        vuexFns.commit(`${relatedModuleName}/endLoading`, null, { root: true })
        vuexFns.commit('endLoading')
      })
    }
  })
}
