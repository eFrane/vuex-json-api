import { Api } from '@/api/Api'
import fetchMock from 'fetch-mock'

// This spec only tests the request related methods of Api

fetchMock.config.sendAsJson = false
fetchMock.get('https://test/', { body: '{}' })
fetchMock.post('https://test/error', { body: '{}', status: 400 })

const api = new Api()
api.setBaseUrl('https://test')

test('request sends correct headers', async () => {
  const response = await api._doRequest('get', '/')
  let receivedRequestOptions = fetchMock.lastOptions()

  expect(receivedRequestOptions.headers).toStrictEqual({
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  })

  expect(await response.json()).toEqual({})

  api.setHeader('X-Custom-Header', 'custom-value')

  await api._doRequest('get', '/')
  receivedRequestOptions = fetchMock.lastOptions()

  expect(receivedRequestOptions.headers).toHaveProperty('X-Custom-Header')
  expect(receivedRequestOptions.headers['X-Custom-Header']).toEqual('custom-value')
})

test('executes success callbacks', async () => {
  let calls = 0
  const cb = () => { calls++ }

  api.addSuccessCallback(cb)
  await api.get('/')

  expect(calls).toBe(1)
})

test('executes error callbacks', async () => {
  let calls = 0
  const cb = () => { calls++ }

  api.addErrorCallback(cb)
  await api.post('/error')

  expect(calls).toBe(1)
})

test('verb methods pass to _doRequest', () => {
  const nonRequestingApi = new Api()
  nonRequestingApi._doRequest = jest.fn()

  nonRequestingApi.get('/')
  expect(nonRequestingApi._doRequest.mock.calls.length).toBe(1)
  expect(nonRequestingApi._doRequest.mock.calls[0]).toEqual(['get', '/', null, null])

  nonRequestingApi.post('/')
  expect(nonRequestingApi._doRequest.mock.calls.length).toBe(2)
  expect(nonRequestingApi._doRequest.mock.calls[1]).toEqual(['post', '/', null, null])

  nonRequestingApi.put('/')
  expect(nonRequestingApi._doRequest.mock.calls.length).toBe(3)
  expect(nonRequestingApi._doRequest.mock.calls[2]).toEqual(['put', '/', null, null])

  nonRequestingApi.patch('/')
  expect(nonRequestingApi._doRequest.mock.calls.length).toBe(4)
  expect(nonRequestingApi._doRequest.mock.calls[3]).toEqual(['patch', '/', null, null])

  nonRequestingApi.delete('/')
  expect(nonRequestingApi._doRequest.mock.calls.length).toBe(5)
  expect(nonRequestingApi._doRequest.mock.calls[4]).toEqual(['delete', '/', null, null])
})
