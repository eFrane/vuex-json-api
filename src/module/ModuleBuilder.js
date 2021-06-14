import { initialState } from './State'
import { createAction } from './actions/createAction'
import { deleteAction } from './actions/deleteAction'
import { getAction } from './actions/getAction'
import { getProperty } from './getters/getProperty'
import { listAction } from './actions/listAction'
import { listRelatedAction } from './actions/listRelatedAction'
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
import { hasChanges } from './getters/hasChanges'
import { ResourceBuilder } from './resource/ResourceBuilder'
import { checkConfigProperty, hasOwn, isAbsoluteUri } from '../shared/utils'
import { Performance } from '../shared/Performance'
import { setAllMutation } from './mutations/setAllMutation'

/**
 * JsonApi-based module builder for Vuex
 *
 * This module builder will create a vuex module based on the assumption of
 * working with valid json api resources.
 *
 * - the proposed json api 1.1 pagination style meta attributes
 *   (-> https://jsonapi.org/format/1.1/#fetching-pagination)
 *
 * @class ModuleBuilder
 */
export class ModuleBuilder {
  /**
   * Module Builder for Json:Api bound Vuex Modules
   *
   * @param {Vuex} store
   * @param {ResourcefulApi} api
   * @param {String} moduleName
   * @param {ResourceProxy} apiMethods
   * @param {Object} options additional objects for the module builder
   * @param {String} presetModuleName
   */
  constructor (store, api, moduleName, apiMethods, options = {}, presetModuleName = null) {
    this.store = store
    this.api = api
    this.moduleName = moduleName
    this.apiMethods = apiMethods || {}
    this.presetModuleName = presetModuleName

    this.isCollection = apiMethods.isCollection()

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
    Performance.mark('api_build_module_start')

    const module = {
      namespaced: true,
      state: () => initialState(this.isCollection)
    }

    module.state.options = this.buildOptions()

    module.mutations = this.buildMutations()

    if (!this.isStandalone) {
      module.actions = this.buildActions(module)
      module.getters = this.buildGetters()
    }

    Performance.mark('api_build_module_end')
    Performance.measure(
      'api: build module ' + this.moduleName,
      'api_build_module_start',
      'api_build_module_end'
    )

    return module
  }

  /**
   * Build the options
   */
  buildOptions () {
    const options = {
      absoluteMethods: []
    }

    for (const method in this.apiMethods.routes) {
      if (hasOwn(this.apiMethods.routes, method) &&
        isAbsoluteUri(this.api.router.routes[this.moduleName][method].url)) {
        options.absoluteMethods.push(method)
      }
    }

    return options
  }

  /**
   * Build the mutations
   */
  buildMutations () {
    const resourceBuilder = new ResourceBuilder(this.store)

    const mutations = {
      resetItems: resetItemsMutation(this.isCollection),
      set: (this.isCollection) ? setAllMutation(resourceBuilder) : setMutation(resourceBuilder),
      setItem: setItemMutation(resourceBuilder, this.isCollection),
      startLoading: startLoadingMutation,
      endLoading: endLoadingMutation,
      update: updateMutation
    }

    if (this.apiMethods.allowsDeletion()) {
      mutations.remove = removeMutation(this.isCollection)
    }

    if (this.isCollection) {
      mutations.setPagination = setPaginationMutation
    }

    return mutations
  }

  buildActions (module) {
    const defaultQuery = checkConfigProperty(this.presetOptions, 'defaultQuery', false) ? this.presetOptions.defaultQuery : {}

    let actions = {
      get: getAction(this.api, this.moduleName, defaultQuery),
      resetItems: resetItemsAction,
      restoreFromInitial: restoreFromInitialAction(this.moduleName, this.presetModuleName, this.isCollection)
    }

    if (this.isCollection) {
      actions.list = listAction(this.api, this.moduleName, defaultQuery, module)
    }

    if (this.apiMethods.allowsModification()) {
      actions.set = setAction
      actions.save = saveAction(this.api, this.isCollection, this.moduleName, defaultQuery)
    }

    if (this.apiMethods.allowsCreation()) {
      actions.create = createAction(this.api, this.moduleName)
    }

    if (this.apiMethods.allowsDeletion()) {
      actions.delete = deleteAction(this.api, this.moduleName)
    }

    if (this.apiMethods.hasRelated()) {
      actions = Object.assign(actions, this.buildRelatedActions())
    }

    return actions
  }

  buildRelatedActions () {
    const relatedActions = {}

    for (const relatedObjectType in this.apiMethods.related) {
      const relatedObjectMethods = this.apiMethods.related[relatedObjectType]
      const relatedObjectTypeActionName = relatedObjectType.charAt(0).toUpperCase() + relatedObjectType.slice(1)

      if (relatedObjectMethods.isCollection()) {
        const listActionName = `listRelated${relatedObjectTypeActionName}`
        relatedActions[listActionName] = listRelatedAction(this.api, this.moduleName, relatedObjectType)
      }
    }

    return relatedActions
  }

  buildGetters () {
    const getters = {
      getProperty: getProperty,
      hasChanges: hasChanges(this.isCollection)
    }

    if (this.isCollection) {
      getters.itemsInRelationshipFormat = itemsInRelationshipFormat
    }

    return getters
  }
}
