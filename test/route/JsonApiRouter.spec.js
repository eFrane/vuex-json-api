import { JsonApiRouter } from '@/route/JsonApiRouter'
import { JsonApiRoute } from '@/route/JsonApiRoute'

test.skip('loads routes from a json:api endpoint', () => {
  const router = new JsonApiRouter('http://localhost/', 'route')

  return router.updateRoutes().then(() => {
    expect(router.routes.tag.get).toBeInstanceOf(JsonApiRoute)
  })
})
