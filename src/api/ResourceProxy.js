import { Route } from '../route/Route'
import { createApiResourceMethodProxy } from './createApiResourceMethodProxy'

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

  getProxyForMethod (methodName) {
    if (!Object.prototype.hasOwnProperty.call(this.proxies, methodName)) {
      this.createProxyForMethodIfMissing(methodName)
    }

    return this.proxies[methodName]
  }

  createProxyForMethodIfMissing (methodName) {
    const proxy = createApiResourceMethodProxy(this.api, methodName, this.routes[methodName])

    this.proxies[methodName] = proxy
  }

  get () {
    return ('get' in this.routes) ? this.getProxyForMethod('get') : this.methodNotAvailable('get')
  }

  list () {
    return ('list' in this.routes) ? this.getProxyForMethod('list') : this.methodNotAvailable('list')
  }

  create () {
    return ('create' in this.routes) ? this.getProxyForMethod('create') : this.methodNotAvailable('create')
  }

  replace () {
    return ('replace' in this.routes) ? this.getProxyForMethod('replace') : this.methodNotAvailable('replace')
  }

  update () {
    return ('update' in this.routes) ? this.getProxyForMethod('update') : this.methodNotAvailable('update')
  }

  delete () {
    return ('delete' in this.routes) ? this.getProxyForMethod('delete') : this.methodNotAvailable('delete')
  }
}
