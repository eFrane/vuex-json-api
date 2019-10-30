import { validateCallbackFn } from './validateCallbackFn'

/**
 *
 * @param {Array} callbacks
 */
export function setCallbackFns (callbacks) {
  if (typeof callbacks === 'undefined' ||
    callbacks.constructor !== Array ||
    callbacks.reduce((carry, cb) => validateCallbackFn(cb) && carry, true) === false) {
    throw new Error('You must pass an array of valid callback functions to this method')
  }

  return callbacks
}
