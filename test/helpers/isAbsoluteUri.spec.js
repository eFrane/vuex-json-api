import { isAbsoluteUri } from '@/helpers/isAbsoluteUri'

test('detects fully-absolute uris', () => {
  expect(isAbsoluteUri('https://openstreetmap.org')).toBeTruthy()
  expect(isAbsoluteUri('http://insecureexample.com')).toBeTruthy()
})

test('detects multi-protocol uris', () => {
  expect(isAbsoluteUri('//my-absolute.uri/api')).toBeTruthy()
  expect(isAbsoluteUri('//sch.urps')).toBeTruthy()
})

test('is falsy for relative uris', () => {
  expect(isAbsoluteUri('/api/1.0')).toBeFalsy()
  expect(isAbsoluteUri('api/meeeeep')).toBeFalsy()
})
