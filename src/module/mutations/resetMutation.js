import { initialState } from '../State'

/**
 * Proxy for resetting a Module
 *
 * @param {Boolean} isCollection
 */
export function resetMutation (isCollection) {
  /* eslint-disable no-new */
  return new Proxy((state) => {}, {
    apply (target, thisArg, argArray) {
      let [state, group] = argArray

      if (group !== null) {
        state.groups[group] = initialState(isCollection)
        return
      }

      state = initialState(isCollection)
    }
  })
}
