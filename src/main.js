import Vue from 'vue/dist/vue.esm'

import axios from 'axios'

import { createVueInstance } from './init/createVueInstance'
import { createVuexStore } from './init/createVuexStore'

import { Api } from './api/Api'
import { StaticRouter } from './api/route/StaticRouter'

import App from './App'

import JsonApiPlaygroundRoutes from './api/misc/JsonApiPlaygroundRoutes'

Api.setBaseUrl('http://jsonapiplayground.reyesoft.com')

window.axios = axios
window.Api = Api

Vue.config.productionTip = false

const router = new StaticRouter(JsonApiPlaygroundRoutes)

createVuexStore({}, router)
  .then((store) => {
    return createVueInstance(store, { App })
  })
  .then(instance => instance.$mount('#app'))
