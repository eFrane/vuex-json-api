function setResourceObjectsForModule (vuexFns, currentModule, destinationModule, objects) {
  for (const id in objects) {
    if (objects.hasOwnProperty(id)) {
      const isRootMutation = currentModule !== destinationModule

      let mutation = 'set'
      if (isRootMutation) {
        mutation = destinationModule + '/' + mutation
      }

      const payload = { id: objects[id].id, data: objects[id] }

      vuexFns.commit(mutation, payload, { root: isRootMutation })
    }

    if (objects.hasOwnProperty('relationships')) {
      // TODO: process relationships
    }
  }
}

/**
 * Get a resource list
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function list (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [vuexFns, query] = argArray

      if (typeof query === 'undefined') {
        query = {}
      }

      vuexFns.commit('startLoading')

      return api[moduleName].list(query).then(({ data, meta }) => {
        for (let destinationModule in data) {
          if (data.hasOwnProperty(destinationModule)) {
            setResourceObjectsForModule(vuexFns, moduleName, destinationModule, data[destinationModule])
          }
        }

        // TODO: pagination
      }).finally(
        vuexFns.commit('endLoading')
      )
    }
  })
}
