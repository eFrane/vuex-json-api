import { checkConfigProperty } from '@/helpers/checkConfigProperty'

const myObj = {
  testProp: 42
}

it('returns true if the property exists and is required', () => {
  expect(checkConfigProperty(myObj, 'testProp', true)).toBeTruthy()
  expect(checkConfigProperty(myObj, 'testProp')).toBeTruthy()
})

it('returns false if the property doesn\'t exist and isn\'t required', () => {
  expect(checkConfigProperty(myObj, 'bar', false)).toBeFalsy()
})

it('throws an error if the property doesn\'t exist but is required', () => {
  function testRequiredNonExisting () {
    checkConfigProperty(myObj, 'bar', true)
  }

  function testRequiredNonExistingDefaultRequired () {
    checkConfigProperty(myObj, 'bar')
  }

  expect(testRequiredNonExisting).toThrowErrorMatchingSnapshot()
  expect(testRequiredNonExistingDefaultRequired).toThrowErrorMatchingSnapshot()
})
