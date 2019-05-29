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
 * @param {Router|object} config or router
 */
export function initJsonApiPlugin (config) {
  let router

  if (config instanceof Router) {
    router = config
  } else if (checkConfigProperty(config, 'router')) {
    router = config.router
  }

  if (checkConfigProperty(config, 'baseUrl')) {
    Api.setBaseUrl(config.baseUrl)
  }

  let modulesToRegister = []
  if (checkConfigProperty(config, 'modules', false)) {
    modulesToRegister
  }

  return store => {
    store.api = new ResourcefulAPI(router, store, modulesToRegister)
    // store.subscribe((mutation, state) => {
    //   console.dir(mutation, state)
    // })
  }
}
