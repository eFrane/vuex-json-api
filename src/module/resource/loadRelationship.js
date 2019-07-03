export function loadRelationship (store, currentObjectId, currentObjectType, relatedObject, config) {
  return () => {
    let relatedObjectType = (config.isToMany) ? relatedObject.data[0].type : relatedObject.data.type
    let relatedObjectNameForAction = relatedObjectType[0].toUpperCase() + relatedObjectType.slice(1)

    if (config.isToMany) {
      return store.dispatch(`${currentObjectType}/listRelated${relatedObjectNameForAction}`, { id: currentObjectId })
    }

    return new Error('Failed to load relationship')
  }
}
