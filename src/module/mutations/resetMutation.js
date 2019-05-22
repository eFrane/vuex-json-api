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
      argArray[0] = initialState(isCollection)
    }
  })
}
