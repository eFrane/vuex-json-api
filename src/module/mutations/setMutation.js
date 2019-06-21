import Vue from 'vue'
import { ResourceObject } from '../ResourceObject'

/**
 * Proxy for setting Resource Objects on a Module
 *
 * Depending on the type of module (collection or single item)
 * setting has two different behaviours and thus also two different
 * signatures.
 *
 * The `Vuex.commit`-Syntaxes for those different styles are
 *
 * - `commit('module/set', object)` for single item modules and
 * - `commit('module/set', { id, object })` for collection-type modules
 *
 * Setting an object results in it being added to or updated in
 * the `item`/`items` property of the module state.
 *
 * @param {Vuex.Store} store
 * @param {Boolean} isCollection
 */
export function setMutation (store, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [state, payload]) {
      if (isCollection) {
        Vue.set(state.items, payload.id, new ResourceObject(store, payload))
        Vue.set(state.initial, payload.id, new ResourceObject(store, payload))

        return
      }

      Vue.set(state, 'item', new ResourceObject(store, payload))
      Vue.set(state, 'initial', new ResourceObject(store, payload))
    }
  })
}
