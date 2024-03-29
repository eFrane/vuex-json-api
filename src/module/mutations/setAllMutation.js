import { hasOwn } from '../../shared/utils'

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
        state.items[settablePayload.id] = settablePayload
        state.initial[settablePayload.id] = settablePayload
      } else {
        state.items = { ...state.items, ...settablePayload }
        state.initial = { ...state.initial, ...settablePayload }
      }
    }
  })
}
