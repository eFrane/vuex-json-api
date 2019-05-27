import { setResourceObjectsForModule } from './setResourceObjectsForModule'
import { isMissingModule, registerMissingModule } from './missingModule'

/**
 * Process the (normalized) data part of a response
 *
 * @param {Vuex} vuexInstance
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 * @param {Object} data
 */
export function processResponseData (vuexInstance, api, moduleName, data) {
  for (let destinationModule in data) {
    if (isMissingModule(vuexInstance, destinationModule)) {
      registerMissingModule(vuexInstance, api, destinationModule)
    }

    if (data.hasOwnProperty(destinationModule)) {
      setResourceObjectsForModule(vuexFns, moduleName, destinationModule, data[destinationModule], group)
    }
  }
}
