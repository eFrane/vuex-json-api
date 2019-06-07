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
      let [ vuexFns, {id, payload, parameters} ] = argArray

      if (typeof id === 'undefined') {
        throw new Error('You must pass an object id to this action')
      }

      let currentItemState = (isCollection)
        ? thisArg.state[moduleName].items[id]
        : thisArg.state[moduleName].item

      vuexFns.commit('startLoading')

      return api[moduleName].update(parameters, currentItemState).then(({ data }) => {
        processResponseData(thisArg, vuexFns, api, moduleName, data)
      }).finally(() => {
        vuexFns.commit('endLoading')
      })
    }
  })
}
