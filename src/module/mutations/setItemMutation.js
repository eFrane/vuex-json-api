import Vue from 'vue'
import {ResourceObject} from '../ResourceObject'

export function setItemMutation (store, isCollection) {
  return new Proxy((state, payload) => {
  }, {
    apply (target, thisArg, argArray) {
      const [state, payload] = argArray

      if (isCollection) {
        Vue.set(state.items, payload.id, new ResourceObject(store, payload))
        return
      }

      Vue.set(state, 'item', payload)
    }
  })
}
