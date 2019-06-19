import { checkConfigProperty } from '../../helpers/checkConfigProperty'
import { Builder } from '../Builder'

export function createPresetModule (store, api) {
  return new Proxy((name, config) => { }, {
    apply (target, thisArg, [name, config]) {
      let baseModule
      if (checkConfigProperty(config, 'base')) {
        baseModule = config.base
      }

      let methods = api[baseModule]

      const moduleName = `${baseModule}.${name}`

      const builder = new Builder(store, api, moduleName, methods)
      store.registerModule(moduleName, builder.build())
    }
  })
}
