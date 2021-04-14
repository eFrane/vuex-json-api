import { getTestServer } from '../server/getTestServer'
import { ResourcefulApi } from '@/api/ResourcefulApi'

let api = null
let testServer = null

beforeAll(() => {
  api = new ResourcefulApi()
  api.setBaseUrl('http://localhost:3000/')
  testServer = getTestServer(3000)
})

afterAll(() => {
  testServer.close()
})

test('normalizes responses', () => {
  return api.get('tag/1').then(
    data => {
      expect(data).toBeDefined()
      expect(data).toStrictEqual({
        data: {
          tag: {
            1: {
              id: '1',
              type: 'tag',
              attributes: {
                title: 'Tag 1'
              }
            }
          }
        },
        meta: undefined,
        status: 200
      })
    })
})

test('reads the initial module list', () => {
  const registerModuleMock = jest.fn()

  api.registerModule = registerModuleMock

  api.setupApiModules(['foo', 'bar', 'baz'])

  expect(registerModuleMock.mock.calls.length).toBe(3)
})
