# Example Setup
## Prepare the store

``` js
import { createApp } from 'vue'
import { createStore } from 'vuex'
...
import { initJsonApiPlugin, prepareModuleHashMap, StaticRouter } from '@efrane/vuex-json-api'
import VuexApiRoutes from '<path-to>/VuexApiRoutes'

const router = new StaticRouter(VuexApiRoutes)
let baseUrl = '/my-base/api/1.0'
const app = createApp(rootComponent)

const store = router
  .updateRoutes()
  .then(router => {
    const store = createStore({
      plugins: [
        initJsonApiPlugin({
          router: router,
          baseUrl: baseUrl,
          headers: { }, // you might want to set some custom headers
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
  
app.use(store)

export { store }

```


## Mount Vue


``` js
import { createApp } from 'vue'
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
  let instance = createApp({
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
That's it.
Now you should see the registered modules in the vue devTools.
