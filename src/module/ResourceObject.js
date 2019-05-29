export class ResourceObject {
  /**
   *
   * @param {Vuex.Store} store
   * @param {object} resultObject
   */
  constructor (store, resultObject) {
    this.store = store

    let obj = resultObject.data

    if (obj.hasOwnProperty('relationships')) {
      obj.relationships = this.addRelationshipResolvers(obj.relationships)
    }

    return obj
  }

  /**
   *
   * @param {object} resultObjectRelationships
   */
  addRelationshipResolvers (resultObjectRelationships) {
    for (const relatedObjectType in resultObjectRelationships) {
      if (resultObjectRelationships.hasOwnProperty(relatedObjectType)) {
        let isToManyRelationship = resultObjectRelationships[relatedObjectType].constructor === Array

        resultObjectRelationships[relatedObjectType].get = this.resolveToOneRelationship(
          resultObjectRelationships[relatedObjectType],
          isToManyRelationship
        )

        if (isToManyRelationship) {
          resultObjectRelationships[relatedObjectType].list = this.resolveToManyRelationship(
            resultObjectRelationships[relatedObjectType]
          )
        }
      }
    }

    return resultObjectRelationships
  }

  /**
   *
   * @param {Object} relatedObject
   */
  resolveToOneRelationship (relatedObject, isToManyRelationship) {
    return new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        let moduleName = relatedObject.type.toLower()
        let relatedModule = this.store[moduleName]

        if (isToManyRelationship) {
          let [requestedId] = argArray

          try {
            return relatedModule.items.filter(item => {
              return item.id === requestedId
            })[0]
          } catch (e) {
            throw new Error(`Related object ${relatedObject.id} not found in ${moduleName}`)
          }
        }

        return relatedModule.item
      }
    })
  }

  /**
   *
   * @param {Array} relatedObjects
   */
  resolveToManyRelationship (relatedObjects) {
    return new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        console.log(arguments)
      }
    })
  }
}
