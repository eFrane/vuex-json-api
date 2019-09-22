import { getTestServer } from '../server/getTestServer'
import { Api } from '@/api/Api'

// test constructor defaults
describe('Api configuration', () => {
  it('has no default base url', () => {
    expect(Api.baseUrl).toBeUndefined()

    const api = new Api()
    expect(api.baseUrl).toBe('')
  })
})

describe('Api server interaction', () => {
  let api = null
  let testServer = null

  beforeAll(() => {
    api = new Api()
    api.setBaseUrl('http://localhost:3000/')
    testServer = getTestServer(3000)
  })

  afterAll(() => {
    testServer.close()
  })

  it('sends requests to the server', () => {
    return api.get('tag/').then(
      (data) => expect(data).toBeDefined()
    )
  })
})
