import { getVuexContextForResourceType, initApiMock } from '../../apiMock'
import { listAction } from '../../../src/module/actions/listAction'

const api = initApiMock()

test('simple list action', async () => {
  const action = listAction(api, 'book', undefined)
  expect(action).toBeInstanceOf(Function)

  const bookModule = getVuexContextForResourceType(api, 'book')
  const result = await action(bookModule)

  expect(result).toBeInstanceOf(Object)
  expect(result.status).toBe(200)
  expect(Object.keys(result.data.book).length).toBe(3)
  expect(Object.keys(bookModule.state.items).length).toBe(3)
})
