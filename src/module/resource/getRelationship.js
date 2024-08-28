/**
*
* @param {Vuex.Store} store
* @param {Object} relatedObject
* @param {Object} config{isToMany: boolean}
* @param {Object} config{isToMany: boolean}
*/
export function getRelationship (store, relatedObject, config) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const moduleType = relatedObject.data.type
      const relatedModule = store.state[moduleType]

      if (config.isToMany) {
        const [requestedId] = argArray

        try {
          return relatedModule.items[requestedId]
        } catch (e) {
          throw new Error(`Related object ${relatedObject.data.id} not found in ${moduleType}`)
        }
      }

      return relatedModule.items[relatedObject.data.id]
    }
  })
}
