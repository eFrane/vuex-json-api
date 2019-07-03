/**
 * Check if an object has a loaded relationship
 *
 * @param {Object} obj
 */
export function hasLoadedRelationship (obj) {
  return name => {
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
}
