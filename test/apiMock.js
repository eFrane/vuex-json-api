import fetchMock from 'fetch-mock'
import faker from 'faker'
import { ResourcefulApi } from '../src/api/ResourcefulApi'
import { Route } from '../src/route/Route'
import { Router } from '../src/route/Router'
import Vuex from 'vuex'

function response (data, meta = {}, links = {}, status = 200) {
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

  return { body: JSON.stringify(jsonApiResponse), status }
}

/**
 * @param {string} path
 * @returns {string}
 */
function url (path) {
  return (new URL(path, 'http://api/')).href
}

export function initApiMockServer () {
  fetchMock.reset()
  fetchMock.config.sendAsJson = false

  function book (id) {
    return {
      type: 'Book',
      id,
      attributes: {
        author: faker.name.findName(),
        title: faker.lorem.words(3)
      }
    }
  }

  fetchMock.get(url('/book/1'), response(book(1)))
  fetchMock.getOnce(url('/book/1/nometa'), response(book(1), null))
  fetchMock.getOnce(url('/book/1/nolinks'), response(book(1), {}, null))
  fetchMock.get(url('/book/'), response([book(1), book(2), book(3)]))
  fetchMock.postOnce(url('/book/'), response(book('new'), {}, {}, 201))
  fetchMock.postOnce({
    url: url('/clientBook/'),
    matchPartialBody: true,
    body: {
      id: 'client-side-id'
    }
  }, response(book('client-side-id'), {}, {}, 201))
  fetchMock.delete(url('/book/1'), { status: 204 })
  fetchMock.delete(url('/book/1?q=delete-accepted'), { status: 202 })
  fetchMock.delete(url('/book/1?q=delete-successful'), { status: 204 })
  fetchMock.delete(url('/book/1?q=delete-with-meta'), {
    status: 200,
    body: JSON.stringify({
      data: null,
      meta: {
        foo: 'bar'
      }
    })
  })
  fetchMock.delete(url('/book/1?q=delete-not-found'), {
    status: 404
  })

  fetchMock.getOnce(url('/no-data-or-error'), response(null))
  fetchMock.getOnce(url('/not-found'), { status: 404 })
  fetchMock.getOnce(url('/not-found-with-json'), {
    status: 404,
    body: JSON.stringify({
      errors: [
        {
          code: 42,
          title: 'Answer already given'
        }
      ]
    })
  })
}

/**
 *
 * @returns {ResourcefulApi}
 */
export function initApiMock () {
  initApiMockServer()

  // Vue.use(Vuex)

  const router = new Router()
  router
    .addRoute(new Route('book', 'get', '/book/{id}', ['id']))
    .addRoute(new Route('book', 'delete', '/book/{id}', ['id']))
    .addRoute(new Route('book', 'list', '/book/', []))
    .addRoute(new Route('book', 'create', '/book/', []))

  const store = new Vuex.Store()
  const api = new ResourcefulApi()

  api.setBaseUrl('http://api/')
  api.setStore(store)
  api.setupResourcefulRequests(router)
  api.setupApiModules(['book'])

  return api
}

export function getVuexContextForResourceType (api, type) {
  return api.store._modules.root._children[type].context
}
