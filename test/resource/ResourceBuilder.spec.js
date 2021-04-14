import { ResourceBuilder } from '@/module/resource/ResourceBuilder'
import Vuex from 'vuex'

const jsonResourceMock = {
  data: {
    attributes: {
      name: 'Some Name'
    },
    id: 'aa1',
    type: 'test',
    relationships: {
      relatedObject: {
        data: {
          id: 'cc1',
          type: 'relatedObject'
        }
      },
      relObjs: {
        data: [
          {
            id: 'cc1',
            type: 'relObjs'
          },
          {
            id: 'cc2',
            type: 'relObjs'
          }
        ]
      }
    }
  },
  includeds: [{
    id: 'cc1',
    type: 'relObjs',
    attributes: {
      name: 'relative lame name',
      anotherProp: 'test'
    }
  }]
}

const obj = new ResourceBuilder(Vuex).build(jsonResourceMock)

test('shoud add a "get" Method wich returns the value from the given attribute', () => {
  expect(typeof obj.get).toBe('function')

  expect(obj.get('name')).toBe(jsonResourceMock.data.attributes.name)
  expect(obj.get('fail')).toEqual(new Error('attribute "fail" not found'))
})

test('shoud return the value from the given attribute', () => {
  expect(obj.attributes.name).toBe(jsonResourceMock.data.attributes.name)
  expect(obj.attributes.fail).toBe(undefined)
})
