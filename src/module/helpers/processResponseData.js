import { setResourceObjectsForModule } from './setResourceObjectsForModule'
import { isMissingModule, registerMissingModule } from './missingModule'

/**
 * Process the (normalized) data part of a response
 *
 * @param {Vuex} vuexInstance
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} currentModule
 * @param {Object} data
 */
/**
 *
 * @param {Store} vuexInstance
 * @param {Object} vuexFns
 * @param {ResourcefulApi} api
 * @param {String} currentModule
 * @param {Object} data
 */
export function processResponseData (vuexInstance, vuexFns, api, currentModule, data) {
  for (let destinationModule in data) {
    if (!data.hasOwnProperty(destinationModule)) {
      continue
    }

    if (isMissingModule(vuexInstance, destinationModule)) {
      registerMissingModule(vuexInstance, api, destinationModule)
    }

    setResourceObjectsForModule(
      vuexFns,
      currentModule,
      destinationModule,
      data[destinationModule]
    )
  }
}
