import { setResourceObjectsForModule } from './setResourceObjectsForModule'
import { isMissingModule, registerMissingModule } from './missingModule'

/**
 * Process the (normalized) data part of a response
 *
 * @param {Vuex} vuexInstance
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 * @param {Object} data
 */
export function processResponseData (vuexInstance, vuexFns, api, moduleName, data, group = null) {
  for (let destinationModule in data) {
    if (isMissingModule(vuexInstance, destinationModule)) {
      registerMissingModule(vuexInstance, api, destinationModule)
    }

    if (data.hasOwnProperty(destinationModule)) {
      setResourceObjectsForModule(vuexFns, moduleName, destinationModule, data[destinationModule], group)
    }
  }
}
