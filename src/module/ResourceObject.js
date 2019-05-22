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
        console.dir(arguments)
        /*
          thisArg is the relationship obj with `data` and `get()` function;
          should return the objects from the related modules

          what if they are not loaded?

          options:

          a) throw an error indicating the missing objects
          b) turn this into an async function which only returns once the items are loaded
        */
      }
    })

    // TODO: if relationship is a toMany, it should also have an all() method or something like that
    // TODO: to get the collection of all related items
  }
}
