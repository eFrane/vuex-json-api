import Vue from 'vue/dist/vue.esm'

import axios from 'axios'

import { createVueInstance } from './init/createVueInstance'
import { createVuexStore } from './init/createVuexStore'

import { Api } from './api/Api'
import { SimpleRouter } from './api/route/SimpleRouter'

import App from './App'

Api.setBaseUrl('https://apifoo.test/')

window.axios = axios
window.Api = Api

Vue.config.productionTip = false

createVuexStore({}, new SimpleRouter('/api/route?filter[group]=api'))
  .then((store) => {
    return createVueInstance(store, { App })
  })
  .then(instance => instance.$mount('#app'))
