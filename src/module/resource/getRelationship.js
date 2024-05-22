/**
*
* @param {Vuex.Store} store
* @param {String} relationshipModuleName
* @param {Object} relatedObject
* @param {Object} config{isToMany: boolean}
*/
export function getRelationship (store, relationshipModuleName, relatedObject, config) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const moduleType = relatedObject.data.type
      const relatedModule = store.state[moduleType] // This should work with 'relationshipModuleName' instead of 'moduleType'

      if (config.isToMany) {
        const [requestedId] = argArray

        try {
          return relatedModule.items[requestedId]
        } catch (e) {
          throw new Error(`Related object ${relatedObject.id} not found in ${moduleType}`)
        }
      }

      return relatedModule.items[relatedObject.id]
    }
  })
}
