export function restoreFromInitialAction(moduleName, isCollection) {
  return new Proxy(() => { }, {
    apply(target, thisArg, argArray) {
      let [vuexFns, id] = argArray
      let item

      if (isCollection) {
        item = thisArg.state[moduleName].initial[id]
      }

      if (!isCollection) {
        item = thisArg.state[moduleName].initial
      }

      vuexFns.commit('set', { group: null, id: id, data: item })
    }
  })
}
