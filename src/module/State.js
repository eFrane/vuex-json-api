const collection = {
  loading: false,
  items: {},
  initial: {},
  currentPage: null,
  totalPages: null,
  urlInfo: {},
  options: {}
}

const item = {
  loading: false,
  item: {},
  initial: {},
  options: {}
}

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
      return Object.assign({}, collection)
    } else {
      return Object.assign({}, item)
    }
  })()
}

export {
  initialState
}
