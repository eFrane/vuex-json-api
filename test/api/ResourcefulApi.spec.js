/**
 * @jest-environment jsdom
 */

import { ResourcefulApi } from '@/api/ResourcefulApi'
import { initTestApi } from '../apiMock'
import { ApiError } from '../../src/errors/ApiError'

initTestApi()

const sut = new ResourcefulApi()
sut.setBaseUrl('http://api/')

describe.each([
  { title: 'normalizes item get', url: '/book/1' },
  { title: 'remains graceful with missing meta', url: '/book/1/nometa' },
  { title: 'remains graceful with missing links', url: '/book/1/nolinks' }
])('item tests', ({ url, title }) => {
  test(`${title}`, async () => {
    expect(await sut.get(url)).toMatchObject({
      data: {
        book: {
          1: {
            attributes: {
              author: expect.any(String),
              title: expect.any(String)
            }
          }
        }
      },
      links: {},
      meta: {}
    })
  })
})

test('fails on missing data', async () => {
  await expect(sut.get('/nodataorerror')).rejects.toThrowErrorMatchingSnapshot(ApiError)
})

test('reads the initial module list', () => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://localhost/')

  const registerModuleMock = jest.fn()

  api.registerModule = registerModuleMock

  api.setupApiModules(['foo', 'bar', 'baz'])

  expect(registerModuleMock.mock.calls.length).toBe(3)
})
