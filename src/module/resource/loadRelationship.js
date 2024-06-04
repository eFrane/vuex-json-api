export function loadRelationship (store, currentObjectId, moduleName, relatedObject, config) {
  return () => {
    const relatedObjectType = (config.isToMany) ? relatedObject.data[0].type : relatedObject.data.type
    // const relatedObjectNameForAction = relatedObjectType[0].toUpperCase() + relatedObjectType.slice(1)

    if (config.isToMany) {
      return store.dispatch(`${moduleName}/listRelated${relatedObjectType}`, { id: currentObjectId })
    }

    return new Error('Failed to load relationship')
  }
}
