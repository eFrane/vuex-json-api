import { setResourceObjectsForModule } from './setResourceObjectsForModule'

/**
 * Get a resource from a
 *
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
export function getAction (api, moduleName) {
  return new Proxy(() => {}, {
    apply (target, thisArg, argArray) {
      let [ vuexFns, query ] = argArray

      if (typeof query === 'undefined') {
        query = {}
      }

      vuexFns.commit('startLoading')

      return api[moduleName].get(query).then(({ data }) => {
        for (let destinationModule in data) {
          if (data.hasOwnProperty(destinationModule)) {
            setResourceObjectsForModule(vuexFns, moduleName, destinationModule, data[destinationModule])
          }
        }
      }).finally(() => {
        vuexFns.commit('endLoading')
      })
    }
  })
}
