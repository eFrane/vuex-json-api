import { hasRelationship } from '@/module/resource/hasRelationship'

const jsonResourceMock = {
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
    missingRelatedObject: {
      data: null
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
    },
    missingRelObjs: {
      data: []
    }
  }
}

test('should return a function', () => {
  const hasRel = hasRelationship(jsonResourceMock)
  expect(typeof hasRel).toBe('function')
})

test('should return true for existing to-one relationships', () => {
  const hasRel = hasRelationship(jsonResourceMock)('relatedObject')
  expect(hasRel).toBe(true)
})

test('should return true for existing to-many relationships', () => {
  const hasRel = hasRelationship(jsonResourceMock)('relObjs')
  expect(hasRel).toBe(true)
})

test('should return false for non-existing to-one relationships', () => {
  const hasRel = hasRelationship(jsonResourceMock)('missingRelatedObject')
  expect(hasRel).toBe(false)
})

test('should return false for non-existing to-many relationships', () => {
  const hasRel = hasRelationship(jsonResourceMock)('missingRelObjs')
  expect(hasRel).toBe(false)
})
