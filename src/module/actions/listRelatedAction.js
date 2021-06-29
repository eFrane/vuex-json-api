import { processResponseData } from '../helpers/processResponseData'
import { prepareQuery } from '../helpers/prepareQuery'
import { hasOwn } from '../../shared/utils'

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

      return api[moduleName].related[relatedModuleName].list(query).then(response => {
        processResponseData(vuexFns, api, moduleName, response.data, 'list')

        if (hasOwn(response.meta, 'pagination')) {
          vuexFns.commit(`${relatedModuleName}setPagination`, response.meta.pagination)
        }

        vuexFns.commit(`${relatedModuleName}/endLoading`, null, { root: true })
        vuexFns.commit('endLoading')

        return response
      })
    }
  })
}
