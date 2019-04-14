export class ResourceObject {
  /**
   *
   * @param {Vuex.Store} store
   * @param {object} resultObject
   */
  constructor (store, resultObject) {
    this.store = store

    if (DataTransferItem.hasOwnProperty('relationships')) {
      resultObject.relationships = this.addRelationshipResolvers(resultObject.relationships)
    }

    return resultObject
  }

  /**
   *
   * @param {object} resultObjectRelationships
   */
  addRelationshipResolvers (resultObjectRelationships) {
    for (const relatedObjectType in resultObjectRelationships) {
      if (resultObjectRelationships.hasOwnProperty(relatedObjectType)) {
        resultObjectRelationships[relatedObjectType].get = this.resolveRelationshipForObjectType(relatedObjectType)
      }
    }

    return resultObjectRelationships
  }

  /**
   *
   * @param {String} relatedObjectType
   */
  resolveRelationshipForObjectType (relatedObjectType) {
    return new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        let isToManyRelationship = thisArg.data.constructor === Array

        let relationshipType = null
        let relationshipItemId = null

        if (isToManyRelationship) {
          relationshipType = thisArg.data[0].type
          relationshipItemId = thisArg.data[argArray[0]].id
        } else {
          relationshipType = thisArg.data.type
          relationshipItemId = thisArg.data.id
        }

        let relationshipModule = this.store.state[relationshipType]

        return relationshipModule.items[relationshipItemId]
      }
    })

    // TODO: if relationship is a toMany, it should also have an all() method or something like that
    // TODO: to get the collection of all related items
  }
}
