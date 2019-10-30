import { checkConfigProperty } from '../../helpers/checkConfigProperty'
import { ModuleBuilder } from '../ModuleBuilder'

export function createPresetModule (store, api) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [name, config]) {
      let baseModule
      if (checkConfigProperty(config, 'base')) {
        baseModule = config.base
      }

      const methods = api[baseModule]

      const timerLabel = `Register preset ${name} for base ${baseModule}`
      console.time(timerLabel)
      const builder = new ModuleBuilder(store, api, baseModule, methods, {
        presetOptions: {
          defaultQuery: checkConfigProperty(config, 'defaultQuery', false) ? config.defaultQuery : {}
        }
      })

      store.registerModule([baseModule, name], builder.build())
      console.timeEnd(timerLabel)
    }
  })
}
