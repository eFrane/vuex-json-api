import { Builder } from '../Builder'

/**
 * Check if a module is registered in the store
 *
 * @param {Vuex} store
 * @param {String} moduleName
 */
export function isMissingModule (store, moduleName) {
  return Object.keys(store._modules.root._children).includes(moduleName)
}

/**
 * Register a standalone module to the store.
 *
 * @param {Vuex} store
 * @param {ResourcefulAPI} api
 * @param {String} moduleName
 */
export function registerMissingModule (store, api, moduleName) {
  store.registerModule(
    moduleName,
    new Builder(store, api, moduleName, {}, { standalone: true })
  )
}
