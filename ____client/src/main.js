import Vue from 'vue'

import axios from 'axios'

import { createVueInstance } from './init/createVueInstance'
import { createVuexStore } from './init/createVuexStore'

import { Api } from './api/Api'
import { SimpleRouter } from './api/route/SimpleRouter'

Api.setBaseUrl('https://apifoo.test/')

window.axios = axios
window.Api = Api

Vue.config.productionTip = false

createVueInstance(createVuexStore({}, new SimpleRouter('/api/route?filter[group]=api')))
