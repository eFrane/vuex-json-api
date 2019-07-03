/**
 * Check if an object has a loadable relationship
 *
 * @param {Object} obj
 */
export function hasLoadableRelationship (obj) {
  return name => !obj.hasLoadedRelationship(name) && obj.hasRelationship(name)
}
