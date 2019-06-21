import {diff} from 'deep-object-diff'
import {processResponseData} from '../helpers/processResponseData'

/**
 * Update an existing resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function saveAction (api, isCollection, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, [vuexFns, id]) {
      if (typeof id === 'undefined') {
        throw new Error('You must pass an object id to this action')
      }

      const currentItemState = JSON.parse(JSON.stringify((isCollection)
        ? thisArg.state[moduleName].items[id]
        : thisArg.state[moduleName].item))

      const initialItemState = JSON.parse(JSON.stringify((isCollection)
        ? thisArg.state[moduleName].initial[id]
        : thisArg.state[moduleName].initial))

      const changedItemState = diff(initialItemState, currentItemState)

      if (changedItemState.hasOwnProperty('relationships')) {
        for (let relationship in changedItemState.relationships) {
          changedItemState.relationships[relationship] = currentItemState.relationships[relationship]
        }
      }

      vuexFns.commit('startLoading', null)

      return api[moduleName].update(
        {id},
        {
          data: Object.assign(
            changedItemState, {
              id: id,
              type: currentItemState.type
            })
        }
      ).then(({data}) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)

        vuexFns.commit('endLoading', null)
      })
    }
  })
}
