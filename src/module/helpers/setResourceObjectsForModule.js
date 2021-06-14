/**
 * Make sure we call the correct mutation depending on whether we're mutating
 * our own state or that of an included module.
 *
 * @param {string} currentModule
 * @param {string} destinationModule
 * @returns {string}
 */
function compileMutation (currentModule, destinationModule) {
  const isRootMutation = currentModule !== destinationModule

  let mutation = 'set'

  if (isRootMutation) {
    mutation = destinationModule + '/' + mutation
  }

  return { mutation, isRootMutation }
}

/**
 *
 * @param {*} vuexFns
 * @param {*} currentModule
 * @param {*} destinationModule
 * @param {*} objects
 */
export function setResourceObjectsForModule (vuexFns, currentModule, destinationModule, objects) {
  const { mutation, isRootMutation } = compileMutation(currentModule, destinationModule)

  vuexFns.commit(mutation, objects, { root: isRootMutation })
}
