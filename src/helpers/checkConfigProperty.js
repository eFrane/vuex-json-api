/**
 *
 * @param {object} config
 * @param {String} property
 * @param {Boolean} isRequiredProp
 */
export function checkConfigProperty (config, property, isRequiredProp = true) {
  if (typeof config === 'object' && config.hasOwnProperty(property) && isRequiredProp) {
    return true
  }

  if (isRequiredProp === false) {
    return false
  }

  throw new Error('Missing configuration property: ' + property)
}
