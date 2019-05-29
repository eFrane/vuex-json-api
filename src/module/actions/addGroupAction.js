/**
 * Add a collection group
 *
 * @param {Object} vuexFns
 * @param {String} groupName
 */
export function addGroupAction (vuexFns, groupName) {
  vuexFns.commit('addGroup', groupName)
}
