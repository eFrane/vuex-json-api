const FakeServer = require('fake-json-api-server/src/nodeServer')

new FakeServer({
  port: 3000,
  resources: {
    tag: {
      data: [
        {
          type: 'tag',
          id: '1',
          attributes: { title: 'Tag 1' }
        },
        {
          type: 'tag',
          id: '2',
          attributes: {title: 'Tag 2'}
        }
      ]
    },
    article: {
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
  }
});
