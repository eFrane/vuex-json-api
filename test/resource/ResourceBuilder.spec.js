import { ResourceBuilder } from '@/module/resource/ResourceBuilder'

describe('ResourceBuilder', () => {
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
    }
  }

  it('shoud add a "get" Method wich returns the vaue from the given attribute', () => {
    const obj = new ResourceBuilder().build(jsonResourceMock)
    expect(typeof obj.get).toBe('function')

    expect(obj.get('name')).toBe(jsonResourceMock.data.attributes.name)
    expect(obj.get('fail')).toBe(null)
  })
})
