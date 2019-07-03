export function hasRelationship (obj) {
  return name => {
    return obj.hasOwnProperty('relationships') &&
    obj.relationships.hasOwnProperty(name) &&
    obj.relationships[name].data.length !== 0
  }
}
