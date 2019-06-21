import Vue from 'vue'
import {ResourceObject} from '../ResourceObject'

export function setItemMutation (store, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [state, payload]) {
      if (isCollection) {
        Vue.set(state.items, payload.id, new ResourceObject(store, payload))
        return
      }

      Vue.set(state, 'item', payload)
    }
  })
}
