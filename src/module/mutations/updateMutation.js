import Vue from 'vue'

export function updateMutation (isCollection) {
  return new Proxy((state, payload) => { }, {
    apply (target, thisArg, [state, { id, path, value, relationship, action }]) {
      let rootSelector = (isCollection) ? 'items' : 'item'

      if (typeof relationship !== 'undefined') {
        path = `${rootSelector}.${id}.relationships.${relationship}.data`
        path = path.split('.')

        let selectedsList = path.reduce((obj, key) => obj[key], state)
        let prop = path.pop()
        if (value instanceof Array) {
          Vue.set(selectedsList, prop, value)
          return
        }

        if (value instanceof Array === false) {
          if (action === 'remove') {
            let idx = selectedsList.findIndex(el => el.id === value.id)
            Vue.delete(selectedsList, idx)
          }
          if (action === 'add') {
            let length = selectedsList.length
            Vue.set(selectedsList, length, value)
          }

          // if its a 1-1 relation and we cant remove or add but only replace
          // we may find a more elegant way to handle that
          if (typeof action === 'undefined') {
            Vue.set(path.reduce((obj, key) => obj[key], state), prop, value)
          }
          return
        }
      }

      if (path.includes('attributes')) {
        path = `${rootSelector}.${id}.${path}`
        path = path.split('.')
        let prop = path.pop()
        let selectedsList = path.reduce((obj, key) => obj[key], state)
        Vue.set(selectedsList, prop, value)
        return
      }

      throw new Error('Update failed')
    }
  })
}
