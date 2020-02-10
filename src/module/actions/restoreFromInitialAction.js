export function restoreFromInitialAction (moduleName, presetModuleName, isCollection) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [vuexFns, id]) {
      let item

      if (presetModuleName === null) {
        item = isCollection ? thisArg.state[moduleName].initial[id] : thisArg.state[moduleName].initial
      } else {
        item = isCollection ? thisArg.state[moduleName][presetModuleName].initial[id] : item = thisArg.state[moduleName][presetModuleName].initial
      }

      vuexFns.commit('set', { id: id, data: item })
    }
  })
}
