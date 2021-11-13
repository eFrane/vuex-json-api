import { ResourcefulApi } from '../api/ResourcefulApi'
import { checkConfigProperty } from '../shared/utils'
import { createPresetModule } from '../module/preset/createPresetModule'

/**
 * Initialize the API Plugin
 *
 * May receive a configuration object but at least
 * needs a configured router.
 *
 * @param {Router|Object} config or router
 */
export function initJsonApiPlugin (config) {
  const api = new ResourcefulApi()

  if (checkConfigProperty(config, 'router')) {
    api.setupResourcefulRequests(config.router)
  }

  if (checkConfigProperty(config, 'baseUrl')) {
    api.setBaseUrl(config.baseUrl)
  }

  if (checkConfigProperty(config, 'successCallbacks', false)) {
    api.setSuccessCallbacks(config.successCallbacks)
  }

  if (checkConfigProperty(config, 'errorCallbacks', false)) {
    api.setErrorCallbacks(config.errorCallbacks)
  }

  if (checkConfigProperty(config, 'requestCallbacks', false)) {
    api.setRequestCallbacks(config.requestCallbacks)
  }

  if (checkConfigProperty(config, 'responseCallbacks', false)) {
    api.setResponseCallbacks(config.responseCallbacks)
  }

  let apiModulesToRegister = []
  if (checkConfigProperty(config, 'apiModules', false)) {
    apiModulesToRegister = config.apiModules
  }

  if (checkConfigProperty(config, 'headers', false)) {
    api.addHeaders(config.headers)
  }

  return store => {
    api.setStore(store)
    api.setupApiModules(apiModulesToRegister)

    store.api = api

    store.getAvailableApiModules = api.getAvailableApiModules
    store.registerApiModule = api.registerApiModule

    store.createPresetModule = createPresetModule(store, api)

    store.subscribe((mutation, state) => {
      // console.dir(mutation, state)
    })
  }
}
