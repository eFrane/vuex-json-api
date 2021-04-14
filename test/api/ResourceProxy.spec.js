import { ResourcefulApi } from '@/api/ResourcefulApi'
import { ResourceProxy } from '@/api/ResourceProxy'
import { Route } from '@/route/Route'

let sut

beforeEach(() => {
  const api = new ResourcefulApi()
  sut = new ResourceProxy(api)
})

afterEach(() => {
  sut = null
})

test('has routes', () => {
  expect(sut.routes).toBeDefined()
  expect(sut.routes).toStrictEqual({})

  const route = new Route('foo', 'get', '/', [])

  sut.addRoute(route)

  expect(sut.routes).toEqual({
    get: route
  })
})

test('throws for unavailable methods', () => {
  function testGet () {
    sut.get()
  }

  expect(testGet).toThrowErrorMatchingSnapshot()
})

test('creates a resource proxy for a method if none exists', () => {
  sut.addRoute(new Route('foo', 'get', '/', []))

  expect(sut.proxies).toStrictEqual({})

  sut.getProxyForMethod('get')

  expect(sut.proxies).toMatchSnapshot()
})

test('returns a promise for valid route method', () => {
  sut.addRoute(new Route('foo', 'get', '/', []))

  const methodProxy = sut.get()

  expect(methodProxy).toBeInstanceOf(Promise)
})
