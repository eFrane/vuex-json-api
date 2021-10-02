import { getVuexContextForResourceType, initApiMock } from '../../apiMock'
import { createAction } from '../../../src/module/actions/createAction'

const api = initApiMock()
const action = createAction(api, 'book')
const bookModule = getVuexContextForResourceType(api, 'book')

test('creates without id', async () => {
  action(bookModule, { type: 'Book', attributes: {} })
})
