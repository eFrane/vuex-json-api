import fetchMock from 'fetch-mock'
import faker from 'faker'

function wrapIntoJsonApi (data, meta = {}, links = {}) {
  return JSON.stringify({
    data,
    meta,
    links
  })
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
}
