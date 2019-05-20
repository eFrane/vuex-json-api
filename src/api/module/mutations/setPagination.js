import Vue from 'vue'

export function setPagination(state, { group, pagination }) {
  if (null === group) {
    state.currentPage = pagination.current
    state.totalPages = pagination.total
    return
  }

  Vue.set(state.groups[group], 'currentPage', pagination.current_page)
  Vue.set(state.groups[group], 'totalPages', pagination.total_pages)
}
