export function restoreFromInitialAction (moduleName, presetModuleName, isCollection) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [vuexFns, id]) {
      let item

      if (presetModuleName === null) {
        if (isCollection) {
          item = thisArg.state[moduleName].initial[id]
        }

        if (!isCollection) {
          item = thisArg.state[moduleName].initial
        }
      } else {
        if (isCollection) {
          item = thisArg.state[moduleName][presetModuleName].initial[id]
        }

        if (!isCollection) {
          item = thisArg.state[moduleName][presetModuleName].initial
        }
      }

      vuexFns.commit('set', { id: id, data: item })
    }
  })
}
