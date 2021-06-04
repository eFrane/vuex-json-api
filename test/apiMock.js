import fetchMock from 'fetch-mock'
import faker from 'faker'

function wrapIntoJsonApi (data, meta = {}, links = {}) {
  const response = {}

  if (data) {
    response.data = data
  }

  if (meta) {
    response.meta = meta
  }

  if (links) {
    response.links = links
  }

  return JSON.stringify(response)
}

export function initTestApi () {
  fetchMock.config.sendAsJson = false

  const item = {
    type: 'Book',
    id: 1,
    attributes: {
      author: faker.name.findName(),
      title: faker.lorem.words(3)
    }
  }

  fetchMock.get('http://api/book/1', { body: wrapIntoJsonApi(item) })
  fetchMock.get('http://api/book/1/nometa', { body: wrapIntoJsonApi(item, null) })
  fetchMock.get('http://api/book/1/nolinks', { body: wrapIntoJsonApi(item, {}, null) })
}
