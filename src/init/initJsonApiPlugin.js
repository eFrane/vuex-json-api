import { ResourcefulAPI } from '../api/ResourcefulApi'

/**
 *
 * @param {Router} router
 */
export function initJsonApiPlugin (router) {
  return store => {
    store.api = new ResourcefulAPI(router, store)
    // store.subscribe((mutation, state) => {
    //   console.dir(mutation, state)
    // })
  }
}
