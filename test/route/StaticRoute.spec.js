import { Route } from '@/route/Route'
import { StaticRoute } from '@/route/StaticRoute'

test('creates a route from an object', () => {
  const routeData = {
    module: 'mymodule',
    action: 'delete',
    url: '/mymodule/{id}',
    parameters: ['id']
  }

  const route = new StaticRoute(routeData)

  expect(route).toBeInstanceOf(Route)
})
