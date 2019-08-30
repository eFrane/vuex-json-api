import Vue from 'vue'
import './server'
import axios from 'axios'

axios.get('localhost:3000/tags').then(data => console.log(data))

Vue.config.productionTip = false
