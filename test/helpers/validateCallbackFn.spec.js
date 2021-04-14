import { validateCallbackFn } from '@/helpers/validateCallbackFn'

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
