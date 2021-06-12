import fetchMock from 'fetch-mock'
import faker from 'faker'
import { ResourcefulApi } from '../src/api/ResourcefulApi'
import { Route } from '../src/route/Route'
import { Router } from '../src/route/Router'
import Vue from 'vue'
import Vuex from 'vuex'

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

export function initApiMockServer () {
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
  fetchMock.get(url('/book/1/nometa'), response(book(1), null))
  fetchMock.get(url('/book/1/nolinks'), response(book(1), {}, null))
  fetchMock.get(url('/book/'), response([book(1), book(2), book(3)]))

  fetchMock.get(url('/no-data-or-error'), response(null))
  fetchMock.get(url('/not-found'), { status: 404 })
  fetchMock.get(url('/not-found-with-json'), {
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

  Vue.use(Vuex)

  const router = new Router()
  router
    .addRoute(new Route('book', 'get', '/book/{id}', ['id']))
    .addRoute(new Route('book', 'list', '/book/', []))

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
