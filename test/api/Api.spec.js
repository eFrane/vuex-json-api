import { Api } from '@/api/Api'
import { ApiError } from '@/errors/ApiError'

let api = null
api = new Api()
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

  expect(api.preprocessingCallbacks.length).toBe(0)
  expect(api.errorCallbacks.length).toBe(0)

  expect(() => {
    api.addPreprocessingCallback(validCb)
  }).not.toThrow(ApiError)

  expect(() => {
    api.addPreprocessingCallback(invalidCb)
  }).toThrow(ApiError)

  expect(() => {
    api.addErrorCallback(validCb)
  }).not.toThrow(ApiError)

  expect(() => {
    api.addErrorCallback(invalidCb)
  }).toThrow(ApiError)

  expect(api.preprocessingCallbacks.length).toBe(1)
  expect(api.errorCallbacks.length).toBe(1)

  api.resetPreprocessing()
  api.resetErrorCallbacks()

  expect(api.preprocessingCallbacks.length).toBe(0)
  expect(api.errorCallbacks.length).toBe(0)

  expect(() => {
    api.setPreprocessingCallbacks([validCb, invalidCb])
  }).toThrow(ApiError)

  expect(api.preprocessingCallbacks.length).toBe(1)

  expect(() => {
    api.setPreprocessingCallbacks([invalidCb, validCb])
  }).toThrow(ApiError)

  expect(api.preprocessingCallbacks.length).toBe(2)

  expect(() => {
    api.setPreprocessingCallbacks([validCb])
  }).not.toThrow(ApiError)

  expect(api.preprocessingCallbacks.length).toBe(3)

  api.resetPreprocessing()

  expect(() => {
    api.setErrorCallbacks([validCb, invalidCb])
  }).toThrow(ApiError)

  expect(api.errorCallbacks.length).toBe(1)

  expect(() => {
    api.setErrorCallbacks([invalidCb, validCb])
  }).toThrow(ApiError)

  expect(api.errorCallbacks.length).toBe(2)

  expect(() => {
    api.setErrorCallbacks([validCb])
  }).not.toThrow(ApiError)

  expect(api.errorCallbacks.length).toBe(3)

  api.resetErrorCallbacks()
})

test('adding headers', () => {
  expect(api.addHeader).toThrow(ApiError)

  expect(() => {
    api.addHeader(42, 34)
  }).toThrow(ApiError)

  expect(Object.keys(api.headers).length).toBe(3)

  api.addHeader('foo', 'bar')

  expect(Object.keys(api.headers).length).toBe(4)
  expect(api.headers.foo).toBe('bar')

  expect(() => {
    api.addHeader('foo', 'baz')
  }).toThrow(ApiError)

  expect(Object.keys(api.headers).length).toBe(4)

  api.addHeader('foo', 'baz', true)

  expect(api.headers.foo).toBe('baz')
  expect(Object.keys(api.headers).length).toBe(4)

  api.addHeaders({
    extra1: 'a',
    extra2: 'b'
  })

  expect(Object.keys(api.headers).length).toBe(6)
  expect(api.headers.extra2).toBe('b')
})
