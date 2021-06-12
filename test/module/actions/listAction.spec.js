import { getVuexContextForResourceType, initApiMock } from '../../apiMock'
import { listAction } from '../../../src/module/actions/listAction'

const api = initApiMock()

test('simple list action', async () => {
  const action = listAction(api, 'book', undefined)
  expect(action).toBeInstanceOf(Function)

  const result = await action(getVuexContextForResourceType(api, 'book'))

  expect(result).toBeInstanceOf(Object)
  expect(result.status).toBe(200)
})
