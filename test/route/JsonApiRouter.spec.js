import { JsonApiRouter } from '@/route/JsonApiRouter'
import { JsonApiRoute } from '@/route/JsonApiRoute'
import fetchMock from 'fetch-mock'

fetchMock.config.sendAsJson = false
fetchMock.get('http://routes/route', {
  body: JSON.stringify({
    data: [
      {
        type: 'VuexJsonApiRoute',
        id: 1,
        attributes: {
          parameters: [],
          url: 'api/route',
          method: 'list',
          module: 'route'
        }
      }
    ]
  }),
  status: 200
})

test('loads routes from a json:api endpoint', () => {
  const router = new JsonApiRouter('http://routes/', 'route')

  return router.updateRoutes().then(() => {
    expect(router.routes.route.list).toBeInstanceOf(JsonApiRoute)
  })
})
