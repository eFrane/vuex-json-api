import { getAction } from '../../../src/module/actions/getAction'
import { getVuexContextForResourceType, initApiMock } from '../../apiMock'

const api = initApiMock()

test('simple get action', async () => {
  const action = getAction(api, 'book', undefined)
  expect(action).toBeInstanceOf(Function)

  const bookModule = getVuexContextForResourceType(api, 'book')
  const result = await action(bookModule, { id: 1 })

  expect(result).toBeInstanceOf(Object)
  expect(result.status).toBe(200)
  expect(result.data.book[1]).toMatchObject({
    id: 1,
    type: 'book',
    attributes: expect.any(Object)
  })

  expect(Object.keys(bookModule.state.items).length).toBe(1)
})
