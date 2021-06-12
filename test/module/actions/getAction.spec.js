import { getAction } from '../../../src/module/actions/getAction'
import { getVuexContextForResourceType, initApiMock } from '../../apiMock'

const api = initApiMock()

test('simple get action', async () => {
  const action = getAction(api, 'book', undefined)
  expect(action).toBeInstanceOf(Function)

  const result = await action(getVuexContextForResourceType(api, 'book'), { id: 1 })
  expect(result).toBeInstanceOf(Object)
  expect(result.status).toBe(200)
  expect(result.data.book[1]).toMatchObject({
    id: 1,
    type: 'book',
    attributes: expect.any(Object)
  })
})
