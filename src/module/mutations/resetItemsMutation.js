import { initialState } from '../State'

/**
 * Reset a module's items and initial items state
 *
 * @param {Boolean} isCollection
 */
export function resetItemsMutation (isCollection) {
  return new Proxy((state) => {}, {
    apply (target, thisArg, [state]) {
      const initial = initialState(isCollection)

      if (isCollection) {
        state.items = initial.items
        state.initial = initial.initial
      }

      if (!isCollection) {
        state.item = initial.item
        state.item = initial.initial
      }
    }
  })
}
