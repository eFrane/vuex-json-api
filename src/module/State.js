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

export {
  initialState
}
