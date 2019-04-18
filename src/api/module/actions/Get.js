/**
 * Get a resource from a
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function get (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const [ vuexFns, query ] = argArray

      vuexFns.commit('startLoading')

      return api[moduleName].get(query).then(({ data }) => {
        let objectId = null
        for (let idx in data[moduleName]) {
          if (data[moduleName].hasOwnProperty(idx)) {
            objectId = idx
            break
          }
        }

        vuexFns.commit('set', { id: data[moduleName][objectId].id, data: data[moduleName][objectId] })
      }).finally(() => {
        vuexFns.commit('endLoading')
      })
    }
  })
}
