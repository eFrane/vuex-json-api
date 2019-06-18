
/**
 * Delete a resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function deleteAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [vuexFns, id] = argArray

      vuexFns.commit('startLoading')

      return api[moduleName].delete({id: id}).then(() => {
        vuexFns.commit('remove', id)
      })
        .finally(() => {
          vuexFns.commit('endLoading')
        })
    }
  })
}
