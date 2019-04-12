import { Router } from '../api/Router'
import { ResourcefulAPI } from '../api/ResourcefulApi'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function prepareModuleHashMap (modules) {
  let moduleHashMap = {}

  for (let idx in modules) {
    if (modules.hasOwnProperty(idx)) {
      let module = modules[idx]
      moduleHashMap[module.name] = module
    }
  }

  return moduleHashMap
}

/**
 * Create Vuex Store with API Plugin
 *
 * @param modules non-dynamic modules
 * @returns {Promise<Store>}
 */
export function createVuexStore (modules) {
  let router = new Router()

  return router
    .updateRoutes()
    .then(router => {
      const store = new Vuex.Store({
        strict: true,

        modules: prepareModuleHashMap(modules),

        plugins: [
          store => {
            store.api = new ResourcefulAPI(router, store)
          }
        ]
      })

      if (process.env.NODE_ENV === 'development') {
        window.store = store
      }

      return store
    })
}
