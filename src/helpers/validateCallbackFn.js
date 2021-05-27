/**
 * Make sure a passed parameter is actually a function
 *
 * @param fn
 * @returns {boolean}
 */
export function validateCallbackFn (fn) {
  return fn.constructor === Function
}
