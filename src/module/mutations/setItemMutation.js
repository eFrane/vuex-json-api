/**
 *
 * @param {ResourceBuilder} resourceBuilder
 * @param {boolean} isCollection
 */
export function setItemMutation (resourceBuilder, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [state, payload]) {
      if (isCollection) {
        state.items[payload.id] = resourceBuilder.build(payload)
        return
      }

      state.item = payload
    }
  })
}
