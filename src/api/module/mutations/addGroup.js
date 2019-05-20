import { initialState } from '../State'
import Vue from 'vue'

export function addGroup (store, isCollection) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const [state, group] = argArray

      /* TODO: replacing the state with a group state seems to be a little more complicated */
      if (!state.hasOwnProperty('groups')) {
        state.groups = {}
      }

      Vue.set(state.groups, group, initialState(isCollection))
    }
  })
}
