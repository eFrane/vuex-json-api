import { checkConfigProperty } from '../../helpers/checkConfigProperty'
import { ModuleBuilder } from '../ModuleBuilder'

export function createPresetModule (store, api) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [name, config]) {
      let baseModule
      if (checkConfigProperty(config, 'base')) {
        baseModule = config.base
      }

      // if there is no baseModule, create it
      if (!Object.prototype.hasOwnProperty.call(store.state, baseModule)) {
        registerBaseModule(store, api, baseModule)
      }

      const methods = api[baseModule]

      const timerLabel = `Register preset ${name} for base ${baseModule}`
      console.time(timerLabel)
      const builder = new ModuleBuilder(store, api, baseModule, methods, {
        presetOptions: {
          defaultQuery: checkConfigProperty(config, 'defaultQuery', false) ? config.defaultQuery : {}
        }
      }, name)

      store.registerModule([baseModule, name], builder.build())
      console.timeEnd(timerLabel)
    }
  })
}

/**
 *
 * @param {Vuex.Store} store
 * @param {ResourcefulApi} api
 * @param {String} moduleName
 */
function registerBaseModule (store, api, moduleName) {
  if (typeof moduleName !== 'string') {
    throw new Error('Module name must be string')
  }

  const moduleBuilder = new ModuleBuilder(store, api, moduleName)
  store.registerModule(moduleName, moduleBuilder.build())
}
