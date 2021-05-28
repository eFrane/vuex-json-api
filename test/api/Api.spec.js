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
})
