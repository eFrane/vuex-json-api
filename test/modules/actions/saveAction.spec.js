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
  let save = null
  // Data to test with
  const initData = {
    myItem: {
      id: 'myItem',
      attributes: {
        name: 'myItem test',
        color: 'blue',
        myArray: [
          { id: 1, name: 'aa' },
          { id: 2, name: 'bb' },
          { id: 3, name: 'cc' }
        ],
        myObj: {
          id: '1',
          type: 'test',
          attrs: {
            name: 'test a',
            test: 'test b',
            foo: {
              a: 'aa',
              b: 'bb',
              c: {
                cca: 'cc a',
                ccb: 'cc b'
              },
              d: {
                dda: 'dd a',
                ddb: 'dd b'
              }
            }
          }
        }
      },
      type: 'foo'
    }
  }
  const itemData = {
    myItem: {
      id: 'myItem',
      attributes: {
        name: 'myItem updated',
        color: 'blue',
        myArray: [
          { id: 1, name: 'aa' },
          { id: 2, name: 'bb' },
          { id: 3, name: 'dd' }
        ],
        myObj: {
          id: '1',
          type: 'test',
          attrs: {
            name: 'test a',
            test: 'test b',
            foo: {
              a: 'aa',
              b: 'bb',
              c: {
                cca: 'cc a',
                ccb: 'new value'
              },
              d: {
                dda: 'dd a',
                ddb: 'dd b'
              }
            }
          }
        }
      },
      type: 'foo'
    }
  }

  beforeEach(async () => {
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
      module: 'foo',
      action: 'update',
      url: '/'
    }])

    api.setupResourcefulRequests(router)
    api.setBaseUrl('/')
    vuex = new Vuex.Store({
      plugins: [
        initJsonApiPlugin({
          router: router,
          baseUrl: ''
        })
      ]
    })

    save = saveAction(api, true, 'foo').bind(vuex)

    vuex.registerApiModule('foo')
    vuex.state.foo.initial = initData
    vuex.state.foo.items = itemData
  })

  afterEach(() => {
    vuex = null
    save = null
  })

  it('sends the changed delta on patch', async () => {
    await save(vuex, 'myItem')
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    expect(doRequestCalls).toEqual(1)
    expect({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' }).toMatchObject(requestData.data)
    expect(requestData.data).toMatchObject({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' })
    expect(requestMethod).toMatch('patch')
  })

  it('sends the changed delta and the whole Attribue myArray', async () => {
    await save(vuex, {
      id: 'myItem',
      options: {
        attributes: {
          full: 'myArray'
        }
      }
    })
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    expect(requestData.data).toMatchObject({ id: 'myItem', attributes: { name: 'myItem updated', myArray: itemData.myItem.attributes.myArray, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' })
    expect({ id: 'myItem', attributes: { name: 'myItem updated', myArray: itemData.myItem.attributes.myArray, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' }).toMatchObject(requestData.data)
  })

  it('sends the changed delta and the whole Attribue myObj', async () => {
    await save(vuex, {
      id: 'myItem',
      options: {
        attributes: {
          full: 'myObj'
        }
      }
    })
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })

    expect(requestData.data).toMatchObject({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: itemData.myItem.attributes.myObj }, type: 'foo' })
    expect({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: itemData.myItem.attributes.myObj }, type: 'foo' }).toMatchObject(requestData.data)
  })

  it('sends the changed delta and additional attributes', async () => {
    await save(vuex, {
      id: 'myItem',
      options: {
        attributes: {
          unchanged: 'color'
        }
      }
    })
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    expect(requestData.data).toMatchObject({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' })
    expect({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' }).toMatchObject(requestData.data)
  })

  it('sends the changed delta and doesnt break with invalid options', async () => {
    await save(vuex, {
      id: 'myItem',
      options: {
        notDefinedOption: 'color'
      }
    })
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    expect(requestData.data).toMatchObject({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' })
    expect({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' }).toMatchObject(requestData.data)
  })

  it('sends the changed delta and doesnt break with empty options', async () => {
    await save(vuex, {
      id: 'myItem',
      options: {}
    })
      .then((...args) => {
        const returnval = { ...args }
        return new Promise((resolve) => {
          process.nextTick(() => resolve(returnval))
        })
      })
    expect(requestData.data).toMatchObject({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' })
    expect({ id: 'myItem', attributes: { name: 'myItem updated', myArray: { 2: { name: 'dd' } }, myObj: { attrs: { foo: { c: { ccb: 'new value' } } } } }, type: 'foo' }).toMatchObject(requestData.data)
  })
})
