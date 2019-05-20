export function addGroup () {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const [ vuexFns, group ] = argArray

      vuexFns.commit('addGroup', group)
    }
  })
}
