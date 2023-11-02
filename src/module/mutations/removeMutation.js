/**
 * Remove a ResourceObject from a module's item(s)
 *
 * As with most mutations, the behaviour of deletion is slightly
 * different depending on wether we're dealing with a collection or
 * a single item.
 *
 * If we're working on a collection, this mutation has to called as
 * `commit('module/remove', id)`, while, when working with an item,
 * calling `commit('module/remove')` is sufficient. For convenience,
 * any payload given is ignored when in item-only operation.
 *
 * @param {Boolean} isCollection
 */
export function removeMutation (isCollection) {
  return new Proxy((state, payload) => {}, {
    apply (target, thisArg, [state, id]) {
      if (isCollection) {
        const idx = state.items.findIndex(el => el.id === id)
        state.items.splice(idx, 1)

      } else {
        state.item = {}
      }
    }
  })
}
