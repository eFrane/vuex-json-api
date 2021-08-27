/**
* @param {Vuex.Store} store
* @param {Array} relatedObjects
*/
export function listRelationship (store, relatedObjects) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const moduleName = relatedObjects.data[0].type
      const relatedModule = store.state[moduleName]

      const relatedObjectIds = relatedObjects.data.map(obj => obj.id)

      const relatedItems = {}
      relatedObjectIds.forEach(id => {
        relatedItems[id] = relatedModule.item ? relatedModule.item[id] : relatedModule.items[id]
      })

      return relatedItems
    }
  })
}
