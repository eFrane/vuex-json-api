
/**
 * Delete a resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function deleteAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [vuexFns, ids] = argArray

      vuexFns.commit('startLoading')

      Promise.all(ids.map(id => {
        return api[moduleName].delete({id: id}).then(() => {
          vuexFns.commit('remove', id)
        })
      }))
        .finally(() => {
          vuexFns.commit('endLoading')
        })
    }
  })
}
