import { getVuexContextForResourceType, initApiMock } from '../../apiMock'
import { deleteAction } from '../../../src/module/actions/deleteAction'

const api = initApiMock()
const action = deleteAction(api, 'book')

test('action is function', () => {
  expect(action).toBeInstanceOf(Function)
})

test('simple delete action', async () => {
  const response = await action(getVuexContextForResourceType(api, 'book'), 'delete-accepted')

  expect(response.status).toBe(202)
  expect(response.data).toBeNull()
})

test('delete with server error: not found', async () => {
  const response = await action(getVuexContextForResourceType(api, 'book'), 'delete-not-found')

  expect(response).toBeNull()
})
