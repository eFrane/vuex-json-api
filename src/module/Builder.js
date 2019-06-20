import { initialState, isCollection, allowsDeletion, allowsModification, allowsCreation } from './State'
import { createAction } from './actions/createAction'
import { checkConfigProperty } from '../helpers/checkConfigProperty'
import { deleteAction } from './actions/deleteAction'
import { getAction } from './actions/getAction'
import { getProperty } from './getters/getProperty'
import { listAction } from './actions/listAction'
import { itemsInRelationshipFormat } from './getters/itemsInRelationshipFormat'
import { resetItemsAction } from './actions/resetItemsAction'
import { removeMutation } from './mutations/removeMutation'
import { resetItemsMutation } from './mutations/resetItemsMutation'
import { restoreFromInitialAction } from './actions/restoreFromInitialAction'
import { saveAction } from './actions/saveAction'
import { setAction } from './actions/setAction'
import { setItemMutation } from './mutations/setItemMutation'
import { setMutation } from './mutations/setMutation'
import { setPaginationMutation } from './mutations/setPaginationMutation'
import { startLoadingMutation, endLoadingMutation } from './mutations/loading'
import { updateMutation } from './mutations/updateMutation'
import { hasChanges } from './getters/isChanged'

/**
 * JsonApi-based module builder for Vuex
 *
 * This module builder will create a vuex module based on the assumption of
 * working with valid json api resources.
 *
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
   * @param {Array} apiMethods
   * @param {Object} options additional objects for the module builder
   */
  constructor (store, api, moduleName, apiMethods, options = {}) {
    this.store = store
    this.api = api
    this.moduleName = moduleName
    this.apiMethods = apiMethods || {}

    this.isCollection = isCollection(apiMethods)

    // is this a standalone module with no outside connections?
    this.isStandalone = checkConfigProperty(options, 'standalone', false) && options.standalone ? options.standalone : false
    this.presetOptions = checkConfigProperty(options, 'presetOptions', false) ? options.presetOptions : null

    if (this.isStandalone) {
      // standalone modules are always collections
      // because they will only be created if a list request
      // ends up having unknown includes
      // and as the law of known unknowns and unknown unknowns goes
      // we know that we may get this unknown other resource
      // but we don't know how many items of that resource there will be
      this.isCollection = true
    }
  }

  /**
   * Build the module for this builder instance
   */
  build () {
    const storeModuleBuildTimer = 'api: build module ' + this.moduleName
    console.time(storeModuleBuildTimer)

    let module = {
      namespaced: true,
      state () { return initialState(isCollection) }
    }

    module['mutations'] = this.buildMutations()

    if (!this.isStandalone) {
      module['actions'] = this.buildActions()
      module['getters'] = this.buildGetters()
    }

    console.timeEnd(storeModuleBuildTimer)
    return module
  }

  /**
   * Build the mutations
   */
  buildMutations () {
    let mutations = {
      resetItems: resetItemsMutation(this.isCollection),
      set: setMutation(this.store, this.isCollection),
      setItem: setItemMutation(this.store, this.isCollection),
      startLoading: startLoadingMutation,
      endLoading: endLoadingMutation,
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
    let defaultQuery = checkConfigProperty(this.presetOptions, 'defaultQuery', false) ? this.presetOptions.defaultQuery : {}

    let actions = {
      get: getAction(this.api, this.moduleName, defaultQuery),
      resetItems: resetItemsAction,
      restoreFromInitial: restoreFromInitialAction(this.moduleName, this.isCollection)
    }

    if (this.isCollection) {
      actions['list'] = listAction(this.api, this.moduleName, defaultQuery)
    }

    if (allowsModification(this.apiMethods)) {
      actions['set'] = setAction
      actions['save'] = saveAction(this.api, this.isCollection, this.moduleName)
    }

    if (allowsCreation(this.apiMethods)) {
      actions['create'] = createAction(this.api, this.moduleName)
    }

    if (allowsDeletion(this.apiMethods)) {
      actions['delete'] = deleteAction(this.api, this.moduleName)
    }

    return actions
  }

  buildGetters () {
    let getters = {
      getProperty: getProperty,
      hasChanges: hasChanges(this.isCollection)
    }

    if (this.isCollection) {
      getters['itemsInRelationshipFormat'] = itemsInRelationshipFormat
    }

    return getters
  }
}
