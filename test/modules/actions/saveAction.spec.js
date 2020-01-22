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

  beforeAll(async () => {
    api = new ResourcefulApi()
    mockRequest = jest.fn((...args) => {
      const returnVal = { ...args }
      console.log('doRequest Mock', returnVal)
      doRequestCalls++
      return new Promise((resolve) => {
        process.nextTick(() => resolve(returnVal))
      })
    })
    // const mock = mockRequest()
    const bound = mockRequest.bind(api.doRequest)
    bound()

    const router = new StaticRouter([{
      'module': 'foo',
      'action': 'save',
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
        // let moduleBuilder = new ModuleBuilder(vuex, api, 'foo', ['save'])
        // storeModule = moduleBuilder.build()

        vuex.registerModule('foo', { foo: [{ name: 'foo' }] })
        api.foo = {}
        api.foo.update = jest.fn((id, data) => {
          return new Promise((resolve) => {
            process.nextTick(() => resolve({ id, data }))
          })
        })
        vuex.state.foo.initial = {myItem: {id: 'myItem', name: 'myItem test', type: 'foo'}}
        vuex.state.foo.items = {myItem: {id: 'myItem', name: 'myItem updated', type: 'foo'}}

        return vuex
      })
  })

  it('sends the changed delta on patch', async () => {
    const save = saveAction(api, true, 'foo').bind(vuex)
    const result = await save({ commit: jest.fn(() => {}) }, 'myItem')
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    console.dir(result)
    expect(doRequestCalls).toEqual(1)
    expect(result).toEqual('test')
  })
})
