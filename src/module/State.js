import { item } from './state/item'
import { collection } from './state/collection'

/**
 * Return a new Object representing the initial state of a module
 *
 * The state is returned from inside a self-calling closure to
 * make absolutely sure we get pristine objects. This is a safety
 * measure to guard against unintended cross-module reference bindings.
 *
 * @param {Boolean} isCollection
 */
function initialState (isCollection) {
  return (() => {
    if (isCollection) {
      return JSON.parse(JSON.stringify(collection))
    } else {
      return JSON.parse(JSON.stringify(item))
    }
  })()
}

/**
 * Check whether the api supports collections
 *
 * @param {object} apiMethods supported api methods (list, get, update, delete)
 */
function isCollection (apiMethods) {
  return typeof apiMethods === 'object' && apiMethods.hasOwnProperty('list')
}

function allowsModification (apiMethods) {
  return typeof apiMethods === 'object' && apiMethods.hasOwnProperty('update')
}

function allowsReplacement (apiMethods) {
  return typeof apiMethods === 'object' && apiMethods.hasOwnProperty('replace')
}

function allowsCreation (apiMethods) {
  return typeof apiMethods === 'object' && apiMethods.hasOwnProperty('create')
}

function allowsDeletion (apiMethods) {
  return typeof apiMethods === 'object' && apiMethods.hasOwnProperty('delete')
}

function hasRelated (apiMethods) {
  return typeof apiMethods === 'object' && apiMethods.hasOwnProperty('related') && typeof apiMethods.related === 'object'
}

export {
  allowsCreation,
  allowsDeletion,
  allowsModification,
  allowsReplacement,
  hasRelated,
  initialState,
  isCollection
}
