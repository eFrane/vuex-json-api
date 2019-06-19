/**
 *
 * @param {object} config
 * @param {String} property
 * @param {Boolean} isRequiredProp
 */
export function checkConfigProperty (config, property, isRequiredProp = true) {
  if (config !== null && config.hasOwnProperty(property)) {
    return true
  }

  if ((config === null || config.hasOwnProperty(property) === false) && !isRequiredProp) {
    return false
  }

  throw new Error('Missing configuration property: ' + property)
}
