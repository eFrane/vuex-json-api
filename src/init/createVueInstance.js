// import Vue from 'vue'

/**
 * @param {Vuex.Store} store
 * @param {Vue|object} components
 * @param {function} mountedCallback
 * @returns {Promise<Vue>}
 */
export async function createVueInstance (store, components, mountedCallback = () => { }) {
  console.log('I assumed this method is unused. Oops, It\'s not. [vuex-json-api]: createVueInstance')
  // if (process.env.NODE_ENV === 'development') {
  //   Vue.config.performance = true
  //   Vue.config.devtools = true
  // }

  // return new Vue({
  //   components,
  //   store,
  //   mounted () {
  //     mountedCallback.call(this)
  //   },
  //   renderError (h, err) {
  //     return h('pre', { style: { color: 'red' } }, err.stack)
  //   }
  // })
}
