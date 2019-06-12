export class ResourceObject {
  /**
   *
   * @param {Vuex.Store} store
   * @param {object} resultObject
   */
  constructor (store, resultObject) {
    let obj = JSON.parse(JSON.stringify(resultObject.data))

    if (obj.hasOwnProperty('relationships')) {
      obj.relationships = this.addRelationshipResolvers(store, obj.relationships)
    }

    obj.hasRelationship = name => {
      return obj.hasOwnProperty('relationships') && obj.relationships.hasOwnProperty(name) && obj.relationships[name].data.length !== 0
    }

    return obj
  }

  /**
   *
   * @param {Vuex.Store} store
   * @param {object} resultObjectRelationships
   */
  addRelationshipResolvers (store, resultObjectRelationships) {
    for (const relatedObjectType in resultObjectRelationships) {
      if (resultObjectRelationships.hasOwnProperty(relatedObjectType)) {
        let isToManyRelationship = resultObjectRelationships[relatedObjectType].data.constructor === Array

        resultObjectRelationships[relatedObjectType].get = this.resolveToOneRelationship(
          store,
          resultObjectRelationships[relatedObjectType],
          isToManyRelationship
        )

        if (isToManyRelationship) {
          resultObjectRelationships[relatedObjectType].list = this.resolveToManyRelationship(
            store,
            resultObjectRelationships[relatedObjectType]
          )
        }
      }
    }

    return resultObjectRelationships
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
