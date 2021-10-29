import { setResourceObjectsForModule } from './setResourceObjectsForModule'
import { hasOwn } from '../../shared/utils'
import { ResourceProxy } from '../../api/ResourceProxy'
import { ModuleBuilder } from '../ModuleBuilder'

function isAllowedRelatedModule (relatedModule, currentMethod) {
  return relatedModule !== null &&
    relatedModule.state.options.absoluteMethods.includes(currentMethod)
}

/**
 * Check if a module is registered in the store
 *
 * @param {Vuex} store
 * @param {String} moduleName
 */
function isMissingModule (store, moduleName) {
  return Object.keys(store._modules.root._children).indexOf(moduleName) < 0
}

/**
 * Register a standalone module to the store.
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
function registerMissingModule (api, moduleName) {
  let resourceProxy = api[moduleName]
  if (!resourceProxy) {
    resourceProxy = new ResourceProxy()
  }

  const builder = new ModuleBuilder(
    api,
    moduleName,
    resourceProxy,
    { standalone: true }
  )

  api.store.registerModule(
    moduleName,
    builder.build()
  )
}

/**
 * Process the (normalized) data part of a response
 *
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} currentModule  name of the current storeModule
 * @param {Object} data           payload from request
 * @param {String} currentMethod  default = ''
 * @param {Object} relatedModule         storeModule
 */
export function processResponseData (
  vuexFns,
  api,
  currentModule,
  data,
  currentMethod = '',
  relatedModule = null
) {
  for (const itemType in data) {
    let registeredModule = itemType

    if (isAllowedRelatedModule(relatedModule, currentMethod)) {
      registeredModule = currentModule
    } else if (!hasOwn(data, itemType)) {
      // TODO: add error here, invalid resource format
      continue
    }

    if (isMissingModule(api.store, registeredModule)) {
      registerMissingModule(api, registeredModule)
    }

    setResourceObjectsForModule(
      vuexFns,
      currentModule,
      registeredModule,
      data[itemType]
    )
  }
}
