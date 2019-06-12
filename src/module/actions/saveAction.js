import { diff } from 'deep-object-diff'
import { processResponseData } from '../helpers/processResponseData'

/**
 * Update an existing resource
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function saveAction (api, isCollection, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [ vuexFns, id ] = argArray

      if (typeof id === 'undefined') {
        throw new Error('You must pass an object id to this action')
      }

      let currentItemState = (isCollection)
        ? thisArg.state[moduleName].items[id]
        : thisArg.state[moduleName].item

      let initialItemState = (isCollection)
        ? thisArg.initial[moduleName].items[id]
        : thisArg.initial[moduleName].item

      let changedItemState = diff(initialItemState, currentItemState)

      vuexFns.commit('startLoading', null)

      return api[moduleName].update({ id }, { data: changedItemState }).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)
      }).finally(() => {
        vuexFns.commit('endLoading', null)
      })
    }
  })
}
