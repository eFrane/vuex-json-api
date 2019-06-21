export function restoreFromInitialAction (moduleName, isCollection) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [vuexFns, id]) {
      let item

      if (isCollection) {
        item = thisArg.state[moduleName].initial[id]
      }

      if (!isCollection) {
        item = thisArg.state[moduleName].initial
      }

      vuexFns.commit('set', { id: id, data: item })
    }
  })
}
