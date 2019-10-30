/**
 *
 * @param {object} config
 * @param {String} property
 * @param {Boolean} isRequiredProp
 */
export function checkConfigProperty (config, property, isRequiredProp = true) {
  if (config !== null && Object.prototype.hasOwnProperty.call(config, property)) {
    return true
  }

  if ((config === null ||
    Object.prototype.hasOwnProperty.call(config, property) === false) &&
    !isRequiredProp) {
    return false
  }

  throw new Error('Missing configuration property: ' + property)
}
