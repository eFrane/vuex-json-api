import { diff } from 'deep-object-diff'
import { processResponseData } from '../helpers/processResponseData'
import { getExpectedResponse } from '../helpers/getExpectedResponse'
import { saveOptions as applySaveOptions } from './options/saveOptions'

/**
 * Update an existing resource
 *
 * @param {ResourcefulApi} api
 * @param {Boolean} isCollection
 * @param {String} moduleName
 * @param {Object} defaultQuery
 */
export function saveAction (api, isCollection, moduleName, defaultQuery = {}) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, params]) {
      const id = (typeof params === 'object') ? params.id : params
      const options = Object.prototype.hasOwnProperty.call(params, 'options') ? params.options : null

      if (typeof id === 'undefined') {
        throw new Error('You must pass an object id to this action')
      }

      let currentItemState = null
      let initialItemState = null
      if (Object.prototype.hasOwnProperty.call(defaultQuery, 'group')) {
        currentItemState = JSON.parse(JSON.stringify((isCollection)
          ? thisArg.state[moduleName][defaultQuery.group].items[id]
          : thisArg.state[moduleName][defaultQuery.group].item))

        initialItemState = JSON.parse(JSON.stringify((isCollection)
          ? thisArg.state[moduleName][defaultQuery.group].initial[id]
          : thisArg.state[moduleName][defaultQuery.group].initial))
      } else {
        currentItemState = JSON.parse(JSON.stringify((isCollection)
          ? thisArg.state[moduleName].items[id]
          : thisArg.state[moduleName].item))

        initialItemState = JSON.parse(JSON.stringify((isCollection)
          ? thisArg.state[moduleName].initial[id]
          : thisArg.state[moduleName].initial))
      }

      let changedItemState = diff(initialItemState, currentItemState)

      if (Object.prototype.hasOwnProperty.call(changedItemState, 'relationships')) {
        for (const relationship in changedItemState.relationships) {
          changedItemState.relationships[relationship] = currentItemState.relationships[relationship]
        }
      }

      if (options) {
        changedItemState = applySaveOptions({ currentItemState, changedItemState, initialItemState, options })
      }

      vuexFns.commit('startLoading', null)

      return api[moduleName].update(
        { id },
        {
          data: Object.assign(
            changedItemState, {
              id: id,
              type: currentItemState.type
            })
        }
      ).then(({ data, status }) => {
        if (status === 204) {
          vuexFns.commit('set', getExpectedResponse(currentItemState))
        }
        processResponseData(thisArg, vuexFns, api, moduleName, data, 'update')

        vuexFns.commit('endLoading', null)
      })
    }
  })
}
