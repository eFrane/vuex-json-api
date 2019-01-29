import Vue from 'vue'

/**
 *
 * @param globalComponents array
 */
export function registerGlobalComponents (globalComponents) {
  globalComponents.map((component) => {
    Vue.component(component.name, component)
  })
}
