import { Route } from '@/route/Route'
import { JsonApiRoute } from '@/route/JsonApiRoute'

describe('JsonApiRoute', () => {
  it('processes json api responses', () => {
    const resource = {
      type: 'vuexjsonapiroute',
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

  it('fails on wrong type', () => {
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
})
