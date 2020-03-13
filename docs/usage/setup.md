# Example Setup
## prepare the store

``` js
import Vue from 'vue'
import Vuex from 'vuex'
...
import { initJsonApiPlugin, prepareModuleHashMap, StaticRouter } from '@efrane/vuex-json-api'
import VuexApiRoutes from '<path-to>/VuexApiRoutes'

Vue.use(Vuex)

// create The Router
const router = new StaticRouter(VuexApiRoutes)

// set the baseUrl
let baseUrl = '/my-base/api/1.0'

// create a store instance
const store = router
  .updateRoutes()
  .then(router => {
    const store = new Vuex.Store({
      plugins: [
        initJsonApiPlugin({
          router: router,
          baseUrl: baseUrl,
          headers: { }, // you might want set some custum headers
          preprocessingCallbacks: [], // you can pass an array of promise resolving methods to manipulate the response before passing it to the store
          errorCallbacks: [], // you can pass an array of promise resolving methods to manipulate the response if an error gets returned (e.g. statuscode >= 400)
        }),
        store => {
          store.api.checkResponse = checkResponse
        }
      ]
    })

    return store
  })

export { store }

```


## Mount Vue


``` js
import { store } from '<the-place-of-the-above-file>/Store'

// The Module names has
const presetModules = [
  {
    name: 'module-name-a',
    defaultQuery: {
      group: 'module-name-a'
    }
  }, {
    name: 'module-name-b',
    defaultQuery: {
      group: 'module-name-b'
    }
  }
]

store.then(store => {
  let instance = new Vue({
    components: [], // do the regular stuff you do, when using vue
    store,
  }).then(() => {

    // register preset modules
    if (presetStoreModules) {
      for (let rootModule in presetStoreModules) {
        if (Object.prototype.hasOwnProperty.call(presetStoreModules, rootModule)) {
          presetStoreModules[rootModule].forEach(presetModule => {
            store.createPresetModule(presetModule.name, {
              base: rootModule,
              defaultQuery: presetModule.defaultQuery
            })
          })
        }
      }
    }
  })
})
```
Thats it.
now you should see the registered modules in the vue devTools.
