import Vue from 'vue'

export function updateMutation (state, { prop, value, path }) {
  if (path.constructor === Array) {
    Vue.set(path.reduce((obj, key) => obj[key], state), prop, value)
  } else {
    Vue.set(state, prop, value)
  }
}
