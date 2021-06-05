import fetchMock from 'fetch-mock'
import faker from 'faker'

function response (data, meta = {}, links = {}) {
  const jsonApiResponse = {}

  if (data) {
    jsonApiResponse.data = data
  }

  if (meta) {
    jsonApiResponse.meta = meta
  }

  if (links) {
    jsonApiResponse.links = links
  }

  return { body: JSON.stringify(jsonApiResponse) }
}

function url (path) {
  return new URL(path, 'http://api/')
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

  fetchMock.get(url('/book/1'), response(item))
  fetchMock.get(url('/book/1/nometa'), response(item, null))
  fetchMock.get(url('/book/1/nolinks'), response(item, {}, null))

  fetchMock.get(url('/nodata'), response(null))
}
