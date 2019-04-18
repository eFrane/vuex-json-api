export function list (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [vuexFns, query] = argArray

      if (typeof query === 'undefined') {
        query = {}
      }

      return api[moduleName].list(query).then(({ data, meta }) => {
        let elements = data[moduleName]

        for (const id in elements) {
          if (elements.hasOwnProperty(id)) {
            vuexFns.commit('set', { id: elements[id].id, data: elements[id] })
          }
        }

        // TODO: includes, pagination
      })
    }
  })
}
