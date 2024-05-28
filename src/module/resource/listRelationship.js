/**
* @param {Vuex.Store} store
* @param {String} relationshipModuleName
* @param {Array} relatedObjects
*/
export function listRelationship (store, relationshipModuleName, relatedObjects) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const moduleName = relatedObjects.data[0].type
      const relatedModule = store.state[moduleName] // This should work with 'relationshipModuleName' instead of 'moduleType'

      const relatedObjectIds = relatedObjects.data.map(obj => obj.id)

      const relatedItems = {}
      relatedObjectIds.forEach(id => {
        relatedItems[id] = relatedModule.item ? relatedModule.item[id] : relatedModule.items[id]
      })

      return relatedItems
    }
  })
}
