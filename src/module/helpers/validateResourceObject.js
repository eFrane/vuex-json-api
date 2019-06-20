/**
 * Do a crude check for common json:api resource properties.
 * This is (probably) not a long-term solution!
 *
 * @param {Object} resourceObject
 */
export function validateResourceObject (resourceObject, createResource) {
  if (createResource &&
    typeof resourceObject === 'object' &&
    resourceObject.hasOwnProperty('type') &&
    resourceObject.hasOwnProperty('data')) {
    return true
  }
  if (!createResource &&
    typeof resourceObject === 'object' &&
    resourceObject.hasOwnProperty('type') &&
    resourceObject.hasOwnProperty('id') &&
    resourceObject.hasOwnProperty('data')) {
    return true
  }

  throw new Error('Detected potentially invalid json:api resource object')
}
