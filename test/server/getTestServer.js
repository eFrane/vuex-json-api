// const FakeServer = require('fake-json-api-server/src/nodeServer')
import { JsonApiServerAdapter } from './JsonApiServerAdapter'

const tag = {
  data: [
    {
      type: 'tag',
      id: '1',
      attributes: { title: 'Tag 1' }
    },
    {
      type: 'tag',
      id: '2',
      attributes: { title: 'Tag 2' }
    }
  ]
}

const article = {
  data: [
    {
      type: 'article',
      id: '1',
      attributes: {
        title: 'Foo',
        text: 'Lorem ipsum hodor sit sit sit.'
      },
      relationships: {
        tags: {
          data: [
            { type: 'tag', id: '1' },
            { type: 'tag', id: '2' }
          ]
        }
      }
    },
    {
      type: 'article',
      id: '1',
      attributes: {
        title: 'Bar',
        text: 'Barium is not something you want to keep lying around on the kitchen table.'
      },
      relationships: {
        tags: {
          data: [
            { type: 'tag', id: '1' }
          ]
        }
      }
    }
  ]
}

const route = {
  data: [
    {
      type: 'vuexjsonapiroute',
      id: 1,
      attributes: {
        module: 'tag',
        method: 'get',
        url: '/tag'
      }
    },
    {
      type: 'vuexjsonapiroute',
      id: 2,
      attributes: {
        module: 'tag',
        method: 'get',
        url: '/tag/{id}',
        parameters: [
          'id'
        ]
      }
    }
  ]
}

const serverConfig = {
  resources: {
    tag,
    article,
    route
  }
}

function getTestServer (port) {
  const adapter = new JsonApiServerAdapter(serverConfig)
  const app = adapter.getApp()

  return app.listen(port)
}
export { getTestServer }
