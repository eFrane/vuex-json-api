import Vue from 'vue'

import { SettingsModule } from '../store/SettingsModule'
import { createVuexStore } from './createVuexStore'

if (process.env.NODE_ENV === 'development') {
  Vue.config.performance = true
  Vue.config.devtools    = true
}

const emptyFn = () => {}

/**
 * @param components {Vue,object}
 * @param mountedCallback function
 * @returns {Promise<Vue>}
 */
export function createVueInstance (components, mountedCallback = emptyFn) {
  return createVuexStore({
    SettingsModule
  }).then(store => {
    return new Vue({
      components: components,
      store: store,
      mounted () {
        mountedCallback.call(this)
      },
      renderError (h, err) {
        return h('pre', { style: { color: 'red' } }, err.stack)
      }
    })
  })
}
