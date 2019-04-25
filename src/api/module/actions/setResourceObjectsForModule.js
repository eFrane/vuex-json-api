export function setResourceObjectsForModule (vuexFns, currentModule, destinationModule, objects) {
  for (const id in objects) {
    if (objects.hasOwnProperty(id)) {
      const isRootMutation = currentModule !== destinationModule

      let mutation = 'set'
      if (isRootMutation) {
        mutation = destinationModule + '/' + mutation
      }

      const payload = { id: objects[id].id, data: objects[id] }

      vuexFns.commit(mutation, payload, { root: isRootMutation })
    }

    if (objects.hasOwnProperty('relationships')) {
      // TODO: process relationships
    }
  }
}
