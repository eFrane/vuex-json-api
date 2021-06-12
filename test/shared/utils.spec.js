import { deref, hasOwn, isAbsoluteUri, validateCallbackFn } from '@/shared/utils'

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

test('has own correctly falsifies on null and undefined', () => {
  expect(hasOwn(null, 'foo')).toBeFalsy()
  expect(hasOwn(undefined, 'foo')).toBeFalsy()
})

test('tells relative and absolute uris apart', () => {
  /**
   * List of `uri, is_absolute` pairs for testing.
   *
   * @type {(string|boolean)[][]}
   */
  const testData = [
    ['/my/path', false],
    ['my/other/path', false],
    ['//abso.lute/ly', true],
    ['https://abso.lute/ly', true]
  ]

  for (const [uri, isAbsolute] of testData) {
    expect(isAbsoluteUri(uri)).toStrictEqual(isAbsolute)
  }
})

test('is truthy on valid callback', () => {
  expect(validateCallbackFn(() => { })).toBeTruthy()

  const fn = () => { }
  expect(validateCallbackFn(fn)).toBeTruthy()
})

test('is falsy on invalid callback', () => {
  expect(validateCallbackFn(true)).toBeFalsy()
  expect(validateCallbackFn(42)).toBeFalsy()
  expect(validateCallbackFn('str')).toBeFalsy()
})
