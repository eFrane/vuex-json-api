/**
* @param {Vuex.Store} store
* @param {String} relationshipModuleName
* @param {Array} relatedObjects
*/
export function listRelationship (store, relationshipModuleName, relatedObjects) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const relatedModule = store.state[relationshipModuleName]

      const relatedObjectIds = relatedObjects.data.map(obj => obj.id)

      const relatedItems = {}
      relatedObjectIds.forEach(id => {
        relatedItems[id] = relatedModule.item ? relatedModule.item[id] : relatedModule.items[id]
      })

      return relatedItems
    }
  })
}
