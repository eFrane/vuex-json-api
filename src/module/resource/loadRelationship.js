export function loadRelationship (store, currentObjectId, currentObjectType, relatedObject, config) {
  return () => {
    const relatedObjectType = (config.isToMany) ? relatedObject.data[0].type : relatedObject.data.type

    if (config.isToMany) {
      return store.dispatch(`${currentObjectType}/listRelated${relatedObjectType}`, { id: currentObjectId })
    }

    return new Error('Failed to load relationship')
  }
}
