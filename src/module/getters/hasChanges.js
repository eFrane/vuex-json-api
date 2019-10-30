import { diff } from 'deep-object-diff'

/**
 * Determine if an object has been changed
 * @param {Object} state
 */
export function hasChanges (isCollection) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [state]) {
      const currentState = (isCollection) ? state.items : state.item
      const initialState = this.initial

      return diff(initialState, currentState) === {}
    }
  })
}
