import { hasRelationship } from './hasRelationship'
import { hasLoadableRelationship } from './hasLoadableRelationship'
import { hasLoadedRelationship } from './hasLoadedRelationship'
import { listRelationship } from './listRelationship'
import { loadRelationship } from './loadRelationship'
import { getRelationship } from './getRelationship'

export class ResourceBuilder {
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
  */
  build (jsonResourceObject) {
    const obj = JSON.parse(JSON.stringify(jsonResourceObject.data)) // why tho?

    obj.hasRelationship = hasRelationship(obj)
    obj.hasLoadableRelationship = hasLoadableRelationship(obj)
    obj.hasLoadedRelationship = hasLoadedRelationship(obj)

    obj.get = (attributeName) => Object.prototype.hasOwnProperty.call(obj.attributes, attributeName) ? obj.attributes[attributeName] : new Error(`attribute "${attributeName}" not found`)

    if (obj.hasRelationship) {
      this.buildRelationshipMethods(obj)
    }

    return obj
  }

  /**
   * Adds Methods (get, load, list) to the relationships for getting / loading them
   * Adds Shorthand Methods (rel / loadRel)
   *
   * @param {Object} jsonResourceObject
   */
  buildRelationshipMethods (obj) {
    const relationships = obj.relationships

    for (const currentRelationshipName in relationships) {
      if (Object.prototype.hasOwnProperty.call(relationships, currentRelationshipName)) {
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

    // shorthand variant
    obj.loadRel = (relationshipName) => {
      return loadRelationship(this.store, obj.id, obj.type, relationships[relationshipName], getRelationshipConfig(relationships[relationshipName]))()
    }
    obj.rel = (relationshipName) => {
      if (getRelationshipConfig(relationships[relationshipName]).isToMany) {
        return listRelationship(this.store, relationships[relationshipName])()
      } else {
        return getRelationship(this.store, relationships[relationshipName], getRelationshipConfig(relationships[relationshipName]))()
      }
    }
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

/**
 * Config Getter for the RelationshipMethod
 *
 * @param relatedObject
 * @return {{isToMany: boolean}}
 */
function getRelationshipConfig (relatedObject) {
  return {
    isToMany: relatedObject.data.constructor === Array
  }
}
