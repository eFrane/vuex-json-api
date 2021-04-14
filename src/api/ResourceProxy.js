import { Route } from '../route/Route'
import { createApiResourceMethodProxy } from './createApiResourceMethodProxy'
import { hasOwn } from '../shared/utils'

/**
 * ResourceProxy
 *
 * A wrapper class for the available methods on
 * a route. The actual proxied axios-clients
 * will only be created once the first request on
 * a method is made.
 *
 * @class ResourceProxy
 */
export class ResourceProxy {
  constructor (resourcefulApi) {
    this.resourcefulApi = resourcefulApi
    this.routes = {}
    this.proxies = {}
    this.related = {}
  }

  /**
   * Adds a method to the resource
   *
   * @param {Route} route
   */
  addRoute (route) {
    if (!(route instanceof Route)) {
      throw new Error(`Expected Route, got ${route.constructor}`)
    }

    this.routes[route.action] = route
  }

  addRelation (relationName, relatedResourceProxy) {
    if (!(relatedResourceProxy instanceof ResourceProxy)) {
      throw new Error(`Expected ResourceProxy, got ${relatedResourceProxy.constructor}`)
    }

    this.related[relationName] = relatedResourceProxy
  }

  /**
   * Used by the resource method availability checks
   * to indicate a missing method.
   *
   * @param {string} methodName
   */
  methodNotAvailable (methodName) {
    throw new Error(`Method ${methodName} not available`)
  }

  getProxyForMethod (methodName, parameters) {
    if (!hasOwn(this.proxies, methodName)) {
      this.createProxyForMethodIfMissing(methodName)
    }

    return this.proxies[methodName](parameters)
  }

  createProxyForMethodIfMissing (methodName) {
    const proxy = createApiResourceMethodProxy(this.resourcefulApi, methodName, this.routes[methodName])

    this.proxies[methodName] = proxy
  }

  /**
   *
   * @param {Array} parameters
   * @returns Function
   */
  get (parameters) {
    return this.allowsItemAccess() ? this.getProxyForMethod('get', parameters) : this.methodNotAvailable('get')
  }

  list (parameters) {
    return this.isCollection() ? this.getProxyForMethod('list', parameters) : this.methodNotAvailable('list')
  }

  create (parameters) {
    return this.allowsCreation() ? this.getProxyForMethod('create', parameters) : this.methodNotAvailable('create')
  }

  replace (parameters) {
    return this.allowsReplacement ? this.getProxyForMethod('replace', parameters) : this.methodNotAvailable('replace')
  }

  update (parameters) {
    return this.allowsModification() ? this.getProxyForMethod('update', parameters) : this.methodNotAvailable('update')
  }

  delete (parameters) {
    return this.allowsDeletion() ? this.getProxyForMethod('delete', parameters) : this.methodNotAvailable('delete')
  }

  isCollection () {
    return ('list' in this.routes)
  }

  allowsModification () {
    return ('update' in this.routes)
  }

  allowsReplacement () {
    return ('replace' in this.routes)
  }

  allowsCreation () {
    return ('create' in this.routes)
  }

  allowsDeletion () {
    return ('delete' in this.routes)
  }

  allowsItemAccess () {
    return ('get' in this.routes)
  }

  hasRelated () {
    return Object.keys(this.related).length > 0
  }
}
