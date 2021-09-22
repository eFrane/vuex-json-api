import { hasOwn } from '../../shared/utils'
import Vue from 'vue'

/**
 * Proxy for setting Resource Objects on a collection module
 *
 * The `Vuex.commit`-Syntax is
 *
 * `commit('module/set', receivedCollectionObject)`
 *
 * @param {ResourceBuilder} resourceBuilder
 */
export function setAllMutation (resourceBuilder) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [state, payload]) {
      const settablePayload = resourceBuilder.build(payload)

      if (hasOwn(settablePayload, 'id')) {
        Vue.set(state.items, settablePayload.id, settablePayload)
        Vue.set(state.initial, settablePayload.id, settablePayload)
      } else {
        state.items = {...state.items, ...settablePayload}
        state.initial = {...state.initial, ...settablePayload}
      }
    }
  })
}
