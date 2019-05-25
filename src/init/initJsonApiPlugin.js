import { ResourcefulAPI } from '../api/ResourcefulApi'
import { Router } from '../route/Router'
import { Api } from '../api/Api'

/**
 *
 * @param {object} config
 * @param {String} property
 */
function checkConfigProperty (config, property) {
  if (typeof config === 'object' && config.hasOwnProperty(property)) {
    return true
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

  return store => {
    store.api = new ResourcefulAPI(router, store)
    // store.subscribe((mutation, state) => {
    //   console.dir(mutation, state)
    // })
  }
}
