
/**
 * Delete a resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function deleteAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, id]) {
      vuexFns.commit('startLoading')

      return api[moduleName].delete({ id: id }).then(response => {
        vuexFns.commit('remove', id)
        vuexFns.commit('endLoading')

        return response
      })
    }
  })
}
