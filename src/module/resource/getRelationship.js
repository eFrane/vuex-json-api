/**
*
* @param {Vuex.Store} store
* @param {Object} relatedObject
*/
export function getRelationship (store, relatedObject, config) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let moduleName = relatedObject.data.type
      let relatedModule = store.state[moduleName]

      if (config.isToMany) {
        let [requestedId] = argArray

        try {
          return relatedModule.items[requestedId]
        } catch (e) {
          throw new Error(`Related object ${relatedObject.id} not found in ${moduleName}`)
        }
      }

      return relatedModule.items[relatedObject.data.id]
    }
  })
}
