import { Api } from '@/api/Api'

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

test.skip('sends requests to the server', () => {
  return api.get('tag/1').then(
    data => {
      expect(data).toBeDefined()
      expect(data.data).toStrictEqual({
        data: {
          attributes: {
            title: 'Tag 1'
          },
          id: '1',
          type: 'tag'
        },
        jsonapi: {
          version: '1.0'
        }
      })
    }
  )
})
