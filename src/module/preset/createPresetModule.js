import { checkConfigProperty } from '../../helpers/checkConfigProperty'
import { Builder } from '../Builder'

export function createPresetModule (store, api) {
  return new Proxy(() => { }, {
    apply (target, thisArg, [name, config]) {
      let baseModule
      if (checkConfigProperty(config, 'base')) {
        baseModule = config.base
      }

      let methods = api[baseModule]

      const timerLabel = `Register preset ${name} for base ${baseModule}`
      console.time(timerLabel)
      const builder = new Builder(store, api, baseModule, methods, {
        presetOptions: {
          defaultQuery: checkConfigProperty(config, 'defaultQuery', false) ? config.defaultQuery : {}
        }
      })

      store.registerModule([baseModule, name], builder.build())
      console.timeEnd(timerLabel)
    }
  })
}
