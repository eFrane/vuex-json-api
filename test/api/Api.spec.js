/**
 * @jest-environment jsdom
 */

import { Api } from '@/api/Api'
import { ApiError } from '@/errors/ApiError'

// This spec tests all the non-request methods of Api

const api = new Api()
api.setBaseUrl('http://localhost/')

test('has no default base url', () => {
  expect(Api.baseUrl).toBeUndefined()

  const unconfiguredApi = new Api()

  expect(unconfiguredApi.baseUrl).toBe('')
})

test('allows changing the base url', () => {
  const unconfiguredApi = new Api()
  unconfiguredApi.setBaseUrl('/api/')

  expect(unconfiguredApi.baseUrl).toBe('/api/')
})

test('setting callbacks', () => {
  const validCb = () => {}
  const invalidCb = 42

  expect(api.successCallbacks.length).toBe(0)
  expect(api.errorCallbacks.length).toBe(0)

  expect(() => {
    api.addSuccessCallback(validCb)
  }).not.toThrow(ApiError)

  expect(() => {
    api.addSuccessCallback(invalidCb)
  }).toThrowErrorMatchingSnapshot()

  expect(() => {
    api.addErrorCallback(validCb)
  }).not.toThrow(ApiError)

  expect(() => {
    api.addErrorCallback(invalidCb)
  }).toThrowErrorMatchingSnapshot()

  expect(api.successCallbacks.length).toBe(1)
  expect(api.errorCallbacks.length).toBe(1)

  api.resetSuccessCallbacks()
  api.resetErrorCallbacks()

  expect(api.successCallbacks.length).toBe(0)
  expect(api.errorCallbacks.length).toBe(0)

  expect(() => {
    api.setSuccessCallbacks([validCb, invalidCb])
  }).toThrowErrorMatchingSnapshot()

  expect(api.successCallbacks.length).toBe(1)

  expect(() => {
    api.setSuccessCallbacks([invalidCb, validCb])
  }).toThrowErrorMatchingSnapshot()

  expect(api.successCallbacks.length).toBe(2)

  expect(() => {
    api.setSuccessCallbacks([validCb])
  }).not.toThrow(ApiError)

  expect(api.successCallbacks.length).toBe(3)

  api.resetSuccessCallbacks()

  expect(() => {
    api.setErrorCallbacks([validCb, invalidCb])
  }).toThrowErrorMatchingSnapshot()

  expect(api.errorCallbacks.length).toBe(1)

  expect(() => {
    api.setErrorCallbacks([invalidCb, validCb])
  }).toThrowErrorMatchingSnapshot()

  expect(api.errorCallbacks.length).toBe(2)

  expect(() => {
    api.setErrorCallbacks([validCb])
  }).not.toThrow(ApiError)

  expect(api.errorCallbacks.length).toBe(3)

  api.resetErrorCallbacks()
})

test('adding headers', () => {
  expect(api.setHeader).toThrowErrorMatchingSnapshot()

  expect(() => {
    api.setHeader(42, 34)
  }).toThrowErrorMatchingSnapshot()

  expect(Object.keys(api.headers).length).toBe(2)

  api.setHeader('foo', 'bar')

  expect(Object.keys(api.headers).length).toBe(3)
  expect(api.headers.foo).toBe('bar')

  expect(() => {
    api.setHeader('foo', 'baz')
  }).toThrowErrorMatchingSnapshot()

  expect(Object.keys(api.headers).length).toBe(3)

  api.setHeader('foo', 'baz', true)

  expect(api.headers.foo).toBe('baz')
  expect(Object.keys(api.headers).length).toBe(3)

  api.addHeaders({
    extra1: 'a',
    extra2: 'b'
  })

  expect(Object.keys(api.headers).length).toBe(5)
  expect(api.headers.extra2).toBe('b')
})

test('default headers are read-only', () => {
  expect(() => {
    api.setHeader('Accept', 'text/plain')
  }).toThrowErrorMatchingSnapshot()
})

describe.each([
  {
    url: '//localhost/',
    cross: false
  },
  {
    url: 'http://localhost/',
    cross: false
  },
  {
    url: '/relative',
    cross: false
  },
  {
    url: 'http://otherdomain.com',
    cross: true
  },
  {
    url: 'https://ssldomain.com',
    cross: true
  },
  {
    url: '//ffoobbaar.net',
    cross: true
  },
  // this test case could be left out with typescript
  {
    url: 42,
    cross: false
  }
])('cross domain tests', (data) => {
  const shouldCross = (data.cross) ? 'is' : 'is not'

  test(`checks if ${data.url} ${shouldCross} cross domain`, () => {
    expect(api.isUrlCrossDomain(data.url)).toBe(data.cross)
  })
})

describe.each([
  {
    base: 'http://localhost/',
    url: '//foo.com',
    params: {},
    result: 'http://foo.com/'
  },
  {
    base: 'http://localhost/',
    url: '/relative',
    params: {
      foo: true,
      bar: 21
    },
    result: 'http://localhost/relative?foo=true&bar=21'
  },
  {
    base: 'http://localhost/api/',
    url: 'relative',
    params: {},
    result: 'http://localhost/api/relative'
  },
  {
    base: 'http://localhost/api',
    url: 'relative',
    params: {},
    result: 'http://localhost/api/relative'
  },
  {
    base: 'http://localhost/api/',
    url: '/relative',
    params: {},
    result: 'http://localhost/api/relative'
  }
])('url building tests', (data) => {
  const {
    base,
    url,
    params,
    result
  } = data

  test(`combines ${base}, ${url} and ${Object.keys(params).length} parameters to correct url ${result}`, () => {
    api.setBaseUrl(base)
    expect(api._compileUrl(url, params)).toEqual(result)
  })
})

test('handles relative base urls', () => {
  window.location.href = 'http://localhost/'

  api.setBaseUrl('/api/')

  expect(api._compileUrl('')).toEqual('http://localhost/api/')
})
