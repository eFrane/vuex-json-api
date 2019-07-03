/**
* @param {Vuex.Store} store
* @param {Array} relatedObjects
*/
export function listRelationship (store, relatedObjects) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let moduleName = relatedObjects.data[0].type
      let relatedModule = store.state[moduleName]

      let relatedObjectIds = relatedObjects.data.map(obj => obj.id)

      let relatedItems = {}
      relatedObjectIds.forEach(id => {
        relatedItems[id] = relatedModule.items[id]
      })

      return relatedItems
    }
  })
}
