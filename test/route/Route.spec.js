import { Route } from '@/route/Route'

describe('Route', () => {
  it('stores route information', () => {
    const route = new Route('foo', 'GET', '/foo/bar', [])

    expect(route).toBeInstanceOf(Route)
    expect(route.module).toStrictEqual('foo')
    expect(route.action).toStrictEqual('get')
  })

  it('it disallows invalid http verbs as action', () => {
    const testInvalid = () => {
      /* eslint-disable no-new */
      new Route('foo', 'bar', '', [])
    }

    expect(testInvalid).toThrowErrorMatchingSnapshot()
  })

  it('returns a reduced parameters object after preparation', () => {
    const route = new Route('foo', 'GET', '/route/with/{param}', ['param'])

    const parameters = {
      param: 'foo',
      bar: 'baz'
    }

    expect(parameters.param).toStrictEqual('foo')

    expect(route.hasParameter('param')).toBeTruthy()
    expect(route.prepare(parameters)).toMatchSnapshot()

    expect(parameters.param).toBeUndefined()
    expect(parameters.bar).toStrictEqual('baz')
  })
})
