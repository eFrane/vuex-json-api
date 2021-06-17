import { getVuexContextForResourceType, initApiMock } from '../../apiMock'
import { deleteAction } from '../../../src/module/actions/deleteAction'
import { getAction } from '../../../src/module/actions/getAction'

const api = initApiMock()
const action = deleteAction(api, 'book')
const bookModule = getVuexContextForResourceType(api, 'book')

test('action is function', () => {
  expect(action).toBeInstanceOf(Function)
})

beforeEach(async () => {
  await getAction(api, 'book', undefined)(bookModule, { id: 1 })
})

test('simple delete action', async () => {
  expect(Object.keys(bookModule.state.items).length).toBe(1)

  const response = await action(bookModule, { id: 1, q: 'delete-successful' })

  expect(response.status).toBe(204)
  expect(response.data).toBeNull()

  expect(Object.keys(bookModule.state.items).length).toBe(0)
})

test('delete with server error: not found', async () => {
  expect(Object.keys(bookModule.state.items).length).toBe(1)

  const response = await action(bookModule, { id: 1, q: 'delete-not-found' })

  expect(response).toBeNull()

  expect(Object.keys(bookModule.state.items).length).toBe(0)
})

test('delete with meta in response', async () => {
  expect(Object.keys(bookModule.state.items).length).toBe(1)

  const response = await action(bookModule, { id: 1, q: 'delete-with-meta' })

  expect(response.status).toBe(200)
  expect(response.meta).toEqual({ foo: 'bar' })

  expect(Object.keys(bookModule.state.items).length).toBe(0)
})
