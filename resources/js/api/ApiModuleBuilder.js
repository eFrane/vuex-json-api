import Vue from 'vue'

function isItemOnlyApi (supportedApiMethods) {
  return !supportedApiMethods.hasOwnProperty('list')
}

function isDeletable (supportedApiMethods) {
  return !supportedApiMethods.hasOwnProperty('delete')
}

const emptyFn = () => {}

export class ApiModuleBuilder {
  constructor (store) {
    this.store = store
  }

  /**
   *
   * @param api ResourcefulApi
   * @param moduleName string
   * @param supportedApiMethods object
   */
  build (api, moduleName, supportedApiMethods) {
    console.time('api: build module ' + moduleName)
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

    console.timeEnd('api: build module ' + moduleName)

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
    // we're dealing with proxys, `this` *will* get lost
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
          Vue.set(argArray, 0, builder.addRelationshipNavigation(argArray[1]))
        }
      })
    }

    if (!isItemOnly) {
      set = new Proxy((state, payload) => {}, {
        apply (target, thisArg, argArray) {
          const payload = argArray[1]
          Vue.set(argArray[0].list, payload.id, builder.addRelationshipNavigation(payload.data))
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

  addRelationshipNavigation (item) {
    let builder = this

    if (item.hasOwnProperty('relationships')) {
      for (const type in item.relationships) {
        if (item.relationships.hasOwnProperty(type)) {
          item.relationships[type].get = new Proxy(emptyFn, {
            apply (target, thisArg, argArray) {
              // fun fact: arrays are objects which are constructed from the class Array
              let isToManyRelationship = thisArg.data.constructor === Array
              let relationshipType     = null
              let relationshipItemId   = null

              if (isToManyRelationship) {
                relationshipType   = thisArg.data[0].type
                relationshipItemId = thisArg.data[argArray[0]].id
              } else {
                relationshipType   = thisArg.data.type
                relationshipItemId = thisArg.data.id
              }

              let relationshipModule = builder.store.state[relationshipType]

              return relationshipModule.list[relationshipItemId]
            }
          })
        }

        // TODO: if relationship is a toMany, it should also have an all() method or something like that
        // TODO: to get the collection of all related items
      }
    }

    return item
  }

  createActions (api, moduleName, supportedApiMethods) {
    let actions = {}

    // TODO: get/set are only implemented for listable entities atm

    actions['get'] = new Proxy(emptyFn, {
      apply (target, thisArg, argArray) {
        let commit = argArray[0]['commit']

        return api[moduleName].get(argArray[1]).then(({ data }) => {
          commit('set', { id: data[moduleName][id].id, data: data[moduleName][id] })
        })
      }
    })

    /**
     *
     * @type {Store, Number, Object}
     */
    actions['set'] = new Proxy(emptyFn, {
      apply (target, thisArg, argArray) {
        let commit = argArray[0]['commit']
        let id     = argArray[1]
        let data   = argArray[2]

        commit('set', { id, data })
      }
    })

    if (!isItemOnlyApi(supportedApiMethods)) {
      actions['list'] = new Proxy(emptyFn, {
        apply (target, thisArg, argArray) {
          return api[moduleName].list(argArray[1]).then(({ data, meta }) => {
            let commit   = argArray[0]['commit']
            let elements = data[moduleName]

            for (const id in elements) {
              if (elements.hasOwnProperty(id)) {
                commit('set', { id: elements[id].id, data: elements[id] })
              }
            }

            if (meta.hasOwnProperty('includes')) {
              for (const includedModuleName in meta.includes) {
                if (meta.includes.hasOwnProperty(includedModuleName)
                  && meta.hasOwnProperty(includedModuleName)
                  && data.hasOwnProperty(includedModuleName)) {
                  for (const id in data[includedModuleName]) {
                    if (data[includedModuleName].hasOwnProperty(id)) {
                      commit(`{includedModulename}/set`, {
                        id: data[includedModuleName][id].id,
                        data: data[includedModuleName][id].data
                      })
                    } // srsly
                  } // what the hell
                } // stahp
              } // go home javascript
            } // you're drunk!
          }) // I mean it!
        } // staaaahp
      }) // for fucks sake!

      actions['setList'] = new Proxy(emptyFn, {
        apply (target, thisArg, argArray) {
          let commit   = argArray[0]['commit']
          let elements = argArray[1]

          for (const id in elements) {
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
