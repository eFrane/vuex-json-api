import { Route } from '@/route/Route'
import { JsonApiRoute } from '@/route/JsonApiRoute'

test('processes json api responses', () => {
  const resource = {
    type: 'VuexJsonApiRoute',
    id: 2,
    attributes: {
      module: 'tag',
      method: 'get',
      url: '/tag/{id}',
      parameters: [
        'id'
      ]
    }
  }

  const route = new JsonApiRoute(resource)

  expect(route).toBeInstanceOf(Route)
  expect(route.module).toStrictEqual('tag')
  expect(route.parameters).toStrictEqual(['id'])
})

test('fails on wrong type', () => {
  const wrongTypeTest = function () {
    const resource = {
      type: 'routeforvuexjsonapi',
      id: 2,
      attributes: {
        module: 'tag',
        method: 'get',
        url: '/tag/{id}',
        parameters: [
          'id'
        ]
      }
    }

    /* eslint-disable no-new */
    new JsonApiRoute(resource)
  }

  expect(wrongTypeTest).toThrowErrorMatchingSnapshot()
})
