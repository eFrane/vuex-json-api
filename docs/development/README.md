# Development

As this library is basically a [Vuex](https://vuex.vuejs.org)-Plugin, some
unexpected weirdness may come the way of a developer. Most of which come
down to naming differences between the <jsonapi /> and the Vuex contexts:

- Resource types in <jsonapi /> are namespaced modules in Vuex
- This library makes rather extensive use of [Proxy][mdn-proxy] objects,
  mostly to keep Vuex's reactivity magic getting to places where it would 
  do more harm than good.

## Testing

The test setup is based around [Jest](https://jestjs.io), 
[Fetch Mock][fetch-mock] and the [Vue Test Utils][vue-test-utils].

When testing interactions against a <jsonapi />, `tests/apiMock.js`
provides a few helpers:

| Method | Description |
|--|--|
| `initApiMockServer(): void` | Configures `fetch-mock` with several correct <jsonapi /> responses |
| `initApiMock(): ResourcefulApi` | Configures a `ResourcefulApi` against the mock server methods |
| `getVuexContextForResourceType(ResourcefulApi api, string type): { commit, dispatch, getters, state }` | Returns the Vuex context from a configured api module |

[fetch-mock]: http://www.wheresrhys.co.uk/fetch-mock/
[mdn-proxy]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[vue-test-utils]: http://vue-test-utils.vuejs.org
