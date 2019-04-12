import Vue from 'vue'

import axios from 'axios'

import { createVueInstance } from './init/createVueInstance'
import { Api } from './api/Api'
Api.setBaseUrl('https://apifoo.test/api/')

window.axios = axios
window.Api = Api

Vue.config.productionTip = false

createVueInstance()
