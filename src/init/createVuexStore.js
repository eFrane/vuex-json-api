import Vue from 'vue'
import Vuex from 'vuex'

import { initJsonApiPlugin } from './initJsonApiPlugin'

Vue.use(Vuex)

/**
 * Converts a module listing object (e.g. `{ myModule: myModule }`)
 * to the expected syntax for module registration.
 *
 * By default, this Vuex usage interpretation expects non-api-bound
 * modules to have a `name`-property which defines their namespaced
 * name. This is necessary to facilitate auto-registration of the modules.
 *
 * N.b.: There is no checking done to avoid overwrites of these modules
 * by later-to-be-initialized api-bound modules.
 *
 * @param {object|array} modules
 */
export function prepareModuleHashMap (modules) {
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
 * @param {object} staticModules non-dynamic modules
 * @param {route.Router} router
 * @returns {Promise<Store>}
 */
export async function createVuexStore (staticModules, router) {
  return router
    .updateRoutes()
    .then(router => {
      const store = new Vuex.Store({
        strict: true,
        modules: prepareModuleHashMap(staticModules),
        plugins: [
          initJsonApiPlugin(router)
        ]
      })

      if (process.env.NODE_ENV === 'development') {
        window.store = store
      }

      return store
    })
}
