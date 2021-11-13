/**
 * @jest-environment jsdom
 */

import { ResourcefulApi } from '@/api/ResourcefulApi'
import { initApiMockServer } from '../apiMock'

initApiMockServer()

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
      meta: {},
      status: 200
    })
  })
})

test('fails on missing data', async () => {
  await expect(sut.get('/no-data-or-error')).rejects.toThrowErrorMatchingSnapshot()
})

test('fails on not found', async () => {
  await expect(sut.get('/not-found')).rejects.toThrowErrorMatchingSnapshot()
  await expect(sut.get('/not-found-with-json')).rejects.toThrowErrorMatchingSnapshot()
})

test('reads the initial module list', () => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://localhost/')

  const registerModuleMock = jest.fn()

  api.registerModule = registerModuleMock

  api.setupApiModules(['foo', 'bar', 'baz'])

  expect(registerModuleMock.mock.calls.length).toBe(3)
})

test('runs response callbacks', async () => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://api/')
  api.addResponseCallback((response, status) => {
    response.status_on_response = status

    return response
  })

  expect(await api.get('/book/1')).toMatchObject({
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
    meta: {},
    status: 200,
    status_on_response: 200
  })
})

test('runs request callbacks', async () => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://api/')

  const cb = jest.fn(data => {
    return data
  })

  api.addRequestCallback(cb)

  await api.get('/book/1')

  expect(cb.mock.calls.length).toBe(1)
})
