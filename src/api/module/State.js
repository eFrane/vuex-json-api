/**
 * Return a new Object representing the initial state of a module
 *
 * The state is returned from inside a self-calling closure to
 * make absolutely sure we get pristine objects. This is a safety
 * measure to guard against unintended cross-module reference bindings.
 *
 * ## The fields
 *
 * **item/items**:
 *
 * This is the container for the normalized resource objects of the
 * module. If the module is not a collection, there will always only
 * be one item, thus it's singularized.
 *
 * **initial**:
 *
 * Once any data-changing mutation is applied to the state,
 * the store will automatically copy the affected resource object
 * into `initial`. This is always either empty or a map of `id => ResourceObject`
 *
 * **currentPage/totalPages**
 *
 * If the API responses contain pagination information in `meta`
 * this will be stored in these properties and subsequently
 * used/updated upon navigation
 *
 * @param {Boolean} isCollection
 */
function initialState (isCollection) {
  return (() => {
    if (isCollection) {
      return {
        loading: false,
        items: {},
        initial: {},
        currentPage: null,
        totalPages: null
      }
    } else {
      return {
        loading: false,
        item: {},
        initial: {}
      }
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

export {
  allowsCreation,
  allowsDeletion,
  allowsModification,
  allowsReplacement,
  initialState,
  isCollection
}
