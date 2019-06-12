import Vue from 'vue'
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
        Vue.set(state, 'initial', initial.initial)
      }

      if (group !== null) {
        Vue.set(state.groups[group], 'items', initial.items)
        Vue.set(state.groups[group], 'initial', initial.initial)
        return
      }

      if (!isCollection) {
        Vue.set(state.item, initial.item)
        Vue.set(state.item, initial.initial)
      }
    }
  })
}
