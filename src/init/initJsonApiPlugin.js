import { ResourcefulAPI } from '../api/ResourcefulApi'
import { checkConfigProperty } from '../helpers/checkConfigProperty'
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
  const api = new ResourcefulAPI()

  if (checkConfigProperty(config, 'router')) {
    api.setupResourcefulRequests(config.router)
  }

  if (checkConfigProperty(config, 'baseUrl')) {
    api.setBaseUrl(config.baseUrl)
  }

  if (checkConfigProperty(config, 'preprocessingCallbacks', false)) {
    api.setPreprocessingCallbacks(config.preprocessingCallbacks)
  }

  if (checkConfigProperty(config, 'errorCallbacks', false)) {
    api.setErrorCallbacks(config.errorCallbacks)
  }

  let modulesToRegister = []
  if (checkConfigProperty(config, 'apiModules', false)) {
    modulesToRegister = config.apiModules
  }

  if (checkConfigProperty(config, 'headers', false)) {
    api.addHeaders(config.headers)
  }

  return store => {
    api.setupModules(store, modulesToRegister)

    store.api = api

    store.createPresetModule = createPresetModule(store, api)

    store.subscribe((mutation, state) => {
      // console.dir(mutation, state)
    })
  }
}
