import { ResourcefulAPI } from '../api/ResourcefulApi'
import { Router } from '../route/Router'
import { Api } from '../api/Api'

/**
 *
 * @param {object} config
 * @param {String} property
 * @param {Boolean} isRequiredProp
 */
function checkConfigProperty (config, property, isRequiredProp = true) {
  if (typeof config === 'object' && config.hasOwnProperty(property) && isRequiredProp) {
    return true
  }

  if (false === isRequiredProp) {
    return false
  }

  throw new Error('Missing configuration property: ' + property)
}

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

  let router

  if (config instanceof Router) {
    api.setupResourcefulRequests(router)
  } else if (checkConfigProperty(config, 'router')) {
    api.setupResourcefulRequests(config.router)
  }

  if (checkConfigProperty(config, 'baseUrl')) {
    api.setBaseUrl(config.baseUrl)
  }

  if (checkConfigProperty(config, 'preprocessingCallbacks', false)) {
    api.setPreprocessingCallbacks(config.setPreprocessingCallbacks)
  }

  let modulesToRegister = []
  if (checkConfigProperty(config, 'modules', false)) {
    modulesToRegister = config.modules
  }

  return store => {
    Api.setupModules(store, modulesToRegister)

    store.api = api
    // store.subscribe((mutation, state) => {
    //   console.dir(mutation, state)
    // })
  }
}
