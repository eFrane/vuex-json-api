import Vue from 'vue'
import Vuex from 'vuex'

import { initJsonApiPlugin } from './initJsonApiPlugin'
import { checkConfigProperty } from '../helpers/checkConfigProperty'
import { hasOwn } from '../shared/utils'

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
  const moduleHashMap = {}

  for (const idx in modules) {
    if (hasOwn(modules, idx)) {
      const module = modules[idx]
      moduleHashMap[module.name] = module
    }
  }

  return moduleHashMap
}

/**
 * Create Vuex Store with API Plugin
 *
 * @see initJsonApiPlugin
 * @param {Object|Router} Can either just pass a router or a full config object
 * @returns {Promise<Store>}
 */
export async function createVuexStore (config) {
  const router = checkConfigProperty(config, 'router') ? config.router : null

  if (!router) {
    throw new Error('You must provide a router')
  }

  return router
    .updateRoutes()
    .then(router => {
      const staticModules = checkConfigProperty(config, 'staticModules', false)
        ? config.staticModules
        : {}

      const store = new Vuex.Store({
        strict: true,
        modules: prepareModuleHashMap(staticModules),
        plugins: [
          initJsonApiPlugin(config)
        ]
      })

      if (process.env.NODE_ENV === 'development') {
        window.store = store
      }

      return store
    })
}
