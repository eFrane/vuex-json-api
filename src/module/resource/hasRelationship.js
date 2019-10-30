export function hasRelationship (obj) {
  return name => {
    return Object.prototype.hasOwnProperty.call(obj, 'relationships') &&
    Object.prototype.hasOwnProperty.call(obj.relationships, name) &&
    obj.relationships[name].data.length !== 0
  }
}
