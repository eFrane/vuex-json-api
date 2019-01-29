import Vue from 'vue'

function isItemOnlyApi (supportedApiMethods) {
  return !supportedApiMethods.hasOwnProperty('list')
}

function isDeletable (supportedApiMethods) {
  return !supportedApiMethods.hasOwnProperty('delete')
}

export class ApiModuleBuilder {
  /**
   *
   * @param api ResourcefulApi
   * @param moduleName string
   * @param supportedApiMethods object
   */
  build (api, moduleName, supportedApiMethods) {
    let module = {
      namespaced: true,
      state: {},
      mutations: {},
      actions: {}
    }

    const isItemOnly = isItemOnlyApi(supportedApiMethods)

    module.state     = this.initState(isItemOnly)
    module.mutations = this.createMutations(isItemOnly, supportedApiMethods)
    module.actions   = this.createActions(api, moduleName, supportedApiMethods)

    return module
  }

  /**
   *
   * @param isItemOnly Boolean
   */
  initState (isItemOnly) {
    return (() => {
      if (isItemOnly) {
        return {}
      } else {
        return { list: {} }
      }
    })()
  }

  createMutations (isItemOnly, supportedApiMethods) {
    // we're dealing with proxys, this *will* get lost
    let builder = this

    /**
     * When applying a proxy to a mutation:
     * > target: the module's state
     * > thisArg: the store
     * > argArray: [the module's state, ...otherMutationArguments]
     *
     * @type {Function}
     */
    let reset = new Proxy((state) => {}, {
      apply (target, thisArg, argArray) {
        argArray[0] = builder.initState(isItemOnly)
      }
    })

    let set = () => {}

    if (isItemOnly) {
      set = new Proxy((state, payload) => {}, {
        apply (target, thisArg, argArray) {
          Vue.set(argArray, 0, argArray[1])
        }
      })
    }

    if (!isItemOnly) {
      set = new Proxy((state, payload) => {}, {
        apply (target, thisArg, argArray) {
          const payload = argArray[1]
          Vue.set(argArray[0].list, payload.id, payload.data)
        }
      })
    }

    let unset = () => {}

    if (isDeletable(supportedApiMethods)) {
      if (isItemOnly) {
        unset = reset
      }

      if (!isItemOnly) {
        unset = new Proxy((state, payload) => {}, {
          apply (target, thisArg, argArray) {
            Vue.delete(argArray[0].list, argArray[1])
          }
        })
      }
    }

    return {
      reset,
      set,
      unset
    }
  }

  createActions (api, moduleName, supportedApiMethods) {
    let actions = {}
    let emptyFn = () => {}

    // TODO: get/set are only implemented for listable entities atm

    actions['get'] = new Proxy(emptyFn, {
      apply (target, thisArg, argArray) {
        let commit = argArray[0]['commit']
        let id = argArray[1]

        return api[moduleName].get({ id }).then(data => {
          commit('set', { id: data[moduleName][id].id, data: data[moduleName][id] })
        })
      }
    })

    actions['set'] = new Proxy(emptyFn, {
      apply (target, thisArg, argArray) {
        let commit = argArray[0]['commit']
        let id = argArray[1]

        commit('set', { id: data[moduleName][id].id, data: data[moduleName][id] })
      }
    })

    if (!isItemOnlyApi(supportedApiMethods)) {
      actions['list'] = new Proxy(emptyFn, {
        apply (target, thisArg, argArray) {
          return api[moduleName].list().then(data => {
            let commit = argArray[0]['commit']
            let elements = data[moduleName];

            for (const id in elements) {
              if (elements.hasOwnProperty(id)) {
                commit('set', { id: elements[id].id, data: elements[id] })
              }
            }
          })
        }
      })

      actions['setList'] = new Proxy(emptyFn, {
        apply (target, thisArg, argArray) {
          let commit = argArray[0]['commit']
          let elements = argArray[1];

          for (const element in elements) {
            if (elements.hasOwnProperty(id)) {
              commit('set', { id: elements[id].id, data: elements[id] })
            }
          }
        }
      })
    }

    return actions
  }
}
