import { Route } from '@/route/Route'
import { Router } from '@/route/Router'

test('has routes', () => {
  const r = new Router()

  expect(r.routes).toStrictEqual({})
})

test('adds routes to the expected keys', () => {
  const route = new Route('module', 'GET', '/', [])
  const router = new Router()

  expect(router.routes.module).toBeUndefined()
  router.addRoute(route)
  expect(router.routes.module).toMatchSnapshot()
})
