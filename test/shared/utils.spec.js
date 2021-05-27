import { deref, hasOwn } from '@/shared/utils'

test('dereferences objects', () => {
  const testObj = { foo: 'bar' }
  const dereferenced = deref(testObj)

  expect(dereferenced).not.toBe(testObj)
  expect(dereferenced).toEqual(testObj)
})

test('has own checks for own properties', () => {
  const foo = { foo: 'foo' }

  const bar = Object.create(foo)
  bar.baz = 'baz'

  expect(hasOwn(foo, 'foo')).toBeTruthy()
  expect(hasOwn(bar, 'foo')).toBeFalsy()
  expect(hasOwn(foo, 'bar')).toBeFalsy()
  expect(hasOwn(bar, 'baz')).toBeTruthy()
})
