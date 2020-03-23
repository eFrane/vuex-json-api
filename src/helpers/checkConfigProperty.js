import { hasOwn } from '../shared/utils'

/**
 *
 * @param {object} config
 * @param {String} property
 * @param {Boolean} isRequiredProp
 */
export function checkConfigProperty (config, property, isRequiredProp = true) {
  if (config !== null && hasOwn(config, property)) {
    return true
  }

  if ((config === null ||
    hasOwn(config, property) === false) &&
    !isRequiredProp) {
    return false
  }

  throw new Error('Missing configuration property: ' + property)
}
