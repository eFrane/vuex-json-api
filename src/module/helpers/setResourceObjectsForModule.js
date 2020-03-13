import { hasOwn } from '../../shared/utils'

/**
 *
 * @param {*} vuexFns
 * @param {*} currentModule
 * @param {*} destinationModule
 * @param {*} objects
 */
export function setResourceObjectsForModule (vuexFns, currentModule, destinationModule, objects) {
  for (const id in objects) {
    if (hasOwn(objects, id)) {
      const isRootMutation = currentModule !== destinationModule
      let mutation = 'set'

      if (isRootMutation) {
        mutation = destinationModule + '/' + mutation
      }

      const payload = { id: objects[id].id, data: objects[id] }

      vuexFns.commit(mutation, payload, { root: isRootMutation })
    }
  }
}
