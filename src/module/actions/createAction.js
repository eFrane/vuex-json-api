import { processResponseData } from '../helpers/processResponseData'
import { hasOwn } from '../../shared/utils'

/**
 * Do a crude check for common json:api resource properties.
 * This is (probably) not a long-term solution!
 *
 * @param {Object} resourceObject
 * @returns Boolean
 */
export function validateResourceObject (resourceObject) {
  return typeof resourceObject === 'object' &&
    hasOwn(resourceObject, 'type') &&
    hasOwn(resourceObject, 'data')
}

/**
 * Create a new resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function createAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, resourceObject]) {
      if (!validateResourceObject(resourceObject)) {
        throw new Error('Please pass valid json:api resource objects to this action.')
      }

      vuexFns.commit('startLoading')

      // It is currently not supported to pass query params when creating a new resource
      return api[moduleName].create(null, { data: resourceObject }).then(response => {
        processResponseData(vuexFns, api, moduleName, response.data, 'create')

        vuexFns.commit('endLoading')

        return response
      })
    }
  })
}
