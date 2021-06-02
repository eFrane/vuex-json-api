import { Api } from '@/api/Api'
import fetchMock from 'fetch-mock'

// This spec only tests the request related methods of Api

test('request sends correct headers', async () => {
  fetchMock.config.sendAsJson = false
  fetchMock.get('https://test/', { body: '{}' })

  const api = new Api()
  api.setBaseUrl('https://test')
  let response = await api._doRequest('get', '/')
  let receivedRequestOptions = fetchMock.lastOptions()

  expect(receivedRequestOptions.headers).toStrictEqual({
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  })

  expect(await response.json()).toEqual({})

  api.setHeader('X-Custom-Header', 'custom-value')

  response = api._doRequest('get', '/')
  receivedRequestOptions = fetchMock.lastOptions()

  expect(receivedRequestOptions.headers).toHaveProperty('X-Custom-Header')
  expect(receivedRequestOptions.headers['X-Custom-Header']).toEqual('custom-value')
})

test('verb methods pass to doRequest', () => {
  const nonRequestingApi = new Api()
  nonRequestingApi.doRequest = jest.fn()

  nonRequestingApi.get('/')
  expect(nonRequestingApi.doRequest.mock.calls[0]).toEqual(['get', '/', null, null])

  nonRequestingApi.post('/')
  expect(nonRequestingApi.doRequest.mock.calls[1]).toEqual(['post', '/', null, null])

  nonRequestingApi.put('/')
  expect(nonRequestingApi.doRequest.mock.calls[2]).toEqual(['put', '/', null, null])

  nonRequestingApi.patch('/')
  expect(nonRequestingApi.doRequest.mock.calls[3]).toEqual(['patch', '/', null, null])

  nonRequestingApi.delete('/')
  expect(nonRequestingApi.doRequest.mock.calls[4]).toEqual(['delete', '/', null, null])
})
