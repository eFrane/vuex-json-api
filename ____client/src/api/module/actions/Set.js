export function set () {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      const [ vuexFns, id, data ] = argArray

      vuexFns.commit('set', { id, data })
    }
  })
}
