export function validateCallbackFn (fn) {
  if (fn.constructor !== Function) {
    return false
  }

  return true
}
