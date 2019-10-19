import { setCallbackFns } from '@/helpers/setCallbackFns'

describe('setCallbackFns', () => {
  it('returns valid arrays', () => {
    let cbArr1 = [
      () => {}
    ]

    let cbArr2 = [
      (foo) => { return foo },
      (bar) => { return bar }
    ]

    expect(setCallbackFns(cbArr1)).toStrictEqual(cbArr1)
    expect(setCallbackFns(cbArr2)).toStrictEqual(cbArr2)
  })

  it('throws on invalid arrays', () => {
    let cbArr3 = [
      (foo) => { return foo },
      42,
      (bar) => { return bar }
    ]

    function testInvalid () {
      setCallbackFns(cbArr3)
    }

    expect(testInvalid).toThrowErrorMatchingSnapshot()
  })
})
