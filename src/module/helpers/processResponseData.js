import { setResourceObjectsForModule } from './setResourceObjectsForModule'
import { isMissingModule, registerMissingModule } from './missingModule'
import { hasOwn } from '../../shared/utils'

/**
 * Process the (normalized) data part of a response
 *
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} currentModule  name of the current storeModule
 * @param {Object} data           payload from request
 * @param {String} currentMethod  default = ''
 * @param {Object} module         storeModule
 */
export function processResponseData (vuexFns, api, currentModule, data, currentMethod = '', module = null) {
  for (const itemType in data) {
    let registeredModule = itemType

    if (module !== null &&
      module.state.options.absoluteMethods.includes(currentMethod)) {
      registeredModule = currentModule
    } else if (!hasOwn(data, itemType)) {
      // TODO: add error here, invalid resource format
      continue
    }

    if (isMissingModule(api.store, registeredModule)) {
      registerMissingModule(api.store, api, registeredModule)
    }

    setResourceObjectsForModule(
      vuexFns,
      currentModule,
      registeredModule,
      data[itemType]
    )
  }
}
