import { getVuexContextForResourceType, initApiMock } from '../../apiMock'
import { listAction } from '../../../src/module/actions/listAction'

const api = initApiMock()

test('simple list action with different casings of the moduleName', async () => {
  ['Author', 'book', 'Category'].forEach(async (moduleName) => {
    const action = listAction(api, moduleName, undefined)
    expect(action).toBeInstanceOf(Function)

    const module = getVuexContextForResourceType(api, moduleName)
    const result = await action(module)

    expect(result).toBeInstanceOf(Object)
    expect(result.status).toBe(200)
    expect(Object.keys(result.data[moduleName]).length).toBe(3)
    expect(Object.keys(module.state.items).length).toBe(3)
  })
})
