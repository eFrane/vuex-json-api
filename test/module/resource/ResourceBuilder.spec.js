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

test('should add relationship methods if there are relationships', () => {
  expect(typeof obj.loadRel).toBe('function')
  expect(typeof obj.rel).toBe('function')
})

test('should not add relationship methods if there are no relationships', () => {
  const jsonNoRel = {
    data: {
      attributes: jsonResourceMock.data.attributes,
      type: jsonResourceMock.data.type,
      id: jsonResourceMock.data.id
    }
  }

  const resourceObj = new ResourceBuilder(Vuex).build(jsonNoRel)

  expect(typeof resourceObj.loadRel).toBe('undefined')
  expect(typeof resourceObj.rel).toBe('undefined')
})

test('should not add relationship methods for non-existing relationships', () => {
  const jsonSomeRel = {
    data: {
      attributes: jsonResourceMock.data.attributes,
      type: jsonResourceMock.data.type,
      id: jsonResourceMock.data.id,
      relationships: {
        someRel: {
          data: {
            id: 'lala',
            type: 'some-rel'
          }
        },
        moreRel: {
          data: [
            { id: 'first', type: 'more-rel' }, { id: 'second', type: 'more-rel' }
          ]
        },
        noSingleRel: {
          data: null
        },
        noMultipleRel: {
          data: []
        }
      }
    }
  }

  const someObj = new ResourceBuilder(Vuex).build(jsonSomeRel)

  expect(typeof someObj.relationships.someRel.get).toBe('function')
  expect(typeof someObj.relationships.someRel.load).toBe('function')
  expect(typeof someObj.relationships.moreRel.list).toBe('function')
  expect(typeof someObj.relationships.noSingleRel.get).toBe('undefined')
  expect(typeof someObj.relationships.noSingleRel.load).toBe('undefined')
  expect(typeof someObj.relationships.noSingleRel.list).toBe('undefined')
  expect(typeof someObj.relationships.noMultipleRel.get).toBe('undefined')
  expect(typeof someObj.relationships.noMultipleRel.load).toBe('undefined')
  expect(typeof someObj.relationships.noMultipleRel.list).toBe('undefined')
})
