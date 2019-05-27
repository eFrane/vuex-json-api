import { Builder } from "../Builder";
import { ResourcefulAPI } from "../../api/ResourcefulApi";

/**
 * Check if a module is registered in the store
 *
 * @param {Vuex} store
 * @param {String} moduleName
 */
export function isMissingModule (store, moduleName) {
  return store._modules.root._children.hasOwnProperty(moduleName)
}

/**
 * Register an empty module (state and default actions and mutations)
 * to the store. Empty modules default to being collection modules.
 *
 * @param {Vuex} store
 * @param {ResourcefulAPI} api
 * @param {String} moduleName
 */
export function registerMissingModule (store, api, moduleName) {
  store.registerModule(moduleName, new Builder(store, api, moduleName, [{ list: null }]))
}
