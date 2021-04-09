import { ModuleBuilder } from '../ModuleBuilder'
import { ResourceProxy } from '../../api/ResourceProxy'

/**
 * Check if a module is registered in the store
 *
 * @param {Vuex} store
 * @param {String} moduleName
 */
export function isMissingModule (store, moduleName) {
  return Object.keys(store._modules.root._children).indexOf(moduleName) < 0
}

/**
 * Register a standalone module to the store.
 *
 * @param {Vuex} store
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function registerMissingModule (store, api, moduleName) {
  const builder = new ModuleBuilder(store, api, moduleName, api[moduleName] ?? new ResourceProxy(), { standalone: true })

  store.registerModule(
    moduleName,
    builder.build()
  )
}
