import { createApiResourceMethodProxy } from '@/api/createApiResourceMethodProxy'
import { ResourcefulApi } from '@/api/ResourcefulApi'
import { Route } from '@/route/Route'

it('creates a function', () => {
  const api = new ResourcefulApi()
  const route = new Route('foo', 'get', '/', [])

  const proxyFn = createApiResourceMethodProxy(api, route.method, route)

  expect(proxyFn).toBeInstanceOf(Function)
})
