import { hasOwn } from '../shared/utils'

/**
 * Converts a module listing object (e.g. `{ myModule: myModule }`)
 * to the expected syntax for module registration.
 *
 * By default, this Vuex usage interpretation expects non-api-bound
 * modules to have a `name`-property which defines their namespaced
 * name. This is necessary to facilitate auto-registration of the modules.
 *
 * N.b.: There is no checking done to avoid overwrites of these modules
 * by later-to-be-initialized api-bound modules.
 *
 * @param {object|array} modules
 */
export function prepareModuleHashMap (modules) {
  const moduleHashMap = {}

  for (const idx in modules) {
    if (hasOwn(modules, idx)) {
      const module = modules[idx]
      moduleHashMap[module.name] = module
    }
  }

  return moduleHashMap
}
