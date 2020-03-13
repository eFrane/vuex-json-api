import { getTestServer } from '../server/getTestServer'

import { JsonApiRouter } from '@/route/JsonApiRouter'
import { JsonApiRoute } from '@/route/JsonApiRoute'

describe('JsonApiRouter', () => {
  let testServer = null

  beforeAll(() => {
    testServer = getTestServer(3000)
  })

  afterAll(() => {
    testServer.close()
  })

  it('loads routes from a json:api endpoint', () => {
    const router = new JsonApiRouter('http://localhost:3000/', 'route')

    return router.updateRoutes().then(() => {
      expect(router.routes.tag.get).toBeInstanceOf(JsonApiRoute)
    })
  })
})
