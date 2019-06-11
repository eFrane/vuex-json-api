import { initialState } from '../State'

/**
 * Proxy for resetting a Module
 *
 * @param {Boolean} isCollection
 */
export function resetItemsMutation (isCollection) {
  /* eslint-disable no-new */
  return new Proxy((state) => {}, {
    apply (target, thisArg, argArray) {
      let [state, group] = argArray

      let initial = initialState(isCollection)

      if (isCollection) {
        Vue.set(state, 'items', initial.items)
      }

      if (group !== null) {
        Vue.set(state.groups[group], 'items', initial.items)
        return
      }

      if (!isCollection) {
        Vue.set(state.item, initial.item)
      }
    }
  })
}
