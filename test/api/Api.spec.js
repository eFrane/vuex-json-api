import { Api } from '@/api/Api'

let api = null
api = new Api()
api.setBaseUrl('http://localhost/')  

test('has no default base url', () => {
  expect(Api.baseUrl).toBeUndefined()

  const unconfigured_api = new Api()
  
  expect(unconfigured_api.baseUrl).toBe('')
})

test('allows changing the base url', () => {
  const unconfigured_api = new Api()
  unconfigured_api.setBaseUrl('/api/')

  expect(unconfigured_api.baseUrl).toBe('/api/')
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
