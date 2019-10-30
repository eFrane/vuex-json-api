import Vue from 'vue'
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
        Vue.set(state, 'items', initial.items)
        Vue.set(state, 'initial', initial.initial)
      }

      if (!isCollection) {
        Vue.set(state, 'item', initial.item)
        Vue.set(state, 'item', initial.initial)
      }
    }
  })
}
