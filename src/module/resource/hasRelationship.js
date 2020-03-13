import { hasOwn } from '../../shared/utils'

export function hasRelationship (obj) {
  return name => {
    return hasOwn(obj, 'relationships') &&
    hasOwn(obj.relationships, name) &&
    obj.relationships[name].data.length !== 0
  }
}
