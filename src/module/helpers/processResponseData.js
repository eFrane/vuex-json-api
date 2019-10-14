import { setResourceObjectsForModule } from './setResourceObjectsForModule'
import { isMissingModule, registerMissingModule } from './missingModule'

/**
 * Process the (normalized) data part of a response
 *
 * @param {Vuex} vuexInstance
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} currentModule  name of the current storeModule
 * @param {Object} data           payload from request
 * @param {String} currentMethod  default = ''
 * @param {Object} module         storeModule
 */
/**
 *
 * @param {Store} vuexInstance
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} currentModule
 * @param {Object} data
 */
export function processResponseData (vuexInstance, vuexFns, api, currentModule, data, currentMethod = '', module = null) {
  for (let itemType in data) {
    let registeredModule = itemType
    if (typeof module !== 'undefined' && module.state.options.absoluteMethods.includes(currentMethod)) {
      registeredModule = currentModule
    } else if (!data.hasOwnProperty(itemType)) {
      continue
    }
    if (isMissingModule(vuexInstance, registeredModule)) {
      registerMissingModule(vuexInstance, api, registeredModule)
    }
    setResourceObjectsForModule(
      vuexFns,
      currentModule,
      registeredModule,
      data[itemType]
    )
  }
}
