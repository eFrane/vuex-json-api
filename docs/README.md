---
sidebar: 'off'
---

# Json:Api for Vuex

> Automagic Json:Api integration for Vuex

This is the documentation for `@efrane/vuex-json-api` which makes working
with a [Json:Api](https://jsonapi.org) from [Vuex](https://vuex.vuejs.org)
a magical experience.

## Quick Setup

In your entrypoint do something like:

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

import {
  Api,
  StaticRouter
} from '@efrane/vuex-json-api'

import PlaygroundRoutes from '@efrane/vuex-json-api/misc/JsonApiPlaygroundRoutes'

Api.setBaseUrl('https://jsonapiplayground.reyesoft.com')

const router = new StaticRouter(PlaygroundRoutes)

const storeOptions = {} // your store options

const store = createStore(storeOptions, router)
  .then(store => {
    const app = createApp(store, { App })

    app.use(store)
    app.mount('#app')
  })
```

Then, in `App.vue`:

```vue
{
  // ...
  computed: {
    ...mapState('books', {
      books: state => state.items
    })
  },

  methods: {
    ...mapActions('books', ['list'])
  },

  mounted () {
    this.list()
  }
  // ...
}
```

```html
  <ul>
    <li v-for="book in books">{{ book.attributes.title }}</li>
  </ul>
```
