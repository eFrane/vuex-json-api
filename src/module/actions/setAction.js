export function setAction (vuexFns, id, data) {
  vuexFns.commit('set', { id, data })
}
