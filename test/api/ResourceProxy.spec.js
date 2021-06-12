import { ResourcefulApi } from '@/api/ResourcefulApi'
import { ResourceProxy } from '@/api/ResourceProxy'
import { Route } from '@/route/Route'
import { initApiMockServer } from '../apiMock'

initApiMockServer()

let sut

beforeEach(() => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://api/')
  sut = new ResourceProxy(api)
})

afterEach(() => {
  sut = null
})

test('has routes', () => {
  expect(sut.routes).toBeDefined()
  expect(sut.routes).toStrictEqual({})

  const route = new Route('book', 'get', '/', [])

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

test('creates a resource proxy for a method if none exists', async () => {
  sut.addRoute(new Route('book', 'get', '/', []))

  expect(sut.proxies).toStrictEqual({})

  await sut.getProxyForMethod('get')

  expect(sut.proxies).toMatchSnapshot()
})

test('returns promise for allowed route method', () => {
  sut.addRoute(new Route('book', 'get', '/book/1', []))

  expect(sut.get()).toBeInstanceOf(Promise)
})
