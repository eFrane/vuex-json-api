import { ResourcefulApi } from '@/api/ResourcefulApi'
import { saveAction } from '@/module/actions/saveAction'
import { StaticRouter } from '@/route/StaticRouter'
import { initJsonApiPlugin } from '@/init/initJsonApiPlugin'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('saveAction', () => {
  let api = null
  let vuex = null
  let mockRequest = null
  let doRequestCalls = 0
  let requestData = null
  let requestMethod = null
  // Data to test with
  const initData = { myItem: { id: 'myItem', name: 'myItem test', type: 'foo' } }
  const itemData = { myItem: { id: 'myItem', name: 'myItem updated', type: 'foo' } }

  beforeAll(async () => {
    // reset requestCalls
    doRequestCalls = 0
    api = new ResourcefulApi()

    // mock doRequest
    mockRequest = jest.spyOn(api, 'doRequest')
    mockRequest.mockImplementation((...args) => {
      doRequestCalls++
      requestData = args[3]
      requestMethod = args[0]
      return new Promise(resolve => process.nextTick(() => resolve(args)))
    })

    // setup store
    const router = new StaticRouter([{
      'module': 'foo',
      'action': 'update',
      'url': '/'
    }])
    api.setupResourcefulRequests(router)
    api.setBaseUrl('/')
    vuex = await router
      .updateRoutes()
      .then(router => {
        const store = new Vuex.Store({
          plugins: [
            initJsonApiPlugin({
              router: router,
              baseUrl: ''
            })
          ]
        })
        return store
      })
      .then(vuex => {
        vuex.registerApiModule('foo')
        vuex.state.foo.initial = initData
        vuex.state.foo.items = itemData

        return vuex
      })
  })

  it('sends the changed delta on patch', async () => {
    const save = saveAction(api, true, 'foo').bind(vuex)
    await save(vuex, 'myItem')
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    expect(doRequestCalls).toEqual(1)
    expect(requestData.data).toMatchObject(itemData.myItem)
    expect(requestMethod).toMatch('patch')
  })
})
