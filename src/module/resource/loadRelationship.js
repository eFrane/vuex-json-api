export function loadRelationship (store, currentObjectId, currentObjectType, relatedObject, config) {
  return new Proxy(() => { }, {
    apply (target, thisArg, argArray) {
      let relatedObjectType = (config.isToMany) ? relatedObject.data[0].type : relatedObject.data.type
      let relatedObjectNameForAction = relatedObjectType.getChar(0).toUpperCase() + relatedObjectType.slice(1)

      if (config.isToMany) {
        return store.dispatch(`${currentObjectType}/listRelated${relatedObjectNameForAction}`, { currentObjectId })
      }
    }
  })
}
