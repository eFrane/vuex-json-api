export function createApiResource () {
  console.time('api: add method proxies for route ' + routeName)

  for (let methodName in methods) {
    if (methods.hasOwnProperty(methodName)) {
      let route = methods[methodName]

      if (methodName.indexOf('related.') === 0) {
        this.registerRelatedResourceMethod(routeName, methodName, route)
        continue
      }

      this[routeName][methodName] = createApiResourceMethodProxy(this, methodName, route)
    }
  }

  console.timeEnd('api: add method proxies for route ' + routeName)
}
