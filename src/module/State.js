import { item } from './state/item'
import { collection } from './state/collection'
import { deref } from '../shared/utils'

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
      return deref(collection)
    } else {
      return deref(item)
    }
  })()
}

export {
  initialState
}
