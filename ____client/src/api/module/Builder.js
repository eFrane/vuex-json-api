import { initialState, isCollection, allowsDeletion, allowsModification } from './State'
import { get as getAction } from './actions/Get'
import { set as setAction } from './actions/Set'
import { list as listAction } from './actions/List'
import { reset as resetMutation } from './mutations/Reset'
import { set as setMutation } from './mutations/Set'
import { remove as removeMutation } from './mutations/Delete'

/**
 * JsonApi-based module builder for Vuex
 *
 * This module builder will create a vuex module based on the assumption of
 * working with valid json api resources. Additionally, it can do a little
 * more magic if the API adds the following meta data:
 *
 * - included: a list of included types (This is used to hookup relationships
 *             without incurring too much of a computation penalty for tree
 *             traversal
 * - the proposed json api 1.1 pagination style meta attributes
 *   (-> https://jsonapi.org/format/1.1/#fetching-pagination)
 */
export class Builder {
  /**
   * Module Builder for Json:Api bound Vuex Modules
   *
   * @param {Vuex} store
   * @param {ResourcefulApi} api
   * @param {String} moduleName
   * @param {Array[String]} apiMethods
   */
  constructor (store, api, moduleName, apiMethods) {
    this.store = store
    this.api = api
    this.moduleName = moduleName
    this.apiMethods = apiMethods

    this.isCollection = isCollection(apiMethods)
  }

  /**
   * Build the module for this builder instance
   */
  build () {
    const storeModuleBuildTimer = 'api: build module ' + this.moduleName
    console.time(storeModuleBuildTimer)

    let module = {
      namespaced: true,
      state: initialState(this.isCollection)
    }

    module['actions'] = this.buildActions()
    module['mutations'] = this.buildMutations()

    console.timeEnd(storeModuleBuildTimer)
    return module
  }

  /**
   * Build the mutations
   */
  buildMutations () {
    let mutations = {
      reset: resetMutation(this.isCollection),
      set: setMutation(this.store, this.isCollection)
    }

    if (allowsDeletion(this.apiMethods)) {
      mutations['remove'] = removeMutation(this.isCollection)
    }

    return mutations
  }

  buildActions () {
    let actions = {
      get: getAction(this.api, this.moduleName)
    }

    if (this.isCollection) {
      actions['list'] = listAction(this.api, this.moduleName)
    }

    if (allowsModification(this.apiMethods)) {
      actions['set'] = setAction()
    }

    return actions
  }
}
