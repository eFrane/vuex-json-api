import Vue from 'vue'

/**
 *
 * @param {resource.Builder} resourceBuilder
 * @param {boolean} isCollection
 */
export function setItemMutation (resourceBuilder, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [state, payload]) {
      if (isCollection) {
        Vue.set(state.items, payload.id, resourceBuilder.build(payload))
        return
      }

      Vue.set(state, 'item', payload)
    }
  })
}
