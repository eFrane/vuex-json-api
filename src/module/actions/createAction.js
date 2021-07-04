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
    hasOwn(resourceObject, 'attributes')
}

/**
 * Create a new resource
 *
 * Allowed Responses:
 *
 * _201 Created_
 *
 * If the resource did not have a client-generated id, this is
 * the server response for successful creates. The response body
 * must include the generated resource.
 *
 * If a client-generated id was sent to the server, the response id
 * must match the request id.
 *
 * _202 Accepted_
 *
 * As with the delete action, this library tries to handle accepted as a
 * success state. *If* the resource was sent with a client-generated
 * id, it will be committed to the store as is, however, if no id
 * is present, an error will be thrown.
 *
 * _204 No content_
 *
 * For resources with client-generated ids, a 204 response from the
 * server will commit the provided resource to the store module.
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

      const hasClientGeneratedId = hasOwn(resourceObject, 'id')

      vuexFns.commit('startLoading')

      // It is currently not supported to pass query params when creating a new resource
      return api[moduleName].create(null, { data: resourceObject }).then(response => {
        if (response.status === 201) {
          // servers are not supposed to alter client-provided ids
          if (hasClientGeneratedId && !hasOwn(response.data.book, resourceObject.id)) {
            // TODO: Throwing here should be configurable, it may be desirable
            //       to be less pedantic.
            throw new Error('Server altered client-provided id, with HTTP status 201 instead of 409')
          }

          processResponseData(vuexFns, api, moduleName, response.data, 'create')
        }

        vuexFns.commit('endLoading')

        return response
      }).catch(e => {
        // FIXME: This is not the way to handle errors.
        console.log(e)
      })
    }
  })
}
