import { hasRelationship } from './hasRelationship'
import { hasLoadableRelationship } from './hasLoadableRelationship'
import { hasLoadedRelationship } from './hasLoadedRelationship'
import { listRelationship } from './listRelationship'
import { loadRelationship } from './loadRelationship'
import { getRelationship } from './getRelationship'
import { deref, hasOwn } from '../../shared/utils'

/**
 * @class ResourceBuilder
 */
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
    if (hasOwn(jsonResourceObject, 'id')) {
      const item = deref(jsonResourceObject) // why tho?

      return this.functionalizeItem(item)
    }

    const items = {}
    for (const itemId in jsonResourceObject) {
      items[itemId] = this.functionalizeItem(deref(jsonResourceObject[itemId]))
    }

    return items
  }

  functionalizeItem (item) {
    item.hasRelationship = hasRelationship(item)
    item.hasLoadableRelationship = hasLoadableRelationship(item)
    item.hasLoadedRelationship = hasLoadedRelationship(item)

    item.get = (attributeName) => hasOwn(item.attributes, attributeName) ? item.attributes[attributeName] : new Error(`attribute "${attributeName}" not found`)

    if (hasOwn(item, 'relationships')) {
      this.buildRelationshipMethods(item)
    }

    return item
  }

  /**
   * Adds Methods (get, load, list) to the relationships for getting / loading them
   * Adds Shorthand Methods (rel / loadRel)
   *
   * @param {Object} obj jsonResourceObject
   */
  buildRelationshipMethods (obj) {
    const relationships = obj.relationships

    for (const currentRelationshipName in relationships) {
      if (obj.hasRelationship(currentRelationshipName)) {
        const relatedObject = relationships[currentRelationshipName]

        const relationshipConfig = {
          isToMany: relatedObject.data.constructor === Array
        }

        relatedObject.get = getRelationship(this.store, relatedObject, relationshipConfig)
        relatedObject.load = loadRelationship(this.store, obj.id, relatedObject, relationshipConfig)

        if (relationshipConfig.isToMany) {
          relatedObject.list = listRelationship(this.store, relatedObject)
        }

        relationships[currentRelationshipName] = relatedObject
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
  }

  /**
  * Convenience method to get a spec-conforming version of
  * a resource object
  *
  * @param {Object} functionalResourceObject
  */
  static strip (functionalResourceObject) {
    return deref(functionalResourceObject)
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
    isToMany: relatedObject.data && relatedObject.data.constructor === Array
  }
}
