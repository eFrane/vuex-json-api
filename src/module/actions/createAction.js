import { processResponseData } from '../helpers/processResponseData'
import { hasOwn } from '../../shared/utils'

/**
 * Do a crude check for common json:api resource properties.
 * This is (probably) not a long-term solution!
 *
 * Assumptions made:
 *
 * - Resource Objects always have a type and a data section
 * - newly created resources must not have an id (this is slightly
 *   stricter than the specification allows for and may be changed
 *   in the future)
 * - every other resource object should have an id
 *
 * @param {Object} resourceObject
 * @param {Boolean} hasId
 */
export function validateResourceObject (resourceObject, hasId) {
  const conformsToBasicStructure = typeof resourceObject === 'object' &&
    hasOwn(resourceObject, 'type') &&
    hasOwn(resourceObject, 'data')

  if (hasId) {
    return conformsToBasicStructure &&
      !hasOwn(resourceObject, 'id')
  }

  if (!hasId) {
    return conformsToBasicStructure &&
      hasOwn(resourceObject, 'id')
  }

  throw new Error('Detected potentially invalid json:api resource object')
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
      validateResourceObject(resourceObject, true)

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
