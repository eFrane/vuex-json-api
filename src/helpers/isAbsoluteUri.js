/**
 *
 * @param {String} uri
 */
export function isAbsoluteUri (uri) {
  if (uri.indexOf('http://') === 0) {
    return true
  }

  if (uri.indexOf('https://') === 0) {
    return true
  }

  if (uri.match(/\/\/.+/)) {
    return true
  }

  return false
}
