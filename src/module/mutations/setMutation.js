/**
 * Proxy for setting Resource Objects on a single item module
 *
 * The `Vuex.commit`-Syntax is
 *
 * `commit('module/set', receivedItemObject)`
 *
 * @param {Vuex.Store} store
 * @param {resource.Builder} resourceBuilder
 * @param {Boolean} isCollection
 */
export function setMutation (resourceBuilder, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [state, payload]) {
      const settablePayload = resourceBuilder.build(payload)

      state.item = settablePayload
      state.initial = settablePayload
    }
  })
}
