/**
 * @jest-environment jsdom
 */

import { ResourcefulApi } from '@/api/ResourcefulApi'

// test.skip('normalizes responses', () => {
//   return api.get('tag/1').then(
//     data => {
//       expect(data).toBeDefined()
//       expect(data).toStrictEqual({
//         data: {
//           tag: {
//             1: {
//               id: '1',
//               type: 'tag',
//               attributes: {
//                 title: 'Tag 1'
//               }
//             }
//           }
//         },
//         meta: undefined,
//         status: 200
//       })
//     })
// })

test('reads the initial module list', () => {
  const api = new ResourcefulApi()
  api.setBaseUrl('http://localhost/')

  const registerModuleMock = jest.fn()

  api.registerModule = registerModuleMock

  api.setupApiModules(['foo', 'bar', 'baz'])

  expect(registerModuleMock.mock.calls.length).toBe(3)
})
