/**
 * @jest-environment jsdom
 */

import { ResourcefulApi } from '@/api/ResourcefulApi'
import { initTestApi } from '../apiMock'

initTestApi()

const sut = new ResourcefulApi()
sut.setBaseUrl('http://api/')

test('normalizes item get', async () => {
  expect(await sut.get('/book/1')).toMatchObject({
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

test('reads the initial module list', () => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://localhost/')

  const registerModuleMock = jest.fn()

  api.registerModule = registerModuleMock

  api.setupApiModules(['foo', 'bar', 'baz'])

  expect(registerModuleMock.mock.calls.length).toBe(3)
})
