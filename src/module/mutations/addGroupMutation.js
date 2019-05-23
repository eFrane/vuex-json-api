import { initialState } from '../State'
import Vue from 'vue'

export function addGroupMutation (store, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const [state, group] = argArray

      if (!state.hasOwnProperty('groups')) {
        Vue.set(state, 'groups', {})
      }

      Vue.set(state.groups, group, initialState(isCollection))
    }
  })
}
