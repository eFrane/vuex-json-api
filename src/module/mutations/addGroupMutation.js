import { initialState } from '../State'
import Vue from 'vue'

/**
 * Turn the state object into a group state object
 *
 * @param {Object} state
 * @param {String} groupName
 */
export function addGroupMutation (state, groupName) {
  if (!state.hasOwnProperty('groups')) {
    Vue.set(state, 'groups', {})
  }

  Vue.set(state.groups, groupName, initialState(true))
}
