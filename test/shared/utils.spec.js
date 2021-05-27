import { deref } from '@/shared/utils'

test('dereferences objects', () => {
  const testObj = { foo: 'bar' }
  const dereferenced = deref(testObj)

  expect(dereferenced).not.toBe(testObj)
  expect(dereferenced).toEqual(testObj)
})
