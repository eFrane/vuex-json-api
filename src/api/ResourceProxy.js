import { Route } from '../route/Route'
import { hasOwn } from '../shared/utils'

/**
 * ResourceProxy
 *
 * A wrapper class for the available methods on a route. The actual proxied Fetch-clients
 * will only be created once the first request on a method is made.
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

  _getProxyForMethod (methodName) {
    if (!hasOwn(this.proxies, methodName)) {
      this._createProxyForMethodIfMissing(methodName)
    }

    return this.proxies[methodName]
  }

  _createProxyForMethodIfMissing (methodName) {
    this.proxies[methodName] = this._doCreateProxy(
      this.resourcefulApi,
      methodName,
      this.routes[methodName]
    )
  }

  _doCreateProxy (api, method, route) {
    return new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        if (!(route instanceof Route)) {
          throw new Error('Expected Route object')
        }

        // add actual route as first param
        const url = route.prepare(argArray[0])
        argArray.unshift(url)

        switch (method) {
          case 'list':
          case 'get':
            return api.get.apply(api, argArray)

          case 'create':
            return api.post.apply(api, argArray)

          case 'replace':
            return api.put.apply(api, argArray)

          case 'update':
            return api.patch.apply(api, argArray)

          case 'delete':
            return api.delete.apply(api, argArray)

          default:
            throw new Error('unsupported api method: ' + method)
        }
      }
    })
  }

  /**
   * @param {Array} parameters
   * @param {Object} data
   *
   * @returns Function
   */
  get (parameters, data) {
    return this.allowsItemAccess()
      ? this._getProxyForMethod('get')(parameters, data)
      : this.methodNotAvailable('get')
  }

  /**
   * @param {Array} parameters
   * @param {Object} data
   *
   * @returns Function
   */
  list (parameters, data) {
    return this.isCollection()
      ? this._getProxyForMethod('list')(parameters, data)
      : this.methodNotAvailable('list')
  }

  /**
   * @param {Array} parameters
   * @param {Object} data
   *
   * @returns Function
   */
  create (parameters, data) {
    return this.allowsCreation()
      ? this._getProxyForMethod('create')(parameters, data)
      : this.methodNotAvailable('create')
  }

  /**
   * @param {Array} parameters
   * @param {Object} data
   *
   * @returns Function
   */
  replace (parameters, data) {
    return this.allowsReplacement
      ? this._getProxyForMethod('replace')(parameters, data)
      : this.methodNotAvailable('replace')
  }

  /**
   * @param {Array} parameters
   * @param {Object} data
   *
   * @returns Function
   */
  update (parameters, data) {
    return this.allowsModification()
      ? this._getProxyForMethod('update')(parameters, data)
      : this.methodNotAvailable('update')
  }

  /**
   * @param {Array} parameters
   * @param {Object} data
   *
   * @returns Function
   */
  delete (parameters, data) {
    return this.allowsDeletion()
      ? this._getProxyForMethod('delete')(parameters, data)
      : this.methodNotAvailable('delete')
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
    return ('get' in this.routes || 'list' in this.routes)
  }

  hasRelated () {
    return Object.keys(this.related).length > 0
  }
}
