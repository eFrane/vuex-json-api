import Vue from 'vue'

// import { SettingsModule } from '../store/SettingsModule'

if (process.env.NODE_ENV === 'development') {
  Vue.config.performance = true
  Vue.config.devtools = true
}

/**
 * @param {Vuex.Store} store
 * @param {Vue,object} components
 * @param {function} mountedCallback
 * @returns {Promise<Vue>}
 */
export function createVueInstance (store, components, mountedCallback = () => {}) {
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
}
