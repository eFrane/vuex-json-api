import { StaticRoute } from '@/route/StaticRoute'
import { StaticRouter } from '@/route/StaticRouter'

import JsonApiPlaygroundRoutes from '@/misc/JsonApiPlaygroundRoutes.json'

describe('StaticRouter', () => {
  it('loads routes from a json-like object', () => {
    const router = new StaticRouter(JsonApiPlaygroundRoutes)

    expect(router.routes.authors.list).toBeInstanceOf(StaticRoute)
  })
})
