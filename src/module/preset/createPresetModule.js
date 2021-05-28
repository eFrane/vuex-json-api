import { ModuleBuilder } from '../ModuleBuilder'
import { checkConfigProperty, hasOwn } from '../../shared/utils'
import { Performance } from '../../shared/Performance'
import { ResourceProxy } from '../../api/ResourceProxy'

export function createPresetModule (store, api) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [name, config]) {
      let baseModule
      if (checkConfigProperty(config, 'base')) {
        baseModule = config.base
      }

      // if there is no baseModule, create it
      if (!hasOwn(store.state, baseModule)) {
        registerBaseModule(store, api, baseModule)
      }

      let resourceProxy = api[baseModule]
      if (!resourceProxy) {
        resourceProxy = new ResourceProxy()
      }

      Performance.mark('module_register_preset_start')

      const builder = new ModuleBuilder(store, api, baseModule, resourceProxy, {
        presetOptions: {
          defaultQuery: checkConfigProperty(config, 'defaultQuery', false) ? config.defaultQuery : {}
        }
      }, name)

      store.registerModule([baseModule, name], builder.build())

      Performance.mark('module_register_preset_end')

      Performance.measure(
        `Register preset ${name} for base ${baseModule}`,
        'module_register_preset_start',
        'module_register_preset_end'
      )
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

  let resourceProxy = api[moduleName]
  if (!resourceProxy) {
    resourceProxy = new ResourceProxy()
  }

  const moduleBuilder = new ModuleBuilder(store, api, moduleName, resourceProxy)
  store.registerModule(moduleName, moduleBuilder.build())
}
