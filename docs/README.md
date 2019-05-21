# Json:Api for Vuex

> Automagic Json:Api integration for Vuex

This is the documentation for `@efrane/vuex-json-api` which makes working
with a [Json:Api](https://jsonapi.org) from [Vuex](https://vuex.vuejs.org)
a magical experience.

## Quick Setup

In your entrypoint do something like:

```js
import Vue from 'vue/dist/vue.esm'

import {
  createVueInstance,
  createVuexStore,
  Api,
  StaticRouter
} from '@efrane/vuex-json-api'

import App from './App'

import PlaygroundRoutes from '@efrane/vuex-json-api/misc/JsonApiPlaygroundRoutes'

Api.setBaseUrl('https://jsonapiplayground.reyesoft.com')

const router = new StaticRouter(PlaygroundRoutes)

createVuexStore({}, router)
  .then((store) => {
    return createVueInstance(store, { App })
  })
  .then(instance => instance.$mount('#app'))
```

Then, in `App.vue`:

```js
{
  // ...
  computed: ...mapState('books', {
    books: state => state.items
  })
  // ...
}
```

```html
  <ul>
    <li v-for="book in books">{{ book.attributes.title }}</li>
  </ul>
```
