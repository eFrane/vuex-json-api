/**
 * Convenience wrapper to shorten the hasOwnProperty call
 *
 * @param {Object} object
 * @param {String} property
 */
export function hasOwn (object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
}

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @author inspired by [jhildenbiddle](https://stackoverflow.com/a/48218209).
 *
 * @param {Object} target
 * @param {Object} source
 *
 * @return {Object} merged Orbject
 */
export function deepMerge (target, source) {
  const isObject = (obj) => obj && typeof obj === 'object'

  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMerge(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}

/**
 * De-reference objects
 *
 * @param {object} obj
 * @return {object} a dereferenced copy of the passed object
 */
export function deref (obj) {
  return JSON.parse(JSON.stringify(obj))
}

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
