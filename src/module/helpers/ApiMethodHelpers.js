import { hasOwn } from '../../shared/utils'

function checkPropertyOnObject (obj, property) {
  return typeof obj === 'object' && hasOwn(obj, property)
}

/**
 * Check whether the api supports collections
 *
 * @param {object} apiMethods supported api methods (list, get, update, delete)
 */
function isCollection (apiMethods) {
  return checkPropertyOnObject(apiMethods, 'list')
}

function allowsModification (apiMethods) {
  return checkPropertyOnObject(apiMethods, 'update')
}

function allowsReplacement (apiMethods) {
  return checkPropertyOnObject(apiMethods, 'replace')
}

function allowsCreation (apiMethods) {
  return checkPropertyOnObject(apiMethods, 'create')
}

function allowsDeletion (apiMethods) {
  return checkPropertyOnObject(apiMethods, 'delete')
}

function hasRelated (apiMethods) {
  return checkPropertyOnObject(apiMethods, 'related')
}

export {
  allowsCreation,
  allowsDeletion,
  allowsModification,
  allowsReplacement,
  hasRelated,
  isCollection
}
