import { initialState, isCollection, allowsDeletion, allowsModification } from './State'
import { getAction } from './actions/getAction'
import { setAction } from './actions/setAction'
import { listAction } from './actions/listAction'
import { addGroupAction } from './actions/addGroupAction'
import { resetAction } from './actions/resetAction'
import { resetMutation } from './mutations/resetMutation'
import { setMutation } from './mutations/setMutation'
import { addGroupMutation } from './mutations/addGroupMutation'
import { removeMutation } from './mutations/removeMutation'
import { startLoadingMutation, endLoadingMutation } from './mutations/loading'
import { setPaginationMutation } from './mutations/setPaginationMutation'
import { updateMutation } from './mutations/updateMutation'
import { getProperty } from './getters/getProperty'

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

    if (!this.hasOwnProperty('prefix')) {
      this.prefix = ''
    }

    this.isCollection = isCollection(apiMethods)
  }

  /**
   * Configure a module name prefix for all generated modules
   * @param {String} prefix
   */
  static setModulePrefix (prefix) {
    Builder.prototype.prefix = prefix
  }

  /**
   * Return module name with prefix
   */
  getModuleName () {
    return this.prefix + this.moduleName
  }

  /**
   * Build the module for this builder instance
   */
  build () {
    const storeModuleBuildTimer = 'api: build module ' + this.getModuleName()
    console.time(storeModuleBuildTimer)

    let module = {
      namespaced: true,
      state: initialState(this.isCollection)
    }

    module['actions'] = this.buildActions()
    module['mutations'] = this.buildMutations()
    module['getters'] = this.buildGetters()

    console.timeEnd(storeModuleBuildTimer)
    return module
  }

  /**
   * Build the mutations
   */
  buildMutations () {
    let mutations = {
      reset: resetMutation(this.isCollection),
      set: setMutation(this.store, this.isCollection),
      startLoading: startLoadingMutation,
      endLoading: endLoadingMutation,
      addGroup: addGroupMutation(this.store, this.isCollection),
      update: updateMutation
    }

    if (allowsDeletion(this.apiMethods)) {
      mutations['remove'] = removeMutation(this.isCollection)
    }

    if (this.isCollection) {
      mutations['setPagination'] = setPaginationMutation
    }

    return mutations
  }

  buildActions () {
    let actions = {
      get: getAction(this.api, this.getModuleName()),
      reset: resetAction,
      addGroup: addGroupAction()
    }

    if (this.isCollection) {
      actions['list'] = listAction(this.api, this.getModuleName())
    }

    if (allowsModification(this.apiMethods)) {
      actions['set'] = setAction()
    }

    return actions
  }

  buildGetters () {
    let getters = {
      getProperty: getProperty
    }

    return getters
  }
}
