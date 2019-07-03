import { hasRelationship } from './hasRelationship'
import { hasLoadableRelationship } from './hasLoadableRelationship'
import { hasLoadedRelationship } from './hasLoadedRelationship'
import { listRelationship } from './listRelationship'
import { loadRelationship } from './loadRelationship'
import { getRelationship } from './getRelationship'

export class ResourceObjectBuilder {
  constructor (store) {
    this.store = store
  }

  /**
  * Returns a new functional resource object
  *
  * Functional resource objects are structurally identical to
  * normal JSON:API resource objects but are enhanced with
  * methods to simplify access to relationships.
  *
  * @param {Object} jsonResourceObject
  * @param {Vuex.Store} store
  */
  build (jsonResourceObject) {
    let obj = JSON.parse(JSON.stringify(jsonResourceObject.data)) // why tho?

    obj.hasRelationship = hasRelationship(obj)
    obj.hasLoadableRelationship = hasLoadableRelationship(obj)
    obj.hasLoadedRelationship = hasLoadedRelationship(obj)

    if (obj.hasOwnProperty('relationships')) {
      this.buildRelationshipMethods(obj)
    }

    return obj
  }

  buildRelationshipMethods (obj) {
    const relationships = obj.relationships

    for (const currentRelationshipName in relationships) {
      if (relationships.hasOwnProperty(currentRelationshipName)) {
        const relatedObject = relationships[currentRelationshipName]

        const relationshipConfig = {
          isToMany: relatedObject.data.constructor === Array
        }

        relatedObject.get = getRelationship(this.store, relatedObject, relationshipConfig)
        relatedObject.load = loadRelationship(this.store, obj.id, obj.type, relatedObject, relationshipConfig)

        if (relationshipConfig.isToMany) {
          relatedObject.list = listRelationship(this.store, relatedObject)
        }

        relationships[currentRelationshipName] = relatedObject
      }
    }

    obj.relationships = relationships
  }

  /**
  * Convenience method to get a spec-conforming version of
  * a resource object
  *
  * @param {Object} functionalResourceObject
  */
  static strip (functionalResourceObject) {
    return JSON.parse(JSON.stringify(functionalResourceObject))
  }
}
