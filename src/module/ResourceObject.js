export class ResourceObject {
  /**
   *
   * @param {Vuex.Store} store
   * @param {object} resultObject
   */
  constructor (store, resultObject) {
    let obj = JSON.parse(JSON.stringify(resultObject.data))

    if (obj.hasOwnProperty('relationships')) {
      obj.relationships = this.addRelationshipResolvers(store, obj.id, obj.type, obj.relationships)
    }

    obj.hasRelationship = name => {
      return obj.hasOwnProperty('relationships') &&
        obj.relationships.hasOwnProperty(name) &&
        obj.relationships[name].data.length !== 0
    }

    obj.hasLoadedRelationship = name => {
      if (!obj.hasRelationship(name)) {
        return false
      }

      try {
        obj.relationships[name].get() || obj.relationships[name].list()
        return true
      } catch (e) {
        return false
      }
    }

    return obj
  }

  /**
   *
   * @param {Vuex.Store} store
   * @param {object} resultObjectRelationships
   */
  addRelationshipResolvers (store, currentObjectId, currentObjectType, resultObjectRelationships) {
    for (const relatedObjectType in resultObjectRelationships) {
      if (resultObjectRelationships.hasOwnProperty(relatedObjectType)) {
        const isToManyRelationship = resultObjectRelationships[relatedObjectType].data.constructor === Array

        let relatedObject = resultObjectRelationships[relatedObjectType]

        relatedObject.get = this.resolveToOneRelationship(store, relatedObject, isToManyRelationship)

        if (isToManyRelationship) {
          relatedObject.list = this.resolveToManyRelationship(store, relatedObject)
        }

        relatedObject.load = this.addLoaderMethod(store, currentObjectId, currentObjectType, relatedObject, isToManyRelationship)

        resultObjectRelationships[relatedObjectType] = relatedObject
      }
    }

    return resultObjectRelationships
  }

  addLoaderMethod (store, currentObjectId, currentObjectType, relatedObject, isToManyRelationship) {
    return new Proxy(() => { }, {
      apply (target, thisArg, argArray) {
        let relatedObjectType = (isToManyRelationship) ? relatedObject.data[0].type : relatedObject.data.type
        let relatedObjectNameForAction = relatedObjectType.getChar(0).toUpperCase() + relatedObjectType.slice(1)

        if (isToManyRelationship) {
          return store.dispatch(`${currentObjectType}/listRelated${relatedObjectNameForAction}`, { currentObjectId })
        }
      }
    })
  }

  /**
   *
   * @param {Vuex.Store} store
   * @param {Object} relatedObject
   */
  resolveToOneRelationship (store, relatedObject, isToManyRelationship) {
    return new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        let moduleName = relatedObject.data.type
        let relatedModule = store.state[moduleName]

        if (isToManyRelationship) {
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

  /**
   * @param {Vuex.Store} store
   * @param {Array} relatedObjects
   */
  resolveToManyRelationship (store, relatedObjects) {
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
}
