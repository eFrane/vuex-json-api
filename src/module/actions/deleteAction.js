/**
 * Delete a resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
import { NotFoundApiError } from '../../errors/ApiError'

export function deleteAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, query]) {
      vuexFns.commit('startLoading')

      // fixme: add fallback support for scalars as query, they should be assumed to be the id
      const id = query.id

      return api[moduleName].delete(query).then(response => {
        vuexFns.commit('remove', id)
        vuexFns.commit('endLoading')

        return response
      }).catch(error => {
        if (!(error instanceof NotFoundApiError)) {
          return error
        }

        if (error.hasErrorInfo()) {
          // TODO: what to do with the error info?
          /**
           * It would probably be nice to pass it on to the users,
           * however, as a 404 is a valid response on DELETE, it may
           * be weird to require users to write their own `.catch()`
           * blocks just to handle the meta data. Not quite sure how
           * to proceed here at the moment.
           */
        }

        return null
      })
    }
  })
}
